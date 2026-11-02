(() => {
  const root = document.documentElement;
  const articleData = document.querySelector('#review-articles');
  const requested = new URLSearchParams(location.search).get('article');
  if (articleData && document.querySelector('.reader') && requested) {
    const article = JSON.parse(articleData.textContent).find((item) => item.id === requested);
    if (article) {
      document.querySelector('[data-article-title]').textContent = article.title;
      document.querySelector('[data-article-excerpt]').textContent = article.excerpt;
      document.querySelector('[data-article-date]').textContent = article.date;
      document
        .querySelectorAll('[data-article-category]')
        .forEach((node) => (node.textContent = article.category));
      document.querySelector('.reading-intro').textContent = article.excerpt;
      const cover = document.querySelector('.reader-cover');
      const img = cover.querySelector('img');
      if (article.image) {
        img.src = img.dataset.coverOriginal = article.image;
        img.alt = article.title + '的样稿封面';
      } else {
        cover.hidden = true;
        document.querySelector('.reader-heading').classList.add('has-no-cover');
        document.querySelector('[data-diagram-toggle]').hidden = true;
      }
    }
  }
  try {
    root.dataset.theme = localStorage.getItem('cover-review-theme') || 'dark';
  } catch {}
  document.querySelectorAll('[data-theme-toggle]').forEach(
    (button) =>
      (button.onclick = () => {
        root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
        try {
          localStorage.setItem('cover-review-theme', root.dataset.theme);
        } catch {}
      }),
  );
  document.querySelectorAll('[data-filter]').forEach(
    (button) =>
      (button.onclick = () => {
        document
          .querySelectorAll('[data-filter]')
          .forEach((item) => item.classList.toggle('active', item === button));
        document
          .querySelectorAll('.entry')
          .forEach(
            (entry) =>
              (entry.hidden =
                button.dataset.filter !== 'all' &&
                entry.dataset.category !== button.dataset.filter),
          );
      }),
  );
  const diagramToggle = document.querySelector('[data-diagram-toggle]');
  diagramToggle?.addEventListener('click', () => {
    const active = diagramToggle.getAttribute('aria-pressed') !== 'true';
    diagramToggle.setAttribute('aria-pressed', String(active));
    diagramToggle.textContent = active ? '恢复示意封面' : '测试图表封面';
    document.querySelectorAll('.cover img').forEach((img) => {
      img.src = active ? 'assets/diagram.jpg' : img.dataset.coverOriginal;
      img.closest('.cover').classList.toggle('is-diagram', active);
    });
  });
})();
