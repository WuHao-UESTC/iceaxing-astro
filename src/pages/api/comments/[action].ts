import type { APIRoute, AstroCookies } from 'astro';
import { z } from 'zod';

import { getContentIndex, isPublicContent, routeFor } from '../../../lib/content';
import {
  addComment,
  CommentError,
  deleteComment,
  getIdentity,
  listComments,
  logout,
  notifyComment,
  publicComment,
  requestCode,
  sessionLifetime,
  setBlocked,
  verifyCode,
} from '../../../lib/comments/service';
import { getPersistentStore } from '../../../lib/subscriptions/store';

export const prerender = false;
const cookieName = 'iceaxing-comment-session';
const challengeName = 'iceaxing-comment-challenge';
const threadSchema = z.string().regex(/^(article|log):[a-z0-9]+(?:-[a-z0-9]+)*:(zh|en|de)$/);
const json = (body: unknown, status = 200) =>
  Response.json(body, {
    status,
    headers: { 'Cache-Control': 'private, no-store', Vary: 'Cookie' },
  });
const cookieOptions = (url: URL, maxAge: number) => ({
  httpOnly: true,
  secure: url.protocol === 'https:',
  sameSite: 'lax' as const,
  path: '/',
  maxAge,
});
const emailSchema = z.string().trim().toLowerCase().pipe(z.email().max(254));

async function articleFor(thread: string) {
  const [kind, id, locale] = threadSchema.parse(thread).split(':') as [
    'article' | 'log',
    string,
    'zh' | 'en' | 'de',
  ];
  const index = await getContentIndex();
  const entry = (kind === 'article' ? index.articles : index.logs).find(
    (entry) =>
      entry.data.contentId === id && entry.data.locale === locale && isPublicContent(entry.data),
  );
  const pathname = routeFor(id, locale, kind);
  if (!entry || !pathname) throw new CommentError('文章不存在或尚未公开。', 404);
  return { title: entry.data.title, pathname };
}

const handle: APIRoute = async ({ request, url, params, cookies }) => {
  const action = params.action;
  try {
    if (request.method === 'POST') {
      const origin = request.headers.get('origin');
      if (
        (origin && origin !== url.origin) ||
        request.headers.get('sec-fetch-site') === 'cross-site'
      )
        throw new CommentError('请求来源无效。', 403);
      if (!request.headers.get('content-type')?.includes('application/json'))
        throw new CommentError('请提交 JSON 数据。', 415);
    }
    const store = getPersistentStore();
    const token = cookies.get(cookieName)?.value;
    if (request.method === 'GET' && action === 'session')
      return json({ identity: await getIdentity(store, token) });
    if (request.method === 'GET' && action === 'list') {
      const thread = threadSchema.parse(url.searchParams.get('thread'));
      await articleFor(thread);
      const offset = z.coerce
        .number()
        .int()
        .min(0)
        .parse(url.searchParams.get('offset') ?? 0);
      const result = await listComments(store, thread, offset);
      return json({ comments: result.entries.map(publicComment), more: result.more });
    }
    const identity = await getIdentity(store, token);
    if (request.method === 'GET' && action === 'admin') {
      if (!identity?.admin) throw new CommentError('请使用管理员邮箱验证登录。', 403);
      const offset = z.coerce
        .number()
        .int()
        .min(0)
        .parse(url.searchParams.get('offset') ?? 0);
      const result = await listComments(store, null, offset);
      return json({
        comments: result.entries.map((entry) => ({
          ...publicComment(entry),
          email: entry.email,
          thread: entry.thread,
          articleTitle: entry.articleTitle,
          articlePath: entry.articlePath,
          notificationPending: !entry.notifiedAt && !entry.deletedAt,
        })),
        more: result.more,
        blocked: await store.members('comment:blocked'),
      });
    }
    if (request.method !== 'POST') throw new CommentError('接口不存在。', 404);
    const body = await request.json();
    if (action === 'request-code') {
      const { email } = z.object({ email: emailSchema }).parse(body);
      const challenge = await requestCode(store, email);
      cookies.set(challengeName, challenge, cookieOptions(url, 600));
      return json({ ok: true });
    }
    if (action === 'verify') {
      const { code } = z.object({ code: z.string().regex(/^\d{6}$/) }).parse(body);
      const result = await verifyCode(store, cookies.get(challengeName)?.value ?? '', code);
      cookies.set(cookieName, result.token, cookieOptions(url, sessionLifetime));
      cookies.delete(challengeName, { path: '/' });
      return json({ identity: { email: result.email, admin: result.admin } });
    }
    if (action === 'logout') {
      await logout(store, token);
      clearSession(cookies);
      return json({ ok: true });
    }
    if (!identity) throw new CommentError('请先验证邮箱。', 401);
    if (action === 'post') {
      const data = z
        .object({
          thread: threadSchema,
          name: z.string().trim().min(1).max(40),
          body: z.string().trim().min(1).max(5000),
          parentId: z
            .string()
            .regex(/^[A-Za-z0-9_-]{43}$/)
            .optional(),
        })
        .parse(body);
      const article = await articleFor(data.thread);
      const comment = await addComment(store, {
        ...data,
        email: identity.email,
        articleTitle: article.title,
        articlePath: article.pathname,
      });
      let notificationPending = false;
      try {
        await notifyComment(store, comment.id, process.env.PUBLIC_SITE_URL || url.origin);
      } catch {
        notificationPending = true;
      }
      return json({ comment: publicComment(comment), notificationPending }, 201);
    }
    if (!identity.admin) throw new CommentError('仅管理员可以执行此操作。', 403);
    if (action === 'delete' || action === 'retry-notification') {
      const { id } = z.object({ id: z.string().regex(/^[A-Za-z0-9_-]{43}$/) }).parse(body);
      if (action === 'delete') await deleteComment(store, id);
      else await notifyComment(store, id, process.env.PUBLIC_SITE_URL || url.origin);
      return json({ ok: true });
    }
    if (action === 'block' || action === 'unblock') {
      const { email } = z.object({ email: emailSchema }).parse(body);
      await setBlocked(store, email, action === 'block');
      return json({ ok: true });
    }
    throw new CommentError('接口不存在。', 404);
  } catch (error) {
    if (error instanceof CommentError) return json({ error: error.message }, error.status);
    if (error instanceof z.ZodError || error instanceof SyntaxError)
      return json({ error: '输入格式不正确，请检查邮箱、验证码、昵称和评论内容。' }, 400);
    return json({ error: '评论服务暂不可用，请稍后重试。' }, 503);
  }
};

function clearSession(cookies: AstroCookies) {
  cookies.delete(cookieName, { path: '/' });
}
export const GET = handle;
export const POST = handle;
