import Markdoc, { type Node } from '@markdoc/markdoc';
import { parse, stringify } from 'yaml';
import { normalizeDollarMath } from '../markdoc-math';
import { normalizeWikiLinks } from '../wikilinks';
import { exportRoot } from './tree';

export type ExportArticle = {
  source: string;
  locale: string;
  id: string;
  title: string;
  translationKey: string;
  metadata: Record<string, unknown>;
  body: string;
  notePath: string;
};
export function parseExportArticle(source: string, text: string): ExportArticle {
  const match = text.replace(/^\uFEFF/, '').match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) throw new Error(`文章缺少元数据：${source}`);
  const metadata = parse(match[1]!) as Record<string, unknown>;
  const locale = source.split('/')[3]!;
  const id = String(metadata.contentId ?? source.split('/')[4]);
  if (!['zh', 'en', 'de'].includes(locale) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id))
    throw new Error(`文章 ID 或语言无效：${source}`);
  return {
    source,
    locale,
    id,
    title: String(metadata.title ?? id),
    translationKey: String(metadata.translationKey ?? id),
    metadata,
    body: text.replace(/^\uFEFF/, '').slice(match[0].length),
    notePath: `文章/${locale}/${id}.md`,
  };
}
const markdownSpecial = new Set(['\\', '`', '*', '_', '[', ']', '<', '>', '$']);
const escape = (text: string) =>
  Array.from(text, (char) => (markdownSpecial.has(char) ? `\\${char}` : char)).join('');
const quote = (text: string) =>
  text
    .trim()
    .split('\n')
    .map((line) => `> ${line}`)
    .join('\n');
const codeFence = (text: string, language = '') => {
  const fence = '`'.repeat(Math.max(3, ...(text.match(/`+/g) ?? []).map((run) => run.length + 1)));
  return `${fence}${language}\n${text.trimEnd()}\n${fence}\n\n`;
};
export function obsidianMarkdown(
  article: ExportArticle,
  articles: ExportArticle[],
  asset: (url: string) => string,
  warnings: string[],
) {
  const render = (node: Node): string => {
    const a = node.attributes;
    const children = () => node.children.map(render).join('');
    const type: string = node.type;
    switch (type) {
      case 'document':
      case 'inline':
        return children();
      case 'text':
        return escape(String(a.content ?? ''));
      case 'paragraph':
        return `${children()}\n\n`;
      case 'heading':
        return `${'#'.repeat(Number(a.level) || 2)} ${children()}\n\n`;
      case 'strong':
        return `**${children()}**`;
      case 'em':
        return `*${children()}*`;
      case 's':
      case 'strikethrough':
        return `~~${children()}~~`;
      case 'code': {
        const content = String(a.content ?? '');
        const ticks = '`'.repeat(
          Math.max(1, ...(content.match(/`+/g) ?? []).map((run) => run.length + 1)),
        );
        return `${ticks} ${content} ${ticks}`;
      }
      case 'fence':
        return codeFence(String(a.content ?? ''), String(a.language ?? ''));
      case 'softbreak':
        return '\n';
      case 'hardbreak':
        return '  \n';
      case 'hr':
        return '---\n\n';
      case 'blockquote':
        return `${quote(children())}\n\n`;
      case 'link':
        return `[${children()}](${asset(String(a.href ?? ''))}${a.title ? ` ${JSON.stringify(a.title)}` : ''})`;
      case 'image':
        return `![${escape(String(a.alt ?? ''))}](${asset(String(a.src ?? ''))}${a.title ? ` ${JSON.stringify(a.title)}` : ''})`;
      case 'list':
        return (
          node.children
            .map((child, index) => {
              const marker = a.ordered ? `${Number(a.start ?? 1) + index}. ` : '- ';
              return render(child)
                .trimEnd()
                .split('\n')
                .map((line, i) => (i ? ' '.repeat(marker.length) : marker) + line)
                .join('\n');
            })
            .join('\n') + '\n\n'
        );
      case 'item':
        return children();
      case 'table': {
        const rows = [...node.walk()]
          .filter((child) => child.type === 'tr')
          .map((row) =>
            row.children.map((cell) =>
              render(cell).trim().replace(/\|/g, '\\|').replace(/\n/g, '<br>'),
            ),
          );
        if (!rows.length) return '';
        return (
          [rows[0]!, rows[0]!.map(() => '---'), ...rows.slice(1)]
            .map((row) => `| ${row.join(' | ')} |`)
            .join('\n') + '\n\n'
        );
      }
      case 'td':
      case 'th':
        return children();
      case 'tag': {
        switch (node.tag) {
          case 'conceptStart':
            return `<span id="concept-${String(a.id ?? '')}"></span>`;
          case 'conceptEnd':
            return '';
          case 'conceptLink':
            warnings.push(
              `${article.id}：概念链接“${String(a.name ?? '')}”保留为文字；完整标记保存在 .sources 中。`,
            );
            return escape(String(a.name || '概念链接'));
          case 'math':
            return `$$\n${String(a.expression ?? '')}\n$$\n\n`;
          case 'inlineMath':
            return `$${String(a.expression ?? '')}$`;
          case 'wikiLink': {
            const raw = String(a.target ?? '');
            const candidates = articles.filter(
              (entry) => entry.id === raw || entry.translationKey === raw || entry.title === raw,
            );
            const target =
              candidates.find((entry) => entry.locale === article.locale) ??
              candidates.find((entry) => entry.locale === 'zh') ??
              candidates[0];
            const heading = a.anchor ? `#${String(a.anchor)}` : '';
            if (!target) warnings.push(`${article.id}：双链目标“${raw}”未找到，保留原目标。`);
            const link = target ? `${exportRoot}/${target.notePath.replace(/\.md$/, '')}` : raw;
            const label = Array.from(String(a.label || target?.title || raw), (char) =>
              '[]|\n'.includes(char) ? ' ' : char,
            ).join('');
            return `[[${link}${heading}|${label}]]`;
          }
          case 'articleImage':
            return `![${escape(String(a.alt ?? ''))}](${asset(String(a.src ?? ''))}${a.title ? ` ${JSON.stringify(a.title)}` : ''})\n\n`;
          case 'pdf':
            return `[${escape(String(a.title || 'PDF'))}](${asset(String(a.file ?? ''))})\n\n`;
          case 'callout':
            return `${quote(`[!${a.variant === 'danger' ? 'danger' : a.variant === 'warning' ? 'warning' : a.variant === 'tip' ? 'tip' : 'note'}] ${String(a.title ?? '')}\n${children().trim()}`)}\n\n`;
          case 'toggle':
            return `${quote(`[!note]${a.open ? '+' : '-'} ${String(a.summary ?? '')}\n${children().trim()}`)}\n\n`;
          case 'columns':
          case 'column':
            return children();
          case 'mindmap':
            return `${a.title ? `### ${escape(String(a.title))}\n\n` : ''}${codeFence(String(a.source ?? ''), 'markmap')}`;
          case 'anchor':
            return `^${String(a.id ?? '')}\n\n`;
          default:
            warnings.push(
              `${article.id}：组件“${node.tag}”导出为文字，原始内容保存在 .sources 中。`,
            );
            return children();
        }
      }
      default:
        return a.content ? String(a.content) : children();
    }
  };
  const ast = Markdoc.parse(normalizeWikiLinks(normalizeDollarMath(article.body)));
  const metadata: Record<string, unknown> = {
    ...article.metadata,
    aliases: [
      ...new Set([
        article.title,
        ...(Array.isArray(article.metadata.aliases) ? article.metadata.aliases : []),
      ]),
    ],
    keystaticSource: article.source,
  };
  if (typeof metadata.coverImage === 'string' && metadata.coverImage)
    metadata.coverImage = asset(metadata.coverImage);
  return `---\n${stringify(metadata).trimEnd()}\n---\n\n# ${escape(article.title)}\n\n${render(ast).trim()}\n`;
}
