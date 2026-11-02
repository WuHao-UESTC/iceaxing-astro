import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
const fixture = vi.hoisted(() => ({
  head: 'head-1',
  files: new Map<string, string>(),
  fetch: vi.fn(),
}));
vi.mock('../../keystatic.config', () => ({
  default: { storage: { kind: 'github', repo: 'example/site', pathPrefix: 'app' } },
}));
vi.mock('./content-tree/server', () => ({
  githubRepo: () => ({ owner: 'example', name: 'site' }),
  pathPrefix: () => 'app/',
  workspaceContentReader: async () => ({ branch: 'main' }),
  githubJson: vi.fn(async (url: string) => {
    if (url.includes('/git/ref/')) return { object: { sha: fixture.head } };
    if (url.includes('/git/trees/'))
      return {
        truncated: false,
        tree: [...fixture.files.keys()].map((path, i) => ({
          path: 'app/' + path,
          type: 'blob',
          sha: String(i),
        })),
      };
    if (url.includes('/git/blobs/')) {
      const index = Number(url.split('/').at(-1));
      return {
        encoding: 'base64',
        content: Buffer.from([...fixture.files.values()][index]!).toString('base64'),
      };
    }
    throw new Error('Unexpected GitHub read');
  }),
}));
import { loadFeatured, saveFeatured, FeaturedConflict } from './featured-server';
const labels = 'labels:\n  zh: {title: 测试}\n  en: {title: Test}\n  de: {title: Test}\n';
beforeEach(() => {
  fixture.head = 'head-1';
  fixture.files.clear();
  fixture.fetch.mockReset();
  fixture.files.set(
    'src/content/categories/cat.yaml',
    'categoryId: cat\npublicationStatus: published\nfeatured: true\nfeaturedOrder: 20\n' + labels,
  );
  fixture.files.set(
    'src/content/projects/project.yaml',
    'projectId: project\ncategory: cat\npublicationStatus: published\nfeatured: true\nfeaturedOrder: 30\n' +
      labels,
  );
  fixture.files.set(
    'src/content/collections/series.yaml',
    'collectionId: series\nproject: project\npublicationStatus: published\nfeatured: true\nfeaturedOrder: 40\n' +
      labels,
  );
  fixture.files.set(
    'src/content/articles/zh/note/index.mdoc',
    '---\ncontentId: note\ntitle: Note\nstatus: published\nproject: project\ncollection: series\nfeatured: true\nfeaturedOrder: 10\n---\nKeep **body** unchanged.\n',
  );
  fixture.fetch.mockImplementation(async (_url: string, init: RequestInit) => {
    const body = JSON.parse(init.body as string);
    const input = body.variables.input;
    if (input.expectedHeadOid !== fixture.head)
      return new Response(JSON.stringify({ errors: [{ message: 'Head changed' }] }), {
        status: 200,
      });
    for (const addition of input.fileChanges.additions)
      fixture.files.set(
        addition.path.replace(/^app\//, ''),
        Buffer.from(addition.contents, 'base64').toString('utf8'),
      );
    fixture.head = 'head-2';
    return new Response(
      JSON.stringify({
        data: { createCommitOnBranch: { ref: { target: { oid: fixture.head } } } },
      }),
      { status: 200 },
    );
  });
  vi.stubGlobal('fetch', fixture.fetch);
});
afterEach(() => vi.unstubAllGlobals());
describe('GitHub editorial persistence', () => {
  it('loads all four kinds and shared parents without falsely marking the article private', async () => {
    const payload = await loadFeatured({ token: 'test-token' });
    expect(payload.items.map((i) => i.kind)).toEqual([
      'article',
      'category',
      'project',
      'collection',
    ]);
    expect(payload.items.every((i) => i.isPublic)).toBe(true);
  });
  it('keeps a collection with a private ancestor out of public selections', async () => {
    const p = 'src/content/projects/project.yaml';
    fixture.files.set(
      p,
      fixture.files.get(p)!.replace('publicationStatus: published', 'publicationStatus: draft'),
    );
    const payload = await loadFeatured({ token: 'test-token' });
    expect(payload.items.find((i) => i.kind === 'collection')).toMatchObject({ isPublic: false });
    expect(payload.items.find((i) => i.kind === 'article')).toMatchObject({ isPublic: false });
  });
  it('commits only featured metadata to the configured prefix using the expected branch head', async () => {
    const original = fixture.files.get('src/content/articles/zh/note/index.mdoc')!;
    const payload = await loadFeatured({ token: 'test-token' });
    const article = payload.items.find((i) => i.kind === 'article')!;
    const saved = await saveFeatured({
      token: 'test-token',
      revision: payload.revision,
      branch: 'main',
      items: [{ key: article.key, featured: true, featuredOrder: 50 }],
    });
    expect(fixture.fetch).toHaveBeenCalledTimes(1);
    const input = JSON.parse(fixture.fetch.mock.calls[0]![1].body).variables.input;
    expect(input.expectedHeadOid).toBe('head-1');
    expect(input.branch.branchName).toBe('main');
    expect(input.fileChanges.additions[0].path).toBe('app/src/content/articles/zh/note/index.mdoc');
    expect(fixture.files.get('src/content/articles/zh/note/index.mdoc')!.split('\n---\n')[1]).toBe(
      original.split('\n---\n')[1],
    );
    expect(saved.items.at(-1)).toMatchObject({ kind: 'article', featuredOrder: 50 });
  });
  it('rejects stale revisions and unknown keys without sending a commit', async () => {
    const payload = await loadFeatured({ token: 'test-token' });
    fixture.head = 'other-head';
    await expect(
      saveFeatured({ token: 'test-token', revision: payload.revision, items: [] }),
    ).rejects.toBeInstanceOf(FeaturedConflict);
    expect(fixture.fetch).not.toHaveBeenCalled();
    const fresh = await loadFeatured({ token: 'test-token' });
    await expect(
      saveFeatured({
        token: 'test-token',
        revision: fresh.revision,
        items: [{ key: '../../outside', featured: true, featuredOrder: 1 }],
      }),
    ).rejects.toThrow('精选条目或排序无效');
    expect(fixture.fetch).not.toHaveBeenCalled();
  });
  it('requires a GitHub token before reading repository files', async () => {
    await expect(loadFeatured({})).rejects.toThrow('请先登录');
  });
});
