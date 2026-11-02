(() => {
  const { plans, groups } = window.ARCHIVE_LAYOUT_REVIEW;
  const plan = document.body.dataset.plan;
  const params = new URLSearchParams(location.search);
  const state = {
    group: groups[params.get('group')] ? params.get('group') : 'study',
    level: ['category', 'project', 'collection'].includes(params.get('level'))
      ? params.get('level')
      : 'category',
    density: ['normal', 'dense', 'sparse', 'empty'].includes(params.get('density'))
      ? params.get('density')
      : 'normal',
    theme: params.get('theme') === 'light' ? 'light' : 'dark',
    type: 'all',
    query: '',
    tags: [],
    status: 'all',
  };
  const root = document.querySelector('#sample-root');
  const dialog = document.querySelector('#entry-preview');
  const labels = { category: '分类', project: '项目', collection: '合集', article: '文章' };
  const escape = (value) =>
    String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  const number = (value) => String(value).padStart(2, '0');
  const groupKinds = ['project', 'collection', 'article'];
  let entries = [];
  const theme = () => {
    document.documentElement.dataset.theme = state.theme;
    document
      .querySelectorAll('[data-theme-toggle]')
      .forEach(
        (button) =>
          (button.innerHTML = `${state.theme === 'dark' ? '浅色模式' : '深色模式'} <span aria-hidden="true">◐</span>`),
      );
  };
  const remember = () => {
    const query = new URLSearchParams({
      group: state.group,
      level: state.level,
      density: state.density,
      theme: state.theme,
    });
    try {
      history.replaceState(null, '', '?' + query);
    } catch {
      /* File previews may disallow history updates. */
    }
    document
      .querySelectorAll('[data-plan-link]')
      .forEach((link) => (link.href = link.getAttribute('href').split('?')[0] + '?' + query));
  };
  const stat = (count, label) =>
    `<div class="archive-statistic" role="listitem"><svg class="archive-statistic-art" viewBox="0 0 160 144" fill="none" aria-hidden="true"><g fill="currentColor"><path opacity=".13" d="m8 126 35-75 10 55 30-25 23 48-53-13-10-65-13 65Z"/><path opacity=".18" d="m120 23 20-12-8 31Zm6 77 22 9-11 21ZM22 42l8-12 5 19Z"/></g><path d="m8 126 35-75 10 55 30-25 23 48" stroke="currentColor" opacity=".3"/></svg><div class="archive-statistic-copy"><strong>${number(count)}</strong><span>${label}</span></div></div>`;
  const scene = () => {
    const terrain =
      '<g stroke="currentColor" stroke-opacity=".2" stroke-width=".7"><path fill="currentColor" fill-opacity=".04" d="M0 300 120 75 250 270 390 150 530 310 650 45 785 270 910 115 1000 290v50H0Z"/><path d="m0 300 160 22 230-172 35 178 225-283 40 280 220-210 20 217"/></g>';
    const details = {
      study:
        '<g stroke="currentColor" stroke-opacity=".3" stroke-width=".7"><path d="m40 90 130 35 90-76 122 82 153-74 100 81 139-52 151 105M170 125l93 111 119-105 155 113 98-106 113 127"/><g fill="currentColor"><circle cx="170" cy="125" r="3"/><circle cx="382" cy="131" r="3"/><circle cx="635" cy="138" r="3"/></g></g>',
      skill:
        '<path d="M100 35v60h150v60h180m0-50 90 50-90 50Zm90 50h210v-60h160M250 155v110h330v-60h150v110" stroke="currentColor" stroke-opacity=".2" stroke-width=".7"/>',
      life: '<g stroke="currentColor" stroke-opacity=".25" fill="currentColor" fill-opacity=".05"><path d="M30 20 180 5 140 95 75 135 5 90Zm290 45 100-40 90 65-55 55-115-30Zm350-30 105-20 65 75-115 30-65-40ZM180 265l125-60 85 85-60 45-145-15Z"/></g>',
      camp: '<g stroke="currentColor" stroke-width=".8"><path d="M0 45 95 15 70 105 105 150 55 230 125 300 0 340Z" fill="currentColor" fill-opacity=".06" stroke-opacity=".22"/><path d="M120 285 280 260 390 280 535 245 640 267 780 225 930 245" stroke-opacity=".4" stroke-dasharray="3 7"/><path d="M280 260v-25h22m233 10v-25h22m223 5v-25h22" stroke-opacity=".3"/><g fill="currentColor" opacity=".5"><circle cx="280" cy="260" r="3"/><circle cx="535" cy="245" r="3"/><circle cx="780" cy="225" r="3"/></g></g>',
    };
    return `<svg class="archive-folder-landscape landscape-${state.group}" viewBox="0 0 1000 340" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${state.group === 'camp' ? '' : terrain}${details[state.group]}</svg>`;
  };
  const makeEntries = () => {
    const group = groups[state.group];
    let articles = group.articles.slice(0, 4);
    if (state.density === 'dense')
      articles = [
        ...articles,
        ...Array.from({ length: 14 }, (_, i) => ({
          ...group.articles[i % group.articles.length],
          title: `${['进一步理解', '实践中的观察', '延伸笔记'][i % 3]} · ${number(i + 1)}`,
          demo: true,
        })),
      ];
    let result =
      state.level === 'category'
        ? [...group.projects, ...articles]
        : state.level === 'project'
          ? [...group.collections, ...articles]
          : articles;
    if (state.density === 'sparse') result = articles.slice(0, 1);
    if (state.density === 'empty') result = [];
    return result.map((entry, index) => ({ ...entry, id: 'entry-' + index }));
  };
  const card = (entry) => {
    const index = entries
      .filter((item) => item.kind === entry.kind)
      .findIndex((item) => item.id === entry.id);
    return `<li data-card="${entry.id}" data-kind="${entry.kind}"><a class="entry-link archive-entry ${entry.kind === 'article' ? 'archive-entry-has-cover' : `archive-folder-entry archive-folder-${entry.kind}`}" data-cover-group="${state.group}" href="#${entry.id}" data-open-entry="${entry.id}" id="${entry.id}" title="${escape(entry.title)}"><span class="archive-number" aria-hidden="true">${number(index + 1)}</span><div class="archive-entry-copy">${entry.kind === 'article' ? `<span class="archive-entry-date">${entry.date}</span>` : `<small class="archive-entry-state">${entry.kind === 'project' ? `${entry.status === 'completed' ? '已完成' : '进行中'} · ${entry.progress}%` : '专题合集'}</small>`}<h3>${escape(entry.title)}</h3><p>${escape(entry.description)}</p>${entry.tags.length ? `<span class="archive-tags">${entry.tags.map((tag) => '#' + escape(tag)).join(' · ')}</span>` : ''}</div><span class="archive-entry-end"><i aria-hidden="true">↗</i></span><span class="${entry.kind === 'article' ? 'archive-entry-cover' : 'archive-folder-entry-cover'}"><img src="${entry.image}" alt="" width="900" height="600" decoding="async"></span></a></li>`;
  };
  const header = () => {
    const group = groups[state.group];
    const count = (kind) => entries.filter((entry) => entry.kind === kind).length;
    const kinds =
      state.level === 'category'
        ? ['project', 'article']
        : state.level === 'project'
          ? ['collection', 'article']
          : ['article'];
    const title = state.level === 'category' ? group.category : group[state.level];
    const description =
      state.level === 'category' ? group.description : group[state.level + 'Description'];
    const progress = state.group === 'skill' ? 100 : 65;
    return `<nav class="archive-breadcrumb" aria-label="当前位置"><span>${group.name}</span><span>/</span>${state.level !== 'category' ? `<button data-jump-level="category">${escape(group.category)}</button><span>/</span>` : ''}<span aria-current="page">${escape(title)}</span></nav><header class="archive-heading archive-folder-hero">${scene()}<div class="archive-heading-copy"><p class="archive-kicker">${{ category: '主题索引', project: '项目手册', collection: '阅读目录' }[state.level]}</p><h1>${escape(title)}</h1><p class="archive-description">${escape(description)}</p><p class="archive-folder-marker" aria-hidden="true"><span></span>${state.group === 'camp' ? '沿途随记 / ' : ''}${group.caption}</p></div><figure class="archive-folder-cover"><img src="${group.hero}" alt="" width="900" height="600"><figcaption>${group.caption}<span>${state.level.toUpperCase()} / FIELD NOTES</span></figcaption></figure><div class="archive-statistics" role="list" aria-label="内容统计">${kinds.map((kind) => stat(count(kind), kind === 'article' && state.level !== 'collection' ? '独立文章' : labels[kind])).join('')}</div>${state.level === 'project' ? `<div class="archive-folder-progress"><span>项目进度</span><progress value="${progress}" max="100" aria-label="项目进度">${progress}%</progress><strong>${progress}%</strong><small>${progress === 100 ? '已完成' : '进行中'} · 示意</small></div>` : ''}${
      state.level === 'collection' && entries.length
        ? `<nav class="archive-folder-chapters" aria-label="章节起点">${entries
            .slice(0, 3)
            .map(
              (entry, index) =>
                `<a href="#${entry.id}" data-open-entry="${entry.id}"><span>${number(index + 1)}</span>${escape(entry.title)}</a>`,
            )
            .join('')}</nav>`
        : ''
    }</header>`;
  };
  const visibleEntries = () =>
    entries.filter(
      (entry) =>
        (state.type === 'all' || entry.kind === state.type) &&
        (!state.query ||
          `${entry.title} ${entry.description} ${entry.tags.join(' ')}`
            .toLocaleLowerCase()
            .includes(state.query.toLocaleLowerCase())) &&
        (!state.tags.length || state.tags.some((tag) => entry.tags.includes(tag))) &&
        (state.status === 'all' || entry.status === state.status),
    );
  const sections = (source, path = false) =>
    groupKinds
      .filter((kind) => source.some((entry) => entry.kind === kind))
      .map((kind, groupIndex) => {
        const list = source.filter((entry) => entry.kind === kind);
        if (!list.length) return '';
        return `<section class="archive-group archive-group-${kind}${path ? ' path-group' : ''}" aria-labelledby="heading-${kind}"><header class="archive-group-heading">${path ? `<span class="path-stage" aria-hidden="true">${number(groupIndex + 1)}</span>` : ''}<h2 id="heading-${kind}">${state.level === 'collection' && kind === 'article' ? '阅读章节' : labels[kind]}</h2><span>${number(list.length)}</span></header><ol class="archive-entries">${list.map((entry, index) => (path ? `<li class="path-step"><div class="path-node"><span class="path-dot" aria-hidden="true"></span>${state.level === 'collection' ? `<span>第 ${number(index + 1)} 章</span><small>依既定顺序</small>` : `<time>${entry.date.slice(5).replace('-', '.')}</time><small>${entry.date.slice(0, 4)} · ${entry.kind === 'project' ? (entry.status === 'completed' ? '已完成' : '进行中') : labels[entry.kind]}</small>`}</div><ol class="path-card">${card(entry)}</ol></li>` : card(entry))).join('')}</ol></section>`;
      })
      .join('');
  const empty = () =>
    `<div class="review-empty"><svg viewBox="0 0 100 70" fill="none" aria-hidden="true"><path d="m4 61 28-42 25 37 17-28 23 33" stroke="currentColor"/><path d="m32 19 7 42h18m17-33 4 33" stroke="currentColor" opacity=".35"/></svg><h2>${entries.length ? '没有符合条件的内容' : '这里的记录还在路上'}</h2><p>${entries.length ? '换一个关键词，或清除筛选再看看。' : '有新内容时，会按相同的版式自然展开。'}</p>${entries.length ? '<button type="button" class="text-action" data-reset-filters>清除筛选 ↗</button>' : ''}</div>`;
  const tabs = () => {
    const kinds = groupKinds.filter((kind) => entries.some((entry) => entry.kind === kind));
    return kinds.length > 1
      ? `<nav class="content-switch" aria-label="按内容类型筛选"><button data-type="all" aria-pressed="true">全部 <span>${entries.length}</span></button>${kinds.map((kind) => `<button data-type="${kind}" aria-pressed="false">${labels[kind]} <span>${entries.filter((entry) => entry.kind === kind).length}</span></button>`).join('')}<span class="switch-hint">按内容切换</span></nav>`
      : '';
  };
  const filterPanel = () => {
    const tags = [...new Set(entries.flatMap((entry) => entry.tags))];
    const kinds = groupKinds.filter((kind) => entries.some((entry) => entry.kind === kind));
    return `<aside class="filter-rail"><details class="filter-panel"${innerWidth > 768 ? ' open' : ''}><summary>搜索与筛选 <span aria-hidden="true">⌄</span></summary><form id="content-filters"><label class="search-label" for="entry-query">查找内容</label><div class="search-field"><span aria-hidden="true">⌕</span><input id="entry-query" name="query" type="search" placeholder="标题、摘要或主题" autocomplete="off"></div>${kinds.length > 1 ? `<fieldset><legend>内容类型</legend>${['all', ...kinds].map((kind) => `<label><input type="radio" name="kind" value="${kind}"${kind === 'all' ? ' checked' : ''}>${kind === 'all' ? '全部内容' : labels[kind]}<span>${kind === 'all' ? entries.length : entries.filter((entry) => entry.kind === kind).length}</span></label>`).join('')}</fieldset>` : ''}${tags.length ? `<fieldset><legend>主题</legend>${tags.map((tag) => `<label><input type="checkbox" name="tag" value="${escape(tag)}">${escape(tag)}</label>`).join('')}</fieldset>` : ''}${entries.some((entry) => entry.kind === 'project') ? '<label class="status-label" for="project-status">项目状态<select id="project-status" name="status"><option value="all">全部状态</option><option value="active">进行中</option><option value="completed">已完成</option></select></label>' : ''}<button type="reset" class="text-action">重置筛选 ↺</button><p class="filter-footnote">${state.level === 'collection' ? '筛选后仍保留原有章节顺序。' : '只按需要收窄内容，默认顺序保持不变。'}</p></form></details></aside>`;
  };
  const renderResults = () => {
    const filtered = visibleEntries();
    let content;
    if (!filtered.length) content = empty();
    else if (plan === 'c') {
      const first = filtered[0];
      content = `<section class="reading-start" aria-labelledby="reading-start-title"><div class="reading-start-heading"><p class="review-eyebrow">${state.level === 'collection' ? 'READ FROM THE BEGINNING' : 'A PLACE TO BEGIN'}</p><h2 id="reading-start-title">${state.level === 'collection' ? '从第一篇开始' : '从这里开始'}</h2><p>${state.level === 'collection' ? '按章节循序读下去，也可以继续浏览完整目录。' : '先展开一个专题，再顺着其余记录继续走。'}</p></div><ol class="archive-group-${first.kind} reading-start-entry">${card(first)}</ol></section>${filtered.length > 1 ? '<div class="remaining-label">继续浏览 <span aria-hidden="true">↓</span></div>' : ''}${sections(filtered.slice(1))}`;
    } else content = sections(filtered, plan === 'd');
    document.querySelector('#layout-results').innerHTML = content;
    document
      .querySelectorAll('[data-results-count]')
      .forEach(
        (element) =>
          (element.textContent = `显示 ${filtered.length} / ${entries.length} 项${state.level === 'collection' ? ' · 保留章节顺序' : ''}`),
      );
    document
      .querySelectorAll('[data-type]')
      .forEach((button) =>
        button.setAttribute('aria-pressed', String(button.dataset.type === state.type)),
      );
  };
  const render = () => {
    if (!root) return;
    entries = makeEntries();
    const sceneName = { study: 'study', skill: 'ridge', life: 'field', camp: 'camp' }[state.group];
    root.innerHTML = `<main id="main-content" class="archive-page archive-${state.level} archive-tone-${sceneName} archive-folder-group-${state.group} shell">${header()}<div class="sample-content">${plan === 'b' ? tabs() : ''}<div class="archive-layout${plan === 'e' ? ' filter-layout' : ''}">${plan === 'e' ? filterPanel() : ''}<div class="archive-sections">${['b', 'e'].includes(plan) ? '<p class="results-line" role="status" aria-live="polite" data-results-count></p>' : ''}${plan === 'd' && entries.length ? `<p class="path-intro">${state.level === 'collection' ? '沿着章节，一步一步读下去。' : '把分散的记录，连成沿途的脚印。'}</p>` : ''}<div id="layout-results"></div></div></div></div></main>`;
    document.querySelector('[data-group]').value = state.group;
    document.querySelector('[data-density]').value = state.density;
    document
      .querySelectorAll('[data-level]')
      .forEach((button) =>
        button.setAttribute('aria-pressed', String(button.dataset.level === state.level)),
      );
    document.title = `${plan.toUpperCase()} ${plans.find((item) => item.id === plan).title} · ${groups[state.group].name} · ${labels[state.level]}样稿`;
    renderResults();
    document.querySelector('.sample-content').id = 'sample-content';
    remember();
  };
  const resetFilters = () => {
    state.type = 'all';
    state.query = '';
    state.tags = [];
    state.status = 'all';
    document.querySelector('#content-filters')?.reset();
  };
  theme();
  if (root) {
    const jump = document.createElement('a');
    jump.href = '#sample-content';
    jump.className = 'review-jump';
    jump.textContent = '查看布局 ↓';
    document.querySelector('.level-switch').append(jump);
    render();
  }
  document.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (button?.matches('[data-theme-toggle]')) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      theme();
      if (root) remember();
    }
    if (button?.matches('[data-level], [data-jump-level]')) {
      state.level = button.dataset.level || button.dataset.jumpLevel;
      resetFilters();
      render();
    }
    if (button?.matches('[data-type]')) {
      state.type = button.dataset.type;
      renderResults();
    }
    if (button?.matches('[data-reset-filters]')) {
      resetFilters();
      renderResults();
    }
    const link = event.target.closest('[data-open-entry]');
    if (link) {
      event.preventDefault();
      const entry = entries.find((item) => item.id === link.dataset.openEntry);
      document.querySelector('#entry-preview-title').textContent = entry.title;
      document.querySelector('[data-preview-description]').textContent = entry.description;
      document.querySelector('.preview-source').textContent = entry.demo
        ? '此条为布局演示内容，不属于已发布数据。'
        : '标题与简介来自现有内容；这里仅预览样稿，不离开比较页面。';
      dialog.showModal();
    }
    if (button?.matches('[data-close-preview]') || event.target === dialog) dialog.close();
  });
  document.addEventListener('change', (event) => {
    if (event.target.matches('[data-group], [data-density]')) {
      state[event.target.matches('[data-group]') ? 'group' : 'density'] = event.target.value;
      resetFilters();
      render();
    }
    if (event.target.closest('#content-filters')) {
      const form = new FormData(document.querySelector('#content-filters'));
      state.type = form.get('kind') || 'all';
      state.tags = form.getAll('tag');
      state.status = form.get('status') || 'all';
      renderResults();
    }
  });
  document.addEventListener('input', (event) => {
    if (event.target.id === 'entry-query') {
      state.query = event.target.value.trim();
      renderResults();
    }
  });
  document.addEventListener('submit', (event) => {
    if (event.target.id === 'content-filters') event.preventDefault();
  });
  document.addEventListener('reset', (event) => {
    if (event.target.id === 'content-filters') {
      state.type = 'all';
      state.query = '';
      state.tags = [];
      state.status = 'all';
      renderResults();
    }
  });
  matchMedia('(max-width:768px)').addEventListener('change', (event) => {
    const panel = document.querySelector('.filter-panel');
    if (panel) panel.open = !event.matches;
  });
})();
