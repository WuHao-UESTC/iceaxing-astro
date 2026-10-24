import { afterEach, describe, expect, it, vi } from 'vitest';
vi.mock('../../../keystatic.config', () => ({
  default: {
    storage: { kind: 'github', repo: { owner: 'owner', name: 'repo' }, pathPrefix: 'blog' },
  },
}));
import { exportRepository } from './repository';
afterEach(() => vi.unstubAllGlobals());
describe('authenticated GitHub Obsidian source', () => {
  it('reads prefixed article files and assets using server-only credentials and a pinned tree', async () => {
    const calls: string[] = [];
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string, init: RequestInit) => {
        expect(new Headers(init.headers).get('Authorization')).toBe('Bearer private-token');
        calls.push(url);
        if (url.endsWith('/owner/repo')) return Response.json({ default_branch: 'main' });
        if (url.includes('/git/trees/'))
          return Response.json({
            sha: 'tree-a',
            truncated: false,
            tree: [
              {
                type: 'blob',
                path: 'blog/src/content/articles/zh/example/index.mdoc',
                sha: 'article-sha',
              },
              { type: 'blob', path: 'blog/src/assets/image.webp', sha: 'image-sha' },
              {
                type: 'blob',
                path: 'blog/src/content/categories/category.yaml',
                sha: 'category-sha',
              },
              { type: 'blob', path: 'blog/src/content/projects/project.yaml', sha: 'project-sha' },
              {
                type: 'blob',
                path: 'blog/src/content/collections/collection.yaml',
                sha: 'collection-sha',
              },
              {
                type: 'blob',
                path: 'outside/src/content/articles/zh/other/index.mdoc',
                sha: 'other',
              },
            ],
          });
        return Response.json({
          encoding: 'base64',
          content: Buffer.from('content').toString('base64'),
        });
      }),
    );
    const repository = await exportRepository({ token: 'private-token' });
    expect(repository.articles).toEqual(['src/content/articles/zh/example/index.mdoc']);
    expect(repository.source).toBe('github:owner/repo');
    expect(repository.revision).toBe('tree-a');
    expect(repository.folders).toHaveLength(3);
    expect(new TextDecoder().decode(await repository.read(repository.folders[0]!))).toBe('content');
    expect(new TextDecoder().decode(await repository.read(repository.articles[0]!))).toBe(
      'content',
    );
    expect(new TextDecoder().decode(await repository.read('src/assets/image.webp'))).toBe(
      'content',
    );
    await expect(repository.read('.env')).rejects.toThrow('不允许');
    expect(calls.every((url) => !url.includes('private-token'))).toBe(true);
  });
  it('does not expose repository content without authentication and rejects truncated inventories', async () => {
    await expect(exportRepository({})).rejects.toThrow('登录 GitHub');
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => Response.json({ truncated: true, tree: [] })),
    );
    await expect(exportRepository({ token: 'token', branch: 'main' })).rejects.toThrow('不完整');
  });
});
