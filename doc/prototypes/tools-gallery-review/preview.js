(() => {
  const root = document.documentElement;
  let theme = 'dark';
  try {
    theme = localStorage.getItem('tools-gallery-review-theme') === 'light' ? 'light' : 'dark';
  } catch {
    /* Optional storage. */
  }
  const applyTheme = () => {
    root.dataset.theme = theme;
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      button.setAttribute('aria-label', theme === 'dark' ? '切换为浅色模式' : '切换为深色模式');
      button.title = button.getAttribute('aria-label');
    });
  };
  applyTheme();
  document.querySelectorAll('[data-theme-toggle]').forEach((button) =>
    button.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('tools-gallery-review-theme', theme);
      } catch {
        /* Optional storage. */
      }
      applyTheme();
    }),
  );
  const cards = [...document.querySelectorAll('.tool-card')];
  const input = document.querySelector('input[type="search"]');
  const filters = [...document.querySelectorAll('[data-filter]')];
  let category = '全部';
  const update = () => {
    const query = (input?.value ?? '').trim().toLocaleLowerCase();
    let count = 0;
    for (const card of cards) {
      const matchesCategory = category === '全部' || card.dataset.category === category;
      const matchesQuery = card.textContent.toLocaleLowerCase().includes(query);
      card.hidden = !(matchesCategory && matchesQuery);
      if (!card.hidden) count++;
    }
    const counter = document.querySelector('[data-count]');
    if (counter) counter.textContent = String(count);
    const empty = document.querySelector('.empty-state');
    if (empty) empty.hidden = count > 0;
    filters.forEach((button) =>
      button.setAttribute('aria-pressed', String(button.dataset.filter === category)),
    );
  };
  filters.forEach((button) =>
    button.addEventListener('click', () => {
      category = button.dataset.filter;
      update();
    }),
  );
  input?.addEventListener('input', update);
  update();
})();
