/** Use whole terrain facets as the marker's paper, retaining their outlines. */
export function updateLifeMarkerFacets(landscape: SVGSVGElement, compact: boolean) {
  const marker = landscape.closest('.snowline-panel')?.querySelector('.journey-chapter-marker');
  const matrix = landscape.getScreenCTM();
  if (!marker || !matrix) return;
  const inverse = matrix.inverse();
  const boxes = [...marker.children].map((element) => {
    const box = element.getBoundingClientRect();
    return [
      [box.left - 4, box.top - 4],
      [box.right + 4, box.top - 4],
      [box.right + 4, box.bottom + 4],
      [box.left - 4, box.bottom + 4],
    ].map(([x, y]) => new DOMPoint(x, y).matrixTransform(inverse));
  });
  const intersects = (triangle: DOMPoint[], box: DOMPoint[]) => {
    // Separating axes distinguish real intersections from overlapping bounds.
    const axes = [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
    ];
    triangle.forEach((a, index) => {
      const b = triangle[(index + 1) % triangle.length]!;
      axes.push({ x: b.y - a.y, y: a.x - b.x });
    });
    return axes.every(({ x, y }) => {
      const a = triangle.map((point) => point.x * x + point.y * y);
      const b = box.map((point) => point.x * x + point.y * y);
      return Math.max(...a) >= Math.min(...b) && Math.max(...b) >= Math.min(...a);
    });
  };
  landscape.querySelectorAll('.life-marker-facet').forEach((face) => {
    face.classList.remove('life-marker-facet');
  });
  landscape
    .querySelectorAll<SVGPolygonElement>(
      `.life-rift-${compact ? 'mobile' : 'desktop'} .life-rift-upper .terrain-face`,
    )
    .forEach((face) => {
      const triangle = Array.from({ length: face.points.numberOfItems }, (_, index) => {
        const point = face.points.getItem(index);
        return new DOMPoint(point.x, point.y);
      });
      face.classList.toggle(
        'life-marker-facet',
        boxes.some((box) => intersects(triangle, box)),
      );
    });
}
