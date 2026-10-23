import { randomInt } from 'node:crypto';

import { sendMessage } from '../subscriptions/email';
import { normalizeEmail, opaqueToken, sha256 } from '../subscriptions/security';
import type { PersistentStore } from '../subscriptions/store';

export const sessionLifetime = 180 * 24 * 60 * 60;
const challengeLifetime = 10 * 60;
export const ownerEmail = () =>
  normalizeEmail(process.env.COMMENTS_OWNER_EMAIL || 'wushenlunzhe007@163.com');

export class CommentError extends Error {
  constructor(
    message: string,
    public status = 400,
  ) {
    super(message);
  }
}

interface Member {
  email: string;
  blocked: boolean;
  version: string;
}
interface Session {
  email: string;
  version: string;
}
interface Challenge {
  email: string;
  codeHash: string;
}
export interface CommentEntry {
  id: string;
  thread: string;
  articleTitle: string;
  articlePath: string;
  email: string;
  name: string;
  body: string;
  parentId?: string;
  replyTo?: string;
  author: boolean;
  createdAt: string;
  deletedAt?: string;
  notifiedAt?: string;
}

const memberKey = (email: string) => `comment:member:${sha256(normalizeEmail(email))}`;
const whitelistKey = (email: string) => `comment:verified:${sha256(normalizeEmail(email))}`;
const entryKey = (id: string) => `comment:entry:${id}`;
const sessionKey = (token: string) => `comment:session:${sha256(token)}`;
const challengeKey = (token: string) => `comment:challenge:${sha256(token)}`;
const escapeHtml = (text: string) =>
  text.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  );

export async function requestCode(store: PersistentStore, address: string) {
  const email = normalizeEmail(address);
  const member = await store.get<Member>(memberKey(email));
  if (member?.blocked) throw new CommentError('该邮箱已被禁止评论。', 403);
  const cooldown = `comment:code-cooldown:${sha256(email)}`;
  if (!(await store.set(cooldown, true, { ex: 60, nx: true }))) {
    throw new CommentError('请在 60 秒后重新发送验证码。', 429);
  }
  const token = opaqueToken();
  const code = String(randomInt(0, 1_000_000)).padStart(6, '0');
  await store.set<Challenge>(
    challengeKey(token),
    { email, codeHash: sha256(`${token}:${code}`) },
    { ex: challengeLifetime },
  );
  try {
    await sendMessage({
      to: email,
      subject: 'iceaxing 评论邮箱验证码 / Email verification',
      text: `你的评论邮箱验证码是 ${code}，10 分钟内有效。请勿转发。若非本人操作，请忽略。\nYour verification code is ${code}. It expires in 10 minutes.`,
      html: `<p>评论邮箱验证码 / Verification code</p><p style="font-size:28px;letter-spacing:6px">${code}</p><p>10 分钟内有效。若非本人操作，请忽略。<br>Valid for 10 minutes. Ignore this email if you did not request it.</p>`,
      idempotencyKey: `comment-code-${token}`,
    });
  } catch (error) {
    await store.delete(challengeKey(token));
    await store.delete(cooldown);
    throw error;
  }
  return token;
}

export async function verifyCode(store: PersistentStore, token: string, code: string) {
  const key = challengeKey(token);
  const challenge = await store.get<Challenge>(key);
  if (!challenge) throw new CommentError('验证码已失效，请重新发送。');
  const attempts = await store.incrementWindow(`${key}:attempts`, challengeLifetime);
  if (attempts > 5) {
    await store.delete(key);
    throw new CommentError('验证码尝试次数已用完，请重新发送。');
  }
  if (sha256(`${token}:${code}`) !== challenge.codeHash) throw new CommentError('验证码不正确。');
  if (!(await store.getdel<Challenge>(key))) throw new CommentError('验证码已使用，请重新发送。');
  const email = challenge.email;
  // Verification must never overwrite a concurrent administrator block.
  await store.set<Member>(
    memberKey(email),
    {
      email,
      blocked: false,
      version: opaqueToken(),
    },
    { nx: true },
  );
  const member = await store.get<Member>(memberKey(email));
  if (!member || member.blocked) throw new CommentError('该邮箱已被禁止评论。', 403);
  await store.set(whitelistKey(email), new Date().toISOString(), { nx: true });
  const session = opaqueToken();
  await store.set<Session>(
    sessionKey(session),
    { email, version: member.version },
    { ex: sessionLifetime },
  );
  return { token: session, email, admin: email === ownerEmail() };
}

export async function getIdentity(store: PersistentStore, token?: string) {
  if (!token) return null;
  const session = await store.get<Session>(sessionKey(token));
  if (!session) return null;
  const member = await store.get<Member>(memberKey(session.email));
  if (
    !member ||
    member.blocked ||
    member.version !== session.version ||
    !(await store.get(whitelistKey(session.email)))
  )
    return null;
  return { email: member.email, admin: member.email === ownerEmail() };
}

export async function logout(store: PersistentStore, token?: string) {
  if (token) await store.delete(sessionKey(token));
}

export async function setBlocked(store: PersistentStore, address: string, blocked: boolean) {
  const email = normalizeEmail(address);
  if (email === ownerEmail()) throw new CommentError('不能拉黑管理员邮箱。');
  const previous = await store.get<Member>(memberKey(email));
  await store.set<Member>(memberKey(email), {
    ...previous,
    email,
    blocked,
    version: blocked ? opaqueToken() : (previous?.version ?? opaqueToken()),
  });
  if (blocked) await store.addToSet('comment:blocked', email);
  else await store.removeFromSet('comment:blocked', email);
}

export function publicComment(entry: CommentEntry) {
  // Never serialize the stored email or notification metadata to public clients.
  return {
    id: entry.id,
    name: entry.deletedAt ? '' : entry.name,
    body: entry.deletedAt ? '' : entry.body,
    createdAt: entry.createdAt,
    parentId: entry.parentId,
    replyTo: entry.replyTo,
    author: entry.author,
    deleted: Boolean(entry.deletedAt),
  };
}

export async function listComments(store: PersistentStore, thread: string | null, offset = 0) {
  const ids = await store.members(thread ? `comment:thread:${thread}` : 'comment:all');
  const entries = (
    await Promise.all(ids.map((id) => store.get<CommentEntry>(entryKey(id))))
  ).filter((entry): entry is CommentEntry => Boolean(entry));
  entries.sort((a, b) => a.createdAt.localeCompare(b.createdAt) || a.id.localeCompare(b.id));
  if (!thread) entries.reverse();
  return { entries: entries.slice(offset, offset + 50), more: entries.length > offset + 50 };
}

export async function addComment(
  store: PersistentStore,
  entry: Omit<CommentEntry, 'id' | 'createdAt' | 'author' | 'replyTo'>,
) {
  const member = await store.get<Member>(memberKey(entry.email));
  if (!member || member.blocked || !(await store.get(whitelistKey(entry.email))))
    throw new CommentError('请重新验证邮箱。', 401);
  let parent: CommentEntry | null = null;
  if (entry.parentId) {
    parent = await store.get<CommentEntry>(entryKey(entry.parentId));
    if (!parent || parent.thread !== entry.thread || parent.deletedAt)
      throw new CommentError('回复的评论已删除或不属于这篇文章。');
  }
  const comment: CommentEntry = {
    ...entry,
    id: opaqueToken(),
    createdAt: new Date().toISOString(),
    author: entry.email === ownerEmail(),
    replyTo: parent?.name,
  };
  await store.set(entryKey(comment.id), comment);
  await store.addToSet(`comment:thread:${entry.thread}`, comment.id);
  await store.addToSet('comment:all', comment.id);
  return comment;
}

export async function deleteComment(store: PersistentStore, id: string) {
  const entry = await store.get<CommentEntry>(entryKey(id));
  if (!entry) throw new CommentError('评论不存在。', 404);
  // Keep a tombstone so replies retain their original context.
  await store.set(entryKey(id), {
    ...entry,
    body: '',
    name: '',
    deletedAt: new Date().toISOString(),
  });
}

export async function notifyComment(store: PersistentStore, id: string, origin: string) {
  const entry = await store.get<CommentEntry>(entryKey(id));
  if (!entry || entry.deletedAt || entry.notifiedAt) return;
  const href = new URL(entry.articlePath, origin);
  href.hash = `comment-${entry.id}`;
  const text = `文章：${entry.articleTitle}\n链接：${href.href}\n昵称：${entry.name}\n邮箱：${entry.email}\n${entry.replyTo ? `回复：${entry.replyTo}\n` : ''}\n${entry.body}`;
  await sendMessage({
    to: ownerEmail(),
    replyTo: entry.email,
    subject: `[iceaxing ${entry.parentId ? '新回复' : '新评论'}] ${entry.articleTitle}`,
    text,
    html: `<pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(text)}</pre>`,
    idempotencyKey: `comment-notify-${entry.id}`,
  });
  const current = await store.get<CommentEntry>(entryKey(id));
  if (current) await store.set(entryKey(id), { ...current, notifiedAt: new Date().toISOString() });
}
