import { fields } from '@keystatic/core';
import { useState } from 'react';
import { prepareArticleImage } from './client';

export const ARTICLE_IMAGE_DIRECTORY = 'src/assets/article-images';
export const ARTICLE_IMAGE_PUBLIC_PATH = '../../../../assets/article-images/';

const base = fields.image({
  label: '图片',
  directory: ARTICLE_IMAGE_DIRECTORY,
  publicPath: ARTICLE_IMAGE_PUBLIC_PATH,
  validation: { isRequired: true },
});

/** Shared assets have no article slug or component-property filename prefix. */
export const articleImageField: typeof base = {
  ...base,
  filename(value) {
    return base.filename(value, { slug: undefined, suggestedFilenamePrefix: undefined });
  },
  parse(value, args) {
    return base.parse(value, { ...args, slug: undefined });
  },
  serialize(value) {
    if (value && !/^[a-f0-9]{64}\.webp$/.test(value.filename))
      throw new Error('图片必须先压缩并按 SHA-256 命名。');
    return base.serialize(value, { slug: undefined, suggestedFilenamePrefix: undefined });
  },
  Input: function ArticleImageInput({ onChange }) {
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    return (
      <label>
        {busy ? '正在处理图片…' : '选择图片'}
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp,image/avif"
          disabled={busy}
          onChange={async (event) => {
            const file = event.currentTarget.files?.[0];
            event.currentTarget.value = '';
            if (!file) return;
            setBusy(true);
            setError('');
            try {
              onChange((await prepareArticleImage(file)).src);
            } catch (reason) {
              setError(reason instanceof Error ? reason.message : '图片处理失败。');
            } finally {
              setBusy(false);
            }
          }}
        />
        {error && <span role="alert">{error}</span>}
      </label>
    );
  },
};
