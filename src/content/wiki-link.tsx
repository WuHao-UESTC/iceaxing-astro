import { fields } from '@keystatic/core';
import { inline } from '@keystatic/core/content-components';
import { useEffect, useState } from 'react';
import { editorWikiLocale, loadWikiTargets } from '../lib/wikilink-catalog';
import { resolveWikiTarget, type WikiLinkValue } from '../lib/wikilinks';

function WikiLinkPreview({ value }: { value: WikiLinkValue }) {
  const [title, setTitle] = useState(value.target);
  useEffect(() => {
    let active = true;
    void loadWikiTargets()
      .then((targets) => {
        if (active)
          setTitle(
            resolveWikiTarget(value.target, targets, editorWikiLocale())?.title ?? value.target,
          );
      })
      .catch(() => {
        if (active) setTitle(value.target);
      });
    return () => {
      active = false;
    };
  }, [value.target]);
  return (
    <span
      title={`WikiLink → ${value.target}${value.anchor ? `#${value.anchor}` : ''}`}
      style={{
        color: 'var(--ks-color-alias-foreground-accent, #3b82f6)',
        textDecoration: 'underline',
        textUnderlineOffset: 3,
      }}
    >
      {value.label || title}
    </span>
  );
}

export const wikiLink = inline({
  label: 'WikiLink · 文章引用',
  description: '输入 [[ 搜索文章。使用稳定内容 ID，文章改名或移动后仍能定位。',
  schema: {
    target: fields.text({ label: '目标文章 ID', validation: { isRequired: true } }),
    label: fields.text({ label: '显示文字', description: '留空时自动显示目标文章的最新标题。' }),
    anchor: fields.text({
      label: '标题锚点',
      description: '可选，填写目标标题的锚点 ID，不含 #。',
    }),
  },
  ContentView: WikiLinkPreview,
});
