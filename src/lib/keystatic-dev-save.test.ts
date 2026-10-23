import { describe, expect, it, vi } from 'vitest';

import keystaticDevSave, { protectKeystaticClients } from './keystatic-dev-save.mjs';

function setup() {
  const workspace = { socket: { readyState: 1 }, send: vi.fn() };
  const iframe = { socket: { readyState: 1 }, send: vi.fn() };
  const preview = { socket: { readyState: 1 }, send: vi.fn() };
  const ws = {
    clients: new Set([workspace, iframe, preview]),
    on: vi.fn(),
    send: vi.fn(),
  };
  const server = { ws, environments: { client: { hot: ws } } };
  const broadcast = ws.send;
  protectKeystaticClients(server);
  const register = ws.on.mock.calls[0]![1];
  return { server, broadcast, register, workspace, iframe, preview };
}

describe('Keystatic local saves and development reloads', () => {
  it('keeps both CMS documents alive while reloading public previews', () => {
    const { server, broadcast, register, workspace, iframe, preview } = setup();
    register({}, workspace);
    register({}, iframe);
    const reload = { type: 'full-reload', path: '*' };
    server.environments.client.hot.send(reload);
    expect(workspace.send).not.toHaveBeenCalled();
    expect(iframe.send).not.toHaveBeenCalled();
    expect(preview.send).toHaveBeenCalledExactlyOnceWith(reload);
    expect(broadcast).not.toHaveBeenCalled();
  });

  it('preserves normal broadcasts when no editor is open', () => {
    const { server, broadcast } = setup();
    const reload = { type: 'full-reload', path: '*' };
    server.ws.send(reload);
    expect(broadcast).toHaveBeenCalledExactlyOnceWith(reload);
  });

  it('passes errors and custom events through and prevents HMR from remounting editors', () => {
    const { server, broadcast, register, workspace, preview } = setup();
    register({}, workspace);
    server.ws.send({ type: 'update', updates: [] });
    server.ws.send({ type: 'prune', paths: [] });
    expect(workspace.send).not.toHaveBeenCalled();
    expect(preview.send).toHaveBeenCalledTimes(2);
    const error = { type: 'error', err: { message: 'schema error' } };
    server.ws.send(error);
    server.ws.send('custom-event', { value: 1 });
    expect(broadcast).toHaveBeenCalledWith(error);
    expect(broadcast).toHaveBeenCalledWith('custom-event', { value: 1 });
  });

  it('installs no scripts or server hooks in production', () => {
    const injectScript = vi.fn();
    const updateConfig = vi.fn();
    keystaticDevSave().hooks['astro:config:setup']({
      command: 'build',
      injectScript,
      updateConfig,
    });
    expect(injectScript).not.toHaveBeenCalled();
    expect(updateConfig).not.toHaveBeenCalled();
  });
});
