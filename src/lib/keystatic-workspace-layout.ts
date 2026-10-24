/** Optional editor chrome. ProseMirror and the property inputs remain mounted. */
export function attachWorkspaceLayout(document: Document, propertiesControls: HTMLElement) {
  const win = document.defaultView!;
  let collapsed = win.innerWidth < 700;
  let width = 320;
  try {
    const saved = JSON.parse(win.localStorage.getItem('iceaxing-workspace-properties') ?? 'null');
    if (typeof saved?.collapsed === 'boolean') collapsed = saved.collapsed;
    if (Number.isFinite(saved?.width)) width = Math.max(220, Math.min(560, saved.width));
  } catch {
    /* Optional preferences. */
  }
  const persist = () => {
    try {
      win.localStorage.setItem(
        'iceaxing-workspace-properties',
        JSON.stringify({ collapsed, width }),
      );
    } catch {
      /* Optional storage. */
    }
  };
  const toggle = propertiesControls.ownerDocument.createElement('button');
  toggle.type = 'button';
  toggle.className = 'native-navigation-toggle workspace-properties-toggle';
  toggle.dataset.wsPropertiesToggle = 'true';
  const outline = document.createElement('details');
  outline.dataset.wsOutline = 'true';
  outline.setAttribute('aria-label', '文章大纲');
  outline.open = false;
  const summary = document.createElement('summary');
  summary.textContent = '大纲';
  const navigation = document.createElement('nav');
  navigation.setAttribute('aria-label', '跳转到文章标题');
  outline.append(summary, navigation);
  let editor: HTMLElement | null = null;
  let split: HTMLElement | null = null;
  let properties: HTMLElement | null = null;
  let resize: HTMLElement | null = null;
  let frame = 0;
  let headingSignature = '\0';
  let headings: HTMLElement[] = [];
  let dragging = false;
  let compact = false;
  let focused =
    propertiesControls.closest('[data-workspace-focus]')?.getAttribute('data-workspace-focus') ===
    'true';
  let writingHost: HTMLElement | null = null;
  let outlineMode = '';
  let outlinePreferences: Record<string, boolean> = { docked: true, compact: false };
  try {
    outlinePreferences = {
      ...outlinePreferences,
      ...JSON.parse(win.localStorage.getItem('iceaxing-workspace-outline') ?? '{}'),
    };
  } catch {
    /* Optional preferences. */
  }
  const resizeObserver = new win.ResizeObserver(() => schedule());
  summary.addEventListener('click', () => {
    win.requestAnimationFrame(() => {
      outlinePreferences[outlineMode] = outline.open;
      try {
        win.localStorage.setItem('iceaxing-workspace-outline', JSON.stringify(outlinePreferences));
      } catch {
        /* Optional storage. */
      }
    });
  });

  const apply = () => {
    if (!split || !properties) return;
    const hidden = collapsed || focused;
    document.documentElement.dataset.wsFocus = String(focused);
    split.dataset.wsPropertiesCollapsed = String(hidden);
    split.style.setProperty(
      '--ws-properties-width',
      `${Math.min(width, Math.max(220, split.clientWidth - 300))}px`,
    );
    if (compact) {
      split.dataset.wsCompactCollapsed = String(hidden);
      for (const child of split.children) {
        if (child instanceof win.HTMLElement && !child.hasAttribute('data-ws-compact-body'))
          child.inert = hidden;
      }
    } else properties.inert = hidden;
    toggle.textContent = hidden ? '展开属性' : '收起属性';
    toggle.disabled = focused;
    toggle.title = focused ? '退出专注模式后可展开属性' : '展开或收起文稿属性';
    toggle.setAttribute('aria-expanded', String(!hidden));
    resize?.setAttribute('aria-valuenow', String(width));
    outline.hidden = focused;
  };
  toggle.addEventListener('click', () => {
    collapsed = !collapsed;
    apply();
    persist();
  });
  const activeHeading = () => {
    if (!editor || !headings.length) return;
    const top = Math.max(100, editor.getBoundingClientRect().top);
    let current = 0;
    headings.forEach((heading, index) => {
      if (heading.getBoundingClientRect().top <= top + 100) current = index;
    });
    navigation.querySelectorAll('button').forEach((button, index) => {
      if (index === current) button.setAttribute('aria-current', 'location');
      else button.removeAttribute('aria-current');
    });
  };
  function refresh() {
    frame = 0;
    const next = document.querySelector<HTMLElement>('.ProseMirror');
    if (!next) {
      outline.remove();
      toggle.remove();
      resize?.remove();
      editor = null;
      split = null;
      properties = null;
      headingSignature = '\0';
      return;
    }
    editor = next;
    const pane = editor.closest<HTMLElement>('[data-split-pane]');
    const primary = pane?.closest('form') ? pane : null;
    const nextSplit = primary?.parentElement;
    const nextProperties = Array.from(
      nextSplit?.querySelectorAll<HTMLElement>(':scope > [data-split-pane]') ?? [],
    ).find((pane) => pane !== primary);
    if (!primary) {
      let grid = editor.parentElement;
      while (
        grid &&
        !(
          win.getComputedStyle(grid).display === 'grid' &&
          grid.querySelectorAll('label[for]').length >= 3
        )
      )
        grid = grid.parentElement;
      if (grid) {
        resize?.remove();
        resize = null;
        split = properties = grid;
        compact = true;
        grid.dataset.wsCompactForm = 'true';
        for (const entry of grid.children) {
          if (entry.contains(editor)) entry.setAttribute('data-ws-compact-body', 'true');
        }
      }
    } else if (nextSplit && nextProperties && split !== nextSplit) {
      resize?.remove();
      compact = false;
      split = nextSplit;
      properties = nextProperties;
      split.dataset.wsArticleSplit = 'true';
      primary!.dataset.wsBodyPane = 'true';
      properties.dataset.wsProperties = 'true';
      resize = document.createElement('div');
      resize.dataset.wsPropertyResizer = 'true';
      resize.tabIndex = 0;
      resize.setAttribute('role', 'separator');
      resize.setAttribute('aria-label', '调整属性区宽度');
      resize.setAttribute('aria-orientation', 'vertical');
      resize.setAttribute('aria-valuemin', '220');
      resize.setAttribute('aria-valuemax', '560');
      resize.setAttribute('aria-controls', properties.id);
      resize.addEventListener('pointerdown', (event) => {
        dragging = true;
        resize!.setPointerCapture(event.pointerId);
        event.preventDefault();
      });
      resize.addEventListener('pointermove', (event) => {
        if (!dragging || !split) return;
        width = Math.max(
          220,
          Math.min(
            560,
            split.clientWidth - 300,
            split.getBoundingClientRect().right - event.clientX,
          ),
        );
        apply();
      });
      const stop = () => {
        if (dragging) {
          dragging = false;
          persist();
        }
      };
      resize.addEventListener('pointerup', stop);
      resize.addEventListener('pointercancel', stop);
      resize.addEventListener('lostpointercapture', stop);
      resize.addEventListener('dblclick', () => {
        width = 320;
        apply();
        persist();
      });
      resize.addEventListener('keydown', (event) => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight' && event.key !== 'Home') return;
        event.preventDefault();
        width =
          event.key === 'Home'
            ? 320
            : Math.max(220, Math.min(560, width + (event.key === 'ArrowLeft' ? 16 : -16)));
        apply();
        persist();
      });
      split.insertBefore(resize, properties);
    }
    const nextHost = compact
      ? editor.closest<HTMLElement>('[data-ws-compact-body]')
      : primary?.querySelector<HTMLElement>(':scope > [data-scrollable]');
    if (nextHost) {
      if (writingHost !== nextHost) {
        if (writingHost) delete writingHost.dataset.wsOutlineHost;
        resizeObserver.disconnect();
        writingHost = nextHost;
        resizeObserver.observe(writingHost);
      }
      if (outline.parentElement !== writingHost) writingHost.prepend(outline);
      const mode = !compact && !focused && writingHost.clientWidth >= 900 ? 'docked' : 'compact';
      writingHost.dataset.wsOutlineHost = mode;
      for (const child of writingHost.children) {
        if (child !== outline) child.setAttribute('data-ws-writing-content', 'true');
      }
      if (mode !== outlineMode) {
        outlineMode = mode;
        outline.open = outlinePreferences[mode] ?? false;
      }
    } else if (!outline.isConnected) document.body.append(outline);
    if (properties && !toggle.isConnected) propertiesControls.append(toggle);
    apply();
    headings = Array.from(editor.querySelectorAll<HTMLElement>('h1, h2, h3, h4, h5, h6'));
    const signature = headings
      .map((heading) => `${heading.tagName}:${heading.textContent}`)
      .join('\n');
    if (signature !== headingSignature || (!navigation.childElementCount && headings.length)) {
      headingSignature = signature;
      navigation.replaceChildren(
        ...headings.map((heading, index) => {
          const button = document.createElement('button');
          button.type = 'button';
          button.textContent = heading.textContent?.trim() || '未命名标题';
          button.style.paddingInlineStart = `${8 + (Number(heading.tagName.slice(1)) - 1) * 10}px`;
          button.addEventListener('click', () => {
            const target = headings[index];
            if (!target || !editor) return;
            editor.focus({ preventScroll: true });
            const selection = win.getSelection();
            const range = document.createRange();
            range.selectNodeContents(target);
            range.collapse(true);
            selection?.removeAllRanges();
            selection?.addRange(range);
            target.scrollIntoView({ behavior: 'instant', block: 'center' });
          });
          return button;
        }),
      );
      if (!headings.length) {
        const empty = document.createElement('p');
        empty.textContent = '添加标题后显示大纲';
        navigation.append(empty);
      }
    }
    activeHeading();
  }
  const schedule = () => {
    if (!frame) frame = win.requestAnimationFrame(refresh);
  };
  const onFocus = (event: Event) => {
    focused = Boolean((event as CustomEvent<boolean>).detail);
    apply();
    schedule();
  };
  const onKeyDown = (event: KeyboardEvent) => {
    if (
      focused &&
      event.key === 'Escape' &&
      !(event.target as Element).closest?.('[role="dialog"], [role="listbox"], [role="menu"]')
    ) {
      propertiesControls.ownerDocument.dispatchEvent(new Event('workspace:exit-focus'));
    }
  };
  document.addEventListener('workspace:focus', onFocus);
  document.addEventListener('keydown', onKeyDown);
  const observer = new MutationObserver((records) => {
    if (
      records.every((record) =>
        (record.target as Element).closest?.(
          '[data-ws-outline], [data-ws-properties-toggle], [data-ws-property-resizer], [data-ws-guide]',
        ),
      )
    )
      return;
    schedule();
  });
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  document.addEventListener('scroll', activeHeading, { capture: true, passive: true });
  win.addEventListener('resize', schedule);
  refresh();
  return () => {
    observer.disconnect();
    resizeObserver.disconnect();
    document.removeEventListener('workspace:focus', onFocus);
    document.removeEventListener('keydown', onKeyDown);
    delete document.documentElement.dataset.wsFocus;
    if (writingHost) {
      delete writingHost.dataset.wsOutlineHost;
      for (const child of writingHost.children) child.removeAttribute('data-ws-writing-content');
    }
    if (frame) win.cancelAnimationFrame(frame);
    document.removeEventListener('scroll', activeHeading, true);
    win.removeEventListener('resize', schedule);
    resize?.remove();
    toggle.remove();
    outline.remove();
    if (properties) {
      properties.inert = false;
      if (compact)
        for (const child of properties.children) {
          if (child instanceof win.HTMLElement) child.inert = false;
        }
    }
  };
}
