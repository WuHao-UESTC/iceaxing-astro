interface FeaturedItem {
  pin: HTMLElement;
  trigger: HTMLAnchorElement;
  panel: HTMLElement;
}

export function initFeaturedDestinations() {
  document.querySelectorAll<HTMLElement>('[data-featured-destinations]').forEach((root) => {
    if (root.dataset.initialized) return;
    root.dataset.initialized = 'true';
    const home = root.querySelector<HTMLElement>('[data-featured-preview-home]');
    if (!home) return;
    const items = [...root.querySelectorAll<HTMLElement>('[data-featured-pin]')]
      .map((pin): FeaturedItem | null => {
        const trigger = pin.querySelector<HTMLAnchorElement>('[data-featured-trigger]');
        const panel = document.getElementById(trigger?.getAttribute('aria-controls') ?? '');
        return trigger && panel ? { pin, trigger, panel } : null;
      })
      .filter((item): item is FeaturedItem => item !== null);
    const compact = matchMedia('(max-width: 48rem)');
    const coarse = matchMedia('(hover: none)');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let active: FeaturedItem | null = null;
    let openTimer: number | undefined;
    let closeTimer: number | undefined;
    let suppressFocus = false;

    const setRate = (item: FeaturedItem, fast: boolean) => {
      if (reduced.matches) return;
      item.pin.querySelectorAll('.featured-halo, .featured-particle').forEach((element) => {
        element
          .getAnimations()
          .forEach((animation) => animation.updatePlaybackRate(fast ? 3.8 / 1.15 : 1));
      });
    };

    const position = () => {
      if (!active || compact.matches) return;
      const { panel, trigger } = active;
      const anchor = trigger.getBoundingClientRect();
      const box = panel.getBoundingClientRect();
      const width = document.documentElement.clientWidth;
      const ceiling = Math.max(
        16,
        (document.querySelector('.site-header')?.getBoundingClientRect().bottom ?? 64) + 12,
      );
      const floor = window.innerHeight - 16;
      const below = anchor.bottom + 14;
      const above = anchor.top - box.height - 14;
      let left = anchor.left;
      let top = below;
      if (below + box.height > floor) {
        if (above >= ceiling) {
          top = above;
        } else {
          // Short screens need a side placement to keep the hovered entry visible.
          top = anchor.top;
          left =
            anchor.right + box.width + 30 <= width
              ? anchor.right + 14
              : anchor.left - box.width - 14;
        }
      }
      panel.style.left = `${Math.max(16, Math.min(left, width - box.width - 16))}px`;
      panel.style.top = `${Math.max(ceiling, Math.min(top, floor - box.height))}px`;
    };

    const sizeObserver = new ResizeObserver(position);

    const close = (restoreFocus = false) => {
      clearTimeout(openTimer);
      clearTimeout(closeTimer);
      if (!active) return;
      const item = active;
      active = null;
      sizeObserver.unobserve(item.panel);
      if (item.panel.hasAttribute('popover') && item.panel.matches(':popover-open'))
        item.panel.hidePopover();
      item.panel.removeAttribute('popover');
      item.panel.hidden = true;
      item.panel.classList.remove('is-inline');
      if (item.panel.parentElement !== home) home.append(item.panel);
      item.pin.classList.remove('is-active');
      item.trigger.setAttribute('aria-expanded', 'false');
      root.classList.remove('has-preview');
      setRate(item, false);
      if (restoreFocus) {
        suppressFocus = true;
        item.trigger.focus({ preventScroll: true });
        suppressFocus = false;
      }
    };

    const open = (item: FeaturedItem) => {
      clearTimeout(openTimer);
      clearTimeout(closeTimer);
      if (active === item) return;
      close();
      active = item;
      item.pin.classList.add('is-active');
      item.trigger.setAttribute('aria-expanded', 'true');
      root.classList.add('has-preview');
      item.panel.hidden = false;
      if (compact.matches) {
        item.panel.classList.add('is-inline');
        item.pin.append(item.panel);
      } else if (typeof item.panel.showPopover === 'function') {
        // The top layer avoids clipping by the journey's scroll-snap panels.
        item.panel.setAttribute('popover', 'manual');
        item.panel.showPopover();
      } else {
        // Keep the same positioning in browsers without the Popover API.
        item.panel.style.setProperty(
          '--featured-accent',
          getComputedStyle(root).getPropertyValue('--featured-accent'),
        );
        document.body.append(item.panel);
      }
      position();
      sizeObserver.observe(item.panel);
      setRate(item, true);
    };

    const scheduleClose = () => {
      clearTimeout(closeTimer);
      closeTimer = window.setTimeout(() => {
        if (!active) return;
        if (
          active.pin.matches(':hover') ||
          active.panel.matches(':hover') ||
          active.panel.contains(document.activeElement) ||
          active.trigger === document.activeElement
        )
          return;
        close();
      }, 240);
    };

    items.forEach((item) => {
      item.pin.addEventListener('pointerenter', (event) => {
        if (compact.matches || event.pointerType === 'touch') return;
        clearTimeout(openTimer);
        clearTimeout(closeTimer);
        setRate(item, true);
        openTimer = window.setTimeout(() => open(item), 150);
      });
      item.pin.addEventListener('pointerleave', () => {
        clearTimeout(openTimer);
        if (active !== item) setRate(item, false);
        scheduleClose();
      });
      item.trigger.addEventListener('focus', () => {
        if (
          !suppressFocus &&
          ((!compact.matches && !coarse.matches) || item.trigger.matches(':focus-visible'))
        )
          open(item);
      });
      item.trigger.addEventListener('blur', scheduleClose);
      item.trigger.addEventListener('click', (event) => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0)
          return;
        // Touch users see the preview on the first tap; the second tap follows the link.
        if ((compact.matches || coarse.matches) && event.detail > 0 && active !== item) {
          event.preventDefault();
          open(item);
        }
      });
      item.trigger.addEventListener('keydown', (event) => {
        if (event.key !== 'ArrowDown') return;
        event.preventDefault();
        open(item);
        item.panel
          .querySelector<HTMLButtonElement>('[data-featured-close]')
          ?.focus({ preventScroll: true });
      });
      item.panel.addEventListener('pointerenter', () => clearTimeout(closeTimer));
      item.panel.addEventListener('pointerleave', scheduleClose);
      item.panel.addEventListener('focusout', scheduleClose);
      item.panel
        .querySelector('[data-featured-close]')
        ?.addEventListener('click', () => close(true));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && active) {
        event.preventDefault();
        close(true);
      }
    });
    document.addEventListener('pointerdown', (event) => {
      if (!(event.target instanceof Node) || !active) return;
      if (
        !active.panel.contains(event.target) &&
        !items.some((item) => item.trigger.contains(event.target as Node))
      )
        close();
    });
    root.closest('[data-journey]')?.addEventListener(
      'scroll',
      () => {
        if (!compact.matches) close();
      },
      { passive: true },
    );
    window.addEventListener(
      'scroll',
      () => {
        if (!compact.matches) close();
      },
      { passive: true },
    );
    window.addEventListener('resize', position);
    compact.addEventListener('change', () => close());
    document.addEventListener('page:leaving', () => close());
    root.closest('[data-journey]')?.addEventListener('journey:changing', () => {
      if (!compact.matches) close();
    });
    reduced.addEventListener('change', () =>
      items.forEach((item) => setRate(item, item === active)),
    );
    document.addEventListener('visibilitychange', () => {
      root.classList.toggle('is-paused', document.hidden);
      if (document.hidden) close();
    });
    const observer = new IntersectionObserver(([entry]) => {
      root.classList.toggle('is-in-view', Boolean(entry?.isIntersecting));
      if (!entry?.isIntersecting) close();
    });
    observer.observe(root.closest('.snowline-panel') ?? root);
  });
}
