import { collection, config, fields, singleton } from '@keystatic/core';
import { createElement } from 'react';

import { markdocComponents } from './src/content/markdoc-components';
import { withMathPersistence } from './src/lib/keystatic-math';
import { withWikiLinks } from './src/lib/keystatic-wikilinks';
import { withConcepts } from './src/lib/keystatic-concepts';
import { tagField } from './src/content/tag-field';
import { projectProgress } from './src/content/project-progress';
import { profileFields } from './src/content/profile-fields';
import { WorkspaceRelationship } from './src/content/workspace-relationship';
import { publicationField } from './src/content/publication-field';

type Locale = 'zh' | 'en' | 'de';

const contextValue = (key: string) => {
  if (typeof window === 'undefined') return null;
  const value = new URLSearchParams(window.location.search).get(key);
  return value && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) ? value : null;
};

const relationshipWithContext = (
  options: Parameters<typeof fields.relationship>[0],
  contextKey: string,
) => {
  const field = fields.relationship(options);
  return {
    ...field,
    Input: (props: Parameters<typeof field.Input>[0]) =>
      createElement(WorkspaceRelationship, {
        ...props,
        label: options.label,
        collection: options.collection,
        description: options.description,
        required: options.validation?.isRequired,
      }),
    defaultValue: () => contextValue(contextKey) ?? field.defaultValue(),
  };
};

const stableKeyValidation = {
  isRequired: true,
  pattern: {
    regex: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    message: '只允许小写字母、数字和连字符；创建后不要修改。',
  },
} as const;

const urlSlugValidation = {
  isRequired: true,
  pattern: {
    regex: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    message: '只允许小写字母、数字和连字符。',
  },
} as const;

const stableId = (label: string) =>
  fields.slug({
    name: {
      label,
      description: '稳定主键，同时作为 Git 文件/目录键；发布后不要修改。',
      validation: stableKeyValidation,
    },
    slug: {
      label: '文件键',
      description: '关系字段引用此键；应与稳定 ID 一致。',
      generate: (name) =>
        name
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, ''),
      validation: stableKeyValidation,
    },
  });

const localizedText = fields.object(
  {
    zh: fields.object({
      title: fields.text({ label: '中文标题', validation: { isRequired: true } }),
      description: fields.text({ label: '中文简介', multiline: true }),
    }),
    en: fields.object({
      title: fields.text({ label: 'English title', validation: { isRequired: true } }),
      description: fields.text({ label: 'English description', multiline: true }),
    }),
    de: fields.object({
      title: fields.text({ label: 'Deutscher Titel', validation: { isRequired: true } }),
      description: fields.text({ label: 'Deutsche Beschreibung', multiline: true }),
    }),
  },
  { layout: [4, 4, 4] },
);

const tags = tagField;

const coverImage = (publicPath: string) =>
  fields.image({
    label: '封面图',
    directory: 'src/assets/content/covers',
    publicPath,
    description: '建议使用 AVIF/WebP/JPEG；替代文本在正文或卡片语境中维护。',
  });

const seo = fields.object(
  {
    title: fields.text({ label: 'SEO 标题' }),
    description: fields.text({ label: 'SEO 描述', multiline: true }),
  },
  { label: 'SEO 覆盖（可选）' },
);

const localeField = (locale: Locale) =>
  fields.select({
    label: '语言',
    defaultValue: locale,
    options: [{ label: locale.toUpperCase(), value: locale }],
    description: '由当前语言集合固定；如需另一语言，请在对应集合中创建。',
  });

const body = withMathPersistence(
  withConcepts(
    withWikiLinks(
      fields.markdoc({
        label: '正文',
        extension: 'mdoc',
        options: {
          heading: [2, 3, 4, 5, 6],
          table: true,
          divider: true,
          codeBlock: true,
          image: {
            directory: 'src/assets/content/body',
            publicPath: '../../../../assets/content/body/',
            schema: {
              alt: fields.text({ label: '替代文本', validation: { isRequired: true } }),
              title: fields.text({ label: '图片标题' }),
            },
          },
        },
        components: markdocComponents,
      }),
    ),
  ),
);

const commonContentFields = (locale: Locale) => ({
  contentId: stableId('稳定内容 ID'),
  translationKey: fields.text({
    label: '翻译组 ID',
    description: '三种语言的同一内容必须使用相同值。',
    defaultValue: () => contextValue('treeTranslationKey') ?? '',
    validation: stableKeyValidation,
  }),
  locale: localeField(locale),
  title: fields.text({ label: '标题', validation: { isRequired: true } }),
  slug: fields.text({
    label: 'URL slug',
    description: '可以修改；稳定关系不依赖此字段。',
    validation: urlSlugValidation,
  }),
  excerpt: fields.text({ label: '摘要', multiline: true }),
  status: publicationField('状态', true),
  publishedAt: fields.datetime({
    label: '发布时间',
    defaultValue: { kind: 'now' },
    validation: { isRequired: true },
  }),
  updatedAt: fields.datetime({ label: '更新时间' }),
  tags,
  authorName: fields.text({
    label: '作者',
    defaultValue: 'iceaxing',
    validation: { isRequired: true },
  }),
  featured: fields.checkbox({ label: '首页精选', defaultValue: false }),
  order: fields.integer({ label: '排序', defaultValue: 0, validation: { min: 0 } }),
  coverImage: coverImage('../../../../assets/content/covers/'),
  seo,
});

const articleCollection = (locale: Locale) =>
  collection({
    label: `文章 · ${locale.toUpperCase()}`,
    path: `src/content/articles/${locale}/*/`,
    slugField: 'contentId',
    entryLayout: 'content',
    format: { contentField: 'body' },
    columns: ['title', 'status', 'publishedAt'],
    schema: {
      ...commonContentFields(locale),
      featured: fields.checkbox({
        label: '首页列表精选',
        description:
          '显示在首页左侧的精选文章列表，仅展示已公开文章，按发布时间从新到旧最多显示 8 篇。',
        defaultValue: false,
      }),
      category: relationshipWithContext(
        {
          label: '直属分类',
          collection: 'categories',
          description: '与“项目”二选一。',
        },
        'treeCategory',
      ),
      project: relationshipWithContext(
        {
          label: '所属项目',
          collection: 'projects',
          description: '与“直属分类”二选一。',
        },
        'treeProject',
      ),
      collection: relationshipWithContext(
        {
          label: '所属合集',
          collection: 'series',
          description: '只有选择项目后才能使用；构建期会校验归属。',
        },
        'treeCollection',
      ),
      body,
    },
  });

const logCollection = (locale: Locale) =>
  collection({
    label: `日志 · ${locale.toUpperCase()}`,
    path: `src/content/logs/${locale}/*/`,
    slugField: 'contentId',
    entryLayout: 'content',
    format: { contentField: 'body' },
    columns: ['title', 'status', 'logDate'],
    schema: {
      ...commonContentFields(locale),
      logDate: fields.date({
        label: '日志日期',
        defaultValue: { kind: 'today' },
        validation: { isRequired: true },
      }),
      category: fields.text({ label: '日志分类', defaultValue: '随笔' }),
      body,
    },
  });

const pageCollection = (locale: Locale) =>
  collection({
    label: `页面 · ${locale.toUpperCase()}`,
    path: `src/content/pages/${locale}/*/`,
    slugField: 'contentId',
    entryLayout: 'content',
    format: { contentField: 'body' },
    columns: ['title', 'pageKind', 'status'],
    schema: {
      contentId: stableId('稳定页面 ID'),
      translationKey: fields.text({ label: '翻译组 ID', validation: stableKeyValidation }),
      locale: localeField(locale),
      title: fields.text({ label: '标题', validation: { isRequired: true } }),
      slug: fields.text({ label: 'URL slug', validation: urlSlugValidation }),
      excerpt: fields.text({ label: '摘要', multiline: true }),
      pageKind: fields.select({
        label: '页面类型',
        defaultValue: 'custom',
        options: [
          { label: '关于', value: 'about' },
          { label: '个人档案', value: 'profile' },
          { label: '自定义', value: 'custom' },
        ],
      }),
      status: fields.select({
        label: '状态',
        defaultValue: 'draft',
        options: [
          { label: '草稿', value: 'draft' },
          { label: '已发布', value: 'published' },
          { label: '已归档', value: 'archived' },
        ],
      }),
      updatedAt: fields.datetime({ label: '更新时间' }),
      profile: profileFields(),
      coverImage: coverImage('../../../../assets/content/covers/'),
      seo,
      body,
    },
  });

const githubOwner = import.meta.env.PUBLIC_KEYSTATIC_GITHUB_OWNER;
const folderPublication = () => ({
  publicationStatus: publicationField(),
  publishedAt: fields.datetime({
    label: '发布时间',
    description: '定时发布时使用的公开时间。',
    defaultValue: { kind: 'now' },
  }),
});
const githubRepo = import.meta.env.PUBLIC_KEYSTATIC_GITHUB_REPO;
const useGitHub = Boolean(
  import.meta.env.PUBLIC_KEYSTATIC_STORAGE_KIND === 'github' && githubOwner && githubRepo,
);

export default config({
  storage: useGitHub
    ? { kind: 'github', repo: { owner: githubOwner, name: githubRepo } }
    : { kind: 'local' },
  locale: 'zh-CN',
  ui: {
    brand: {
      name: 'iceaxing 内容管理',
      mark: () =>
        createElement(
          'a',
          {
            href: '/keystatic/workspace',
            target: '_top',
            title: '打开文件树工作区',
            style: {
              color: 'inherit',
              fontSize: 18,
              lineHeight: 1,
              textDecoration: 'none',
            },
          },
          '▦',
        ),
    },
    navigation: {
      文章: ['articlesZh', 'articlesEn', 'articlesDe'],
      日志与页面: ['logsZh', 'logsEn', 'logsDe', 'pagesZh', 'pagesEn', 'pagesDe'],
      内容层级: ['categories', 'projects', 'series'],
      站点数据: ['friends', 'mottos', 'siteSettings'],
    },
  },
  collections: {
    articlesZh: articleCollection('zh'),
    articlesEn: articleCollection('en'),
    articlesDe: articleCollection('de'),
    logsZh: logCollection('zh'),
    logsEn: logCollection('en'),
    logsDe: logCollection('de'),
    pagesZh: pageCollection('zh'),
    pagesEn: pageCollection('en'),
    pagesDe: pageCollection('de'),
    categories: collection({
      label: '分类',
      path: 'src/content/categories/*',
      slugField: 'categoryId',
      format: 'yaml',
      columns: ['categoryId', 'group', 'slug', 'order'],
      schema: {
        categoryId: stableId('稳定分类 ID'),
        slug: fields.text({ label: 'URL slug', validation: urlSlugValidation }),
        group: {
          ...fields.select({
            label: '首页板块',
            description: '决定分类入口展示在首页的“技术栈”、“学习笔记”或“生活日常”板块。',
            options: [
              { label: '技术栈', value: 'skill' },
              { label: '学习笔记', value: 'study' },
              { label: '生活日常', value: 'life' },
            ],
            defaultValue: 'skill',
          }),
          defaultValue: () => {
            const group = contextValue('treeGroup');
            return group === 'life' || group === 'study' ? group : 'skill';
          },
        },
        labels: localizedText,
        tags,
        ...folderPublication(),
        featured: fields.checkbox({
          label: '首页卡片精选',
          description: '显示在首页右侧的精选入口卡片区。',
          defaultValue: false,
        }),
        order: fields.integer({ label: '排序', defaultValue: 0, validation: { min: 0 } }),
        createdAt: fields.datetime({
          label: '创建时间',
          defaultValue: { kind: 'now' },
          validation: { isRequired: true },
        }),
        icon: fields.text({ label: '图标键' }),
        coverImage: coverImage('../../assets/content/covers/'),
      },
    }),
    projects: collection({
      label: '项目',
      path: 'src/content/projects/*',
      slugField: 'projectId',
      format: 'yaml',
      columns: ['projectId', 'category', 'status', 'progress'],
      schema: {
        projectId: stableId('稳定项目 ID'),
        slug: fields.text({ label: 'URL slug', validation: urlSlugValidation }),
        category: relationshipWithContext(
          {
            label: '所属分类',
            collection: 'categories',
            validation: { isRequired: true },
          },
          'treeCategory',
        ),
        labels: localizedText,
        tags,
        ...folderPublication(),
        featured: fields.checkbox({
          label: '首页卡片精选',
          description: '显示在首页右侧的精选入口卡片区。',
          defaultValue: false,
        }),
        order: fields.integer({ label: '排序', defaultValue: 0, validation: { min: 0 } }),
        createdAt: fields.datetime({
          label: '创建时间',
          defaultValue: { kind: 'now' },
          validation: { isRequired: true },
        }),
        status: fields.select({
          label: '状态',
          defaultValue: 'planned',
          options: [
            { label: '计划中', value: 'planned' },
            { label: '进行中', value: 'active' },
            { label: '已完成', value: 'completed' },
            { label: '已归档', value: 'archived' },
          ],
        }),
        progress: projectProgress,
        coverImage: coverImage('../../assets/content/covers/'),
      },
    }),
    series: collection({
      label: '合集',
      path: 'src/content/collections/*',
      slugField: 'collectionId',
      format: 'yaml',
      columns: ['collectionId', 'project', 'order'],
      schema: {
        collectionId: stableId('稳定合集 ID'),
        slug: fields.text({ label: 'URL slug', validation: urlSlugValidation }),
        project: relationshipWithContext(
          {
            label: '所属项目',
            collection: 'projects',
            validation: { isRequired: true },
          },
          'treeProject',
        ),
        labels: localizedText,
        tags,
        ...folderPublication(),
        featured: fields.checkbox({
          label: '首页卡片精选',
          description: '显示在首页右侧的精选入口卡片区。',
          defaultValue: false,
        }),
        order: fields.integer({ label: '排序', defaultValue: 0, validation: { min: 0 } }),
        coverImage: coverImage('../../assets/content/covers/'),
        createdAt: fields.datetime({
          label: '创建时间',
          defaultValue: { kind: 'now' },
          validation: { isRequired: true },
        }),
      },
    }),
    friends: collection({
      label: '友链',
      path: 'src/content/friends/*',
      slugField: 'friendId',
      format: 'yaml',
      columns: ['name', 'url', 'order', 'active'],
      schema: {
        friendId: stableId('稳定友链 ID'),
        name: fields.text({ label: '名称', validation: { isRequired: true } }),
        url: fields.url({ label: 'URL', validation: { isRequired: true } }),
        avatar: fields.url({ label: '头像 URL' }),
        description: fields.text({ label: '描述', multiline: true }),
        owner: fields.text({ label: '站长 / 作者（可选）' }),
        tags,
        language: fields.text({ label: '站点语言（可选）' }),
        since: fields.text({ label: '相识时间（可选）', description: '例如：2024 或 2024 年秋。' }),
        links: fields.array(
          fields.object({
            label: fields.text({ label: '名称', validation: { isRequired: true } }),
            url: fields.url({ label: '链接', validation: { isRequired: true } }),
          }),
          { label: '相关链接（可选）', itemLabel: (props) => props.fields.label.value || '新链接' },
        ),
        order: fields.integer({ label: '排序', defaultValue: 0, validation: { min: 0 } }),
        active: fields.checkbox({ label: '启用', defaultValue: true }),
      },
    }),
    mottos: collection({
      label: '格言',
      path: 'src/content/mottos/*',
      slugField: 'mottoId',
      format: 'yaml',
      columns: ['locale', 'text', 'order', 'active'],
      schema: {
        mottoId: stableId('稳定格言 ID'),
        locale: fields.select({
          label: '语言',
          defaultValue: 'zh',
          options: [
            { label: '中文', value: 'zh' },
            { label: 'English', value: 'en' },
            { label: 'Deutsch', value: 'de' },
          ],
        }),
        text: fields.text({ label: '正文', multiline: true, validation: { isRequired: true } }),
        source: fields.text({ label: '来源' }),
        order: fields.integer({ label: '排序', defaultValue: 0, validation: { min: 0 } }),
        active: fields.checkbox({ label: '启用', defaultValue: true }),
      },
    }),
  },
  singletons: {
    siteSettings: singleton({
      label: '站点设置',
      path: 'src/content/settings/site',
      format: 'yaml',
      schema: {
        siteTitle: fields.text({ label: '站点名称', validation: { isRequired: true } }),
        authorName: fields.text({ label: '作者名称', validation: { isRequired: true } }),
        descriptions: fields.object(
          {
            zh: fields.text({ label: '中文描述', multiline: true }),
            en: fields.text({ label: 'English description', multiline: true }),
            de: fields.text({ label: 'Deutsche Beschreibung', multiline: true }),
          },
          { label: '站点描述' },
        ),
        socialLinks: fields.array(
          fields.object({
            label: fields.text({ label: '名称', validation: { isRequired: true } }),
            url: fields.url({ label: 'URL', validation: { isRequired: true } }),
          }),
          { label: '社交链接', itemLabel: (props) => props.fields.label.value },
        ),
        features: fields.object(
          {
            subscriptions: fields.checkbox({ label: '启用订阅', defaultValue: true }),
            comments: fields.checkbox({ label: '启用评论', defaultValue: true }),
          },
          { label: '功能开关' },
        ),
      },
    }),
  },
});
