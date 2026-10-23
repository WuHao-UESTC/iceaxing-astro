import { commentCopy } from '../lib/comments/copy';
import type { Locale } from '../i18n/config';

interface Identity {
  email: string;
  admin: boolean;
}
interface Comment {
  id: string;
  name: string;
  body: string;
  createdAt: string;
  parentId?: string;
  replyTo?: string;
  author: boolean;
  deleted: boolean;
  email?: string;
  thread?: string;
  articleTitle?: string;
  articlePath?: string;
  notificationPending?: boolean;
}

export function initComments() {
  document.querySelectorAll<HTMLElement>('[data-comments]').forEach((root) => {
    if (root.dataset.ready) return;
    root.dataset.ready = 'true';
    const locale = (root.dataset.locale || 'zh') as Locale;
    const copy = commentCopy[locale];
    const admin = root.dataset.admin === 'true';
    const thread = root.dataset.thread || '';
    const el = <T extends HTMLElement = HTMLElement>(selector: string) =>
      root.querySelector<T>(selector)!;
    const login = el<HTMLFormElement>('[data-login]');
    const verify = el<HTMLFormElement>('[data-verify]');
    const compose = el<HTMLFormElement>('[data-compose]');
    const field = (form: HTMLFormElement, name: string) =>
      form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement;
    let identity: Identity | null = null;
    let replying: Comment | null = null;
    let comments: Comment[] = [];
    let offset = 0;
    let loading = false;
    let busy = false;
    let cooldownUntil = 0;
    const status = (text: string) => {
      el('[data-status]').textContent = text;
    };

    async function api(action: string, data?: unknown) {
      const response = await fetch(
        `/api/comments/${action}`,
        data === undefined
          ? { cache: 'no-store' }
          : {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
            },
      );
      const result = await response.json().catch(() => ({ error: copy.unavailable }));
      if (!response.ok) {
        if (response.status === 401) {
          identity = null;
          updateIdentity();
        }
        throw new Error(locale === 'zh' ? result.error || copy.unavailable : copy.unavailable);
      }
      return result;
    }

    function updateIdentity() {
      el('[data-auth]').hidden = Boolean(identity);
      el('[data-identity]').hidden = !identity;
      el('[data-email]').textContent = identity?.email || '';
      el('[data-manage]').hidden = !identity?.admin;
      compose.hidden = !identity || (admin && (!identity.admin || !replying));
      if (identity?.admin && !field(compose, 'name').value)
        field(compose, 'name').value = 'iceaxing';
    }

    async function operation(work: () => Promise<void>) {
      if (busy) return;
      busy = true;
      root.setAttribute('aria-busy', 'true');
      const buttons = [...root.querySelectorAll<HTMLButtonElement>('button')];
      buttons.forEach((button) => {
        button.disabled = true;
      });
      status(copy.working);
      try {
        await work();
      } catch (error) {
        status(error instanceof Error ? error.message : copy.unavailable);
      } finally {
        busy = false;
        root.removeAttribute('aria-busy');
        buttons.forEach((button) => {
          button.disabled = false;
        });
      }
    }

    function button(label: string, action: () => void) {
      const node = document.createElement('button');
      node.type = 'button';
      node.textContent = label;
      node.addEventListener('click', action);
      return node;
    }

    function setReply(comment: Comment | null) {
      replying = comment;
      el('[data-replying]').textContent = comment ? `${copy.replying} ${comment.name}` : '';
      el('[data-replying]').hidden = !comment;
      el('[data-cancel]').hidden = !comment;
      updateIdentity();
      if (comment && identity) {
        field(compose, 'body').focus();
        compose.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    }

    function render() {
      comments.sort(
        (a, b) =>
          (a.createdAt.localeCompare(b.createdAt) || a.id.localeCompare(b.id)) * (admin ? -1 : 1),
      );
      const list = el('[data-list]');
      list.replaceChildren();
      if (!comments.length) {
        const p = document.createElement('p');
        p.textContent = copy.empty;
        list.append(p);
      }
      const children = new Map<string, Comment[]>();
      const ids = new Set(comments.map((comment) => comment.id));
      for (const comment of comments) {
        if (comment.parentId && ids.has(comment.parentId)) {
          const replies = children.get(comment.parentId) ?? [];
          replies.push(comment);
          children.set(comment.parentId, replies);
        }
      }
      const ordered: Comment[] = [];
      const append = (comment: Comment) => {
        ordered.push(comment);
        for (const reply of children.get(comment.id) ?? []) append(reply);
      };
      for (const comment of comments)
        if (!comment.parentId || !ids.has(comment.parentId)) append(comment);
      for (const comment of ordered) {
        const row = document.createElement('article');
        row.id = `comment-${comment.id}`;
        row.className = `comment-entry${comment.parentId ? ' is-reply' : ''}`;
        const header = document.createElement('header');
        const name = document.createElement('strong');
        name.textContent = comment.deleted ? copy.deleted : comment.name;
        header.append(name);
        if (comment.author && !comment.deleted) {
          const badge = document.createElement('span');
          badge.className = 'comment-author';
          badge.textContent = copy.author;
          header.append(badge);
        }
        const time = document.createElement('time');
        time.dateTime = comment.createdAt;
        time.textContent = new Date(comment.createdAt).toLocaleString(locale);
        header.append(time);
        row.append(header);
        if (admin && comment.articlePath) {
          const link = document.createElement('a');
          link.href = `${comment.articlePath}#comment-${comment.id}`;
          link.textContent = comment.articleTitle || comment.articlePath;
          row.append(link);
        }
        if (comment.replyTo) {
          const p = document.createElement('p');
          p.className = 'comment-reply-to';
          p.textContent = `${copy.replying} ${comment.replyTo}`;
          row.append(p);
        }
        const text = document.createElement('p');
        text.className = 'comment-body';
        text.textContent = comment.body;
        if (!comment.deleted) row.append(text);
        const actions = document.createElement('div');
        actions.className = 'comment-actions';
        if (!comment.deleted)
          actions.append(
            button(copy.reply, () => {
              if (!identity) {
                status(copy.loginRequired);
                field(login, 'email').focus();
                return;
              }
              setReply(comment);
            }),
          );
        if (identity?.admin) {
          if (comment.email) {
            const email = document.createElement('span');
            email.textContent = comment.email;
            actions.append(email);
          }
          if (!comment.deleted)
            actions.append(
              button(copy.delete, () => {
                if (window.confirm(copy.confirmDelete))
                  void operation(async () => {
                    await api('delete', { id: comment.id });
                    await load(true);
                    status(copy.done);
                  });
              }),
            );
          if (comment.email && comment.email !== identity.email)
            actions.append(
              button(copy.block, () => {
                if (window.confirm(copy.confirmBlock))
                  void operation(async () => {
                    await api('block', { email: comment.email });
                    await load(true);
                    status(copy.done);
                  });
              }),
            );
          if (comment.notificationPending)
            actions.append(
              button(
                copy.retry,
                () =>
                  void operation(async () => {
                    await api('retry-notification', { id: comment.id });
                    await load(true);
                    status(copy.done);
                  }),
              ),
            );
        }
        row.append(actions);
        list.append(row);
      }
    }

    async function load(reset = false) {
      if (loading) return;
      if (admin && !identity?.admin) {
        comments = [];
        render();
        el('[data-more]').hidden = true;
        el('[data-blocklist]').hidden = true;
        return;
      }
      loading = true;
      try {
        const pageOffset = reset ? 0 : offset;
        const result = await api(
          admin
            ? `admin?offset=${pageOffset}`
            : `list?thread=${encodeURIComponent(thread)}&offset=${pageOffset}`,
        );
        const incoming = result.comments as Comment[];
        comments = reset
          ? incoming
          : [
              ...new Map(
                [...comments, ...incoming].map((comment) => [comment.id, comment]),
              ).values(),
            ];
        offset = pageOffset + incoming.length;
        el('[data-more]').hidden = !result.more;
        if (admin) {
          el('[data-blocklist]').hidden = false;
          const blocked = el('[data-blocked]');
          blocked.replaceChildren();
          for (const email of result.blocked as string[]) {
            const row = document.createElement('p');
            const text = document.createElement('span');
            text.textContent = email;
            row.append(
              text,
              button(
                copy.unblock,
                () =>
                  void operation(async () => {
                    await api('unblock', { email });
                    await load(true);
                    status(copy.done);
                  }),
              ),
            );
            blocked.append(row);
          }
        }
        render();
      } finally {
        loading = false;
      }
    }

    login.addEventListener('submit', (event) => {
      event.preventDefault();
      if (Date.now() < cooldownUntil) {
        status(locale === 'zh' ? '请在 60 秒后重新发送验证码。' : copy.sent);
        return;
      }
      void operation(async () => {
        await api('request-code', { email: field(login, 'email').value });
        cooldownUntil = Date.now() + 60_000;
        field(login, 'email').readOnly = true;
        verify.hidden = false;
        field(verify, 'code').focus();
        status(copy.sent);
      });
    });
    el('[data-change]').addEventListener('click', () => {
      field(login, 'email').readOnly = false;
      verify.hidden = true;
      field(verify, 'code').value = '';
      cooldownUntil = 0;
      field(login, 'email').focus();
    });
    verify.addEventListener('submit', (event) => {
      event.preventDefault();
      void operation(async () => {
        const result = await api('verify', { code: field(verify, 'code').value });
        identity = result.identity;
        verify.reset();
        updateIdentity();
        await load(true);
        status(admin && !identity?.admin ? copy.adminOnly : copy.signedIn);
      });
    });
    el('[data-logout]').addEventListener(
      'click',
      () =>
        void operation(async () => {
          await api('logout', {});
          identity = null;
          setReply(null);
          login.reset();
          field(login, 'email').readOnly = false;
          verify.hidden = true;
          await load(true);
          status(copy.login);
        }),
    );
    el('[data-cancel]').addEventListener('click', () => setReply(null));
    compose.addEventListener('submit', (event) => {
      event.preventDefault();
      void operation(async () => {
        const result = await api('post', {
          thread: admin ? replying?.thread : thread,
          name: field(compose, 'name').value,
          body: field(compose, 'body').value,
          parentId: replying?.id,
        });
        field(compose, 'body').value = '';
        setReply(null);
        if (admin) await load(true);
        else {
          comments.push(result.comment);
          render();
        }
        status(result.notificationPending && identity?.admin ? copy.pending : copy.posted);
      });
    });
    el('[data-more]').addEventListener(
      'click',
      () =>
        void operation(async () => {
          await load();
          status('');
        }),
    );
    el('[data-refresh]').addEventListener(
      'click',
      () =>
        void operation(async () => {
          identity = (await api('session')).identity;
          updateIdentity();
          await load(true);
          status('');
        }),
    );
    void operation(async () => {
      identity = (await api('session')).identity;
      updateIdentity();
      await load(true);
      status(admin && !identity?.admin ? copy.adminOnly : '');
    });
  });
}
