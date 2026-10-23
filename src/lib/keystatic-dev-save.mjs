import { execFile } from 'node:child_process';
import path from 'node:path';
import { promisify } from 'node:util';

const runFile = promisify(execFile);
const editorEvent = 'iceaxing:keystatic-editor';
const editorUpdates = new Set(['full-reload', 'update', 'prune']);

// Content saves invalidate Astro's content store and broadcast a full reload.
// Keep the CMS documents alive while letting public preview tabs update.
export function protectKeystaticClients(server) {
  const editors = new WeakSet();
  server.ws.on(editorEvent, (_data, client) => editors.add(client));

  const channels = new Set([server.ws, server.environments.client.hot]);
  for (const channel of channels) {
    const send = channel.send.bind(channel);
    channel.send = (...args) => {
      const payload = args[0];
      const clients = [...server.ws.clients];
      if (
        typeof payload !== 'object' ||
        !editorUpdates.has(payload.type) ||
        !clients.some((client) => editors.has(client))
      ) {
        return send(...args);
      }
      for (const client of clients) {
        if (!editors.has(client) && client.socket.readyState === 1) client.send(payload);
      }
    };
  }
}

export default function keystaticDevSave() {
  return {
    name: 'iceaxing:keystatic-dev-save',
    hooks: {
      'astro:server:setup': ({ server, refreshContent }) => {
        let pendingRefresh;
        const refresh = async () => {
          if (!refreshContent) throw new Error('当前 Astro 版本不支持手动同步内容。');
          // Public routes are generated separately from Astro's content store.
          // Update both before telling public preview tabs to reload.
          await runFile(process.execPath, ['--import', 'tsx', 'scripts/validate-content.ts'], {
            cwd: server.config.root,
            windowsHide: true,
            timeout: 60_000,
            maxBuffer: 1024 * 1024,
          });
          await refreshContent({});
          for (const name of [
            'route-manifest.json',
            'publication-manifest.json',
            'subscription-options.json',
          ]) {
            const file = path.resolve(server.config.root, 'src/generated', name);
            // Explicitly invalidate imports too: Windows file watching can miss
            // rapid writes, leaving the dev server with yesterday's routes.
            for (const environment of Object.values(server.environments)) {
              for (const module of environment.moduleGraph.getModulesByFile(file) ?? []) {
                environment.moduleGraph.invalidateModule(module);
              }
            }
            server.watcher.emit('change', file);
          }
          server.ws.send({ type: 'full-reload', path: '*' });
        };
        server.middlewares.use('/api/keystatic-refresh', async (request, response) => {
          response.setHeader('Content-Type', 'application/json; charset=utf-8');
          response.setHeader('Cache-Control', 'no-store');
          if (request.method !== 'POST') {
            response.statusCode = 405;
            response.setHeader('Allow', 'POST');
            response.end(JSON.stringify({ error: '请使用 POST 刷新预览。' }));
            return;
          }
          const origin = request.headers.origin;
          if (
            request.headers['sec-fetch-site'] === 'cross-site' ||
            (origin &&
              origin !==
                `${server.config.server.https ? 'https' : 'http'}://${request.headers.host}`)
          ) {
            response.statusCode = 403;
            response.end(JSON.stringify({ error: '请求来源无效。' }));
            return;
          }
          try {
            // Share concurrent clicks so generated files cannot race each other.
            pendingRefresh ??= refresh().finally(() => {
              pendingRefresh = undefined;
            });
            await pendingRefresh;
            response.end(JSON.stringify({ ok: true }));
          } catch (error) {
            response.statusCode = 500;
            response.end(JSON.stringify({ error: error.stderr?.trim() || error.message }));
          }
        });
      },
      'astro:config:setup': ({ command, injectScript, updateConfig }) => {
        if (command !== 'dev') return;
        injectScript(
          // Keystatic's generated page has no <head>; before-hydration also
          // runs for its client-only island, unlike page script injection.
          'before-hydration',
          `if (import.meta.hot && /^\\/keystatic(?:\\/|$)/.test(window.location.pathname)) {
            const register = () => import.meta.hot.send('${editorEvent}', {});
            register();
            import.meta.hot.on('vite:ws:connect', register);
          }`,
        );
        updateConfig({
          vite: {
            plugins: [
              { name: 'iceaxing:keystatic-dev-save', configureServer: protectKeystaticClients },
            ],
          },
        });
      },
    },
  };
}
