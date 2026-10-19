import { useEffect, useRef, useState } from 'react';

interface Props {
  title?: string;
  source: string;
}

function asMarkdown(source: string) {
  if (/^\s*#/m.test(source) || /^\s*[-*]\s+/m.test(source)) return source;
  const nodes = source.split(/\s*(?:→|->)\s*/u).filter(Boolean);
  return nodes.map((node, index) => `${'  '.repeat(index)}- ${node.trim()}`).join('\n');
}

export default function MindmapIsland({ title, source }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const markmapRef = useRef<{ fit(): Promise<void>; destroy(): void } | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function render() {
      const [{ Transformer }, { Markmap }] = await Promise.all([
        import('markmap-lib'),
        import('markmap-view'),
      ]);
      if (cancelled || !svgRef.current) return;
      const transformer = new Transformer();
      const { root } = transformer.transform(asMarkdown(source));
      const instance = Markmap.create(
        svgRef.current,
        {
          autoFit: true,
          duration: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 300,
          maxWidth: 240,
          paddingX: 14,
          spacingHorizontal: 90,
          spacingVertical: 10,
        },
        root,
      );
      markmapRef.current = instance;
      await instance.fit();
      if (!cancelled) setReady(true);
    }
    void render();
    return () => {
      cancelled = true;
      markmapRef.current?.destroy();
    };
  }, [source]);

  return (
    <div className="mindmap-island" aria-label={title ?? 'Mind map'} data-ready={ready}>
      <div className="mindmap-toolbar">
        {title && <figcaption>{title}</figcaption>}
        <button type="button" onClick={() => void markmapRef.current?.fit()} disabled={!ready}>
          Fit
        </button>
      </div>
      <svg ref={svgRef} className="mindmap-svg" aria-hidden="true" />
      <details className="mindmap-source">
        <summary>Text outline</summary>
        <pre>{source}</pre>
      </details>
    </div>
  );
}
