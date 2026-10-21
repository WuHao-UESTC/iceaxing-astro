import { fields } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';
import { useEffect, useState } from 'react';
import { prepareArticleImage } from '../lib/media/client';
import { articleImageField } from '../lib/media/image-field';

export const articleImage = block({
  label: '文章图片',
  description: '压缩为 WebP 后按内容哈希保存到 Git。',
  schema: {
    src: articleImageField,
    alt: fields.text({ label: '替代文本' }),
    title: fields.text({ label: '图片说明' }),
    width: fields.integer({ label: '宽度' }),
    height: fields.integer({ label: '高度' }),
  },
  NodeView: function ArticleImageEditor({ value, onChange, onRemove }) {
    const [preview, setPreview] = useState('');
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    useEffect(() => {
      if (!value.src) {
        setPreview('');
        return;
      }
      const buffer = Uint8Array.from(value.src.data).buffer;
      const url = URL.createObjectURL(new Blob([buffer], { type: 'image/webp' }));
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }, [value.src]);
    return (
      <figure contentEditable={false} style={{ margin: '1rem 0' }}>
        {preview && (
          <img src={preview} alt={value.alt} style={{ maxWidth: '100%', maxHeight: 600 }} />
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
          <label>
            {busy ? '正在处理…' : value.src ? '替换图片' : '选择图片'}
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
                  onChange({
                    ...(await prepareArticleImage(file)),
                    alt: value.alt,
                    title: value.title,
                  });
                } catch (reason) {
                  setError(reason instanceof Error ? reason.message : '图片处理失败。');
                } finally {
                  setBusy(false);
                }
              }}
            />
          </label>
          <label>
            替代文本{' '}
            <input
              value={value.alt}
              disabled={busy}
              onChange={(event) => onChange({ ...value, alt: event.target.value })}
            />
          </label>
          <label>
            图片说明{' '}
            <input
              value={value.title}
              disabled={busy}
              onChange={(event) => onChange({ ...value, title: event.target.value })}
            />
          </label>
          <button type="button" onClick={onRemove} disabled={busy}>
            移除图片
          </button>
        </div>
        {error && <p role="alert">{error}</p>}
      </figure>
    );
  },
});
articleImage.handleFile = (file) =>
  file.type.startsWith('image/') ? prepareArticleImage(file) : false;
