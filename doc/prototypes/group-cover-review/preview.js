(() => {
  const root = document.documentElement;
  try {
    root.dataset.theme = localStorage.getItem('group-cover-theme') || 'dark';
  } catch {}
  document.querySelector('[data-theme-toggle]')?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem('group-cover-theme', root.dataset.theme);
    } catch {}
  });
  const selectLevel = (level) => {
    if (!['category', 'project', 'collection'].includes(level)) level = 'category';
    document
      .querySelectorAll('[data-level]')
      .forEach((panel) => (panel.hidden = panel.dataset.level !== level));
    document
      .querySelectorAll('[data-select-level]')
      .forEach((button) =>
        button.setAttribute('aria-pressed', String(button.dataset.selectLevel === level)),
      );
    document.querySelectorAll('[data-plan-link]').forEach((link) => {
      const url = new URL(link.href);
      url.searchParams.set('level', level);
      link.href = url.href;
    });
    try {
      const url = new URL(location.href);
      url.searchParams.set('level', level);
      history.replaceState(null, '', url);
    } catch {}
  };
  if (document.querySelector('[data-level]'))
    selectLevel(new URLSearchParams(location.search).get('level'));
  document.querySelectorAll('[data-select-level],[data-jump]').forEach((control) =>
    control.addEventListener('click', (event) => {
      event.preventDefault();
      selectLevel(control.dataset.selectLevel || control.dataset.jump);
    }),
  );
  document.querySelector('[data-material-toggle]')?.addEventListener('click', (event) => {
    const button = event.currentTarget,
      active = button.getAttribute('aria-pressed') !== 'true';
    button.setAttribute('aria-pressed', String(active));
    button.textContent = active ? '恢复示意封面' : '测试图表封面';
    document.querySelectorAll('.cover img').forEach((img) => {
      img.src = active ? 'assets/diagram.jpg' : img.dataset.original;
      img.closest('.cover').classList.toggle('is-diagram', active);
    });
  });
  document.querySelector('[data-empty-toggle]')?.addEventListener('click', (event) => {
    const button = event.currentTarget,
      active = button.getAttribute('aria-pressed') !== 'true';
    button.setAttribute('aria-pressed', String(active));
    button.textContent = active ? '恢复封面' : '测试无封面';
    document
      .querySelectorAll('.cover')
      .forEach((cover) => cover.classList.toggle('is-empty', active));
    document.body.classList.toggle('no-cover-mode', active);
  });
})();
