export function registerProfileGallery() {
  if (customElements.get('profile-award-gallery')) return;
  class ProfileAwardGallery extends HTMLElement {
    private cleanup?: () => void;

    connectedCallback() {
      if (this.cleanup) return;
      const rail = this.querySelector<HTMLUListElement>('.profile-certificate-grid')!;
      const controls = this.querySelector<HTMLElement>('.profile-gallery-controls')!;
      const counter = this.querySelector<HTMLElement>('.profile-gallery-counter')!;
      const current = this.querySelector<HTMLElement>('[data-gallery-current]')!;
      const previous = this.querySelector<HTMLButtonElement>('[data-gallery-previous]')!;
      const next = this.querySelector<HTMLButtonElement>('[data-gallery-next]')!;
      const dialog = this.querySelector<HTMLDialogElement>('dialog')!;
      const largeImage = dialog.querySelector<HTMLImageElement>('img')!;
      const preview = dialog.querySelector<HTMLButtonElement>('.profile-lightbox-target')!;
      const shade = dialog.querySelector<HTMLElement>('.profile-lightbox-shade')!;
      const cards = [...rail.children].filter(
        (card) => !card.hasAttribute('data-gallery-spacer'),
      ) as HTMLElement[];
      const controller = new AbortController();
      const { signal } = controller;
      const compact = matchMedia('(max-width: 40rem)');
      const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
      let page = 0;
      let perPage = 3;
      let pageCount = 1;
      let frame = 0;
      let busy = false;
      let lastWidth = 0;
      let opener: HTMLElement | null = null;
      let previousOverflow = '';
      let previousPadding = '';
      let sourceImage: HTMLImageElement | null = null;
      let previewState: 'closed' | 'opening' | 'open' | 'closing' = 'closed';
      let previewAnimation: Animation | undefined;
      let shadeAnimation: Animation | undefined;

      // Measure the painted image, excluding object-fit's empty letterbox area.
      const imageBounds = (image: HTMLImageElement) => {
        const box = image.getBoundingClientRect();
        const scale = Math.min(box.width / image.naturalWidth, box.height / image.naturalHeight);
        const width = image.naturalWidth * scale;
        const height = image.naturalHeight * scale;
        return {
          left: box.left + (box.width - width) / 2,
          top: box.top + (box.height - height) / 2,
          width,
          height,
        };
      };
      const placePreview = () => {
        const scale = Math.min(
          (window.innerWidth - 32) / largeImage.naturalWidth,
          (window.innerHeight - 48) / largeImage.naturalHeight,
        );
        const width = largeImage.naturalWidth * scale;
        const height = largeImage.naturalHeight * scale;
        const bounds = {
          left: (window.innerWidth - width) / 2,
          top: (window.innerHeight - height) / 2,
          width,
          height,
        };
        Object.assign(preview.style, {
          left: `${bounds.left}px`,
          top: `${bounds.top}px`,
          width: `${width}px`,
          height: `${height}px`,
        });
        return bounds;
      };
      const transformFor = (
        from: { left: number; top: number; width: number; height: number },
        to: { left: number; top: number; width: number; height: number },
      ) =>
        `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width}, ${from.height / to.height})`;
      const closePreview = () => {
        if (previewState === 'closed' || previewState === 'closing') return;
        previewState = 'closing';
        const visible = preview.getBoundingClientRect();
        const opacity = getComputedStyle(shade).opacity;
        previewAnimation?.cancel();
        shadeAnimation?.cancel();
        const destination = placePreview();
        const origin = sourceImage?.isConnected ? imageBounds(sourceImage) : visible;
        const duration = reducedMotion.matches ? 0 : 360;
        previewAnimation = preview.animate(
          [
            { transform: transformFor(visible, destination) },
            { transform: transformFor(origin, destination) },
          ],
          { duration, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'both' },
        );
        shadeAnimation = shade.animate([{ opacity }, { opacity: 0 }], { duration, fill: 'both' });
        previewAnimation.finished
          .then(() => {
            if (!signal.aborted && previewState === 'closing') dialog.close();
          })
          .catch(() => {});
      };

      const stride = () => rail.clientWidth + parseFloat(getComputedStyle(rail).columnGap);
      const preload = () => {
        cards.slice(Math.max(0, (page - 1) * perPage), (page + 2) * perPage).forEach((card) => {
          card
            .querySelectorAll<HTMLImageElement>('img')
            .forEach((image) => (image.loading = 'eager'));
        });
      };
      const update = () => {
        previous.disabled = busy || page === 0;
        next.disabled = busy || page === pageCount - 1;
        current.textContent = String(page + 1);
        const total = counter.querySelector('[data-gallery-total]');
        if (total) total.textContent = String(pageCount);
        cards.forEach((card, index) => {
          const active = Math.floor(index / perPage) === page;
          card.inert = !active;
          card.setAttribute('aria-hidden', String(!active));
        });
        preload();
      };
      const stopAnimation = () => {
        cancelAnimationFrame(frame);
        busy = false;
        delete this.dataset.animating;
      };
      const move = (requested: number) => {
        if (busy) return;
        const targetPage = Math.max(0, Math.min(pageCount - 1, requested));
        if (targetPage === page) return;
        if (cards.some((card) => card.contains(document.activeElement)))
          rail.focus({ preventScroll: true });
        page = targetPage;
        preload();
        const target = page * stride();
        if (reducedMotion.matches) {
          rail.scrollLeft = target;
          update();
          return;
        }
        busy = true;
        this.dataset.animating = 'true';
        update();
        const start = rail.scrollLeft;
        const time = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - time) / 380);
          const eased = 1 - Math.pow(1 - progress, 3);
          rail.scrollLeft = start + (target - start) * eased;
          if (progress < 1) frame = requestAnimationFrame(tick);
          else {
            stopAnimation();
            rail.scrollLeft = target;
            update();
          }
        };
        frame = requestAnimationFrame(tick);
      };
      const measure = () => {
        if (!rail.clientWidth) return;
        const visibleIndex = page * perPage;
        stopAnimation();
        perPage = compact.matches ? 1 : 3;
        rail.style.setProperty('--gallery-per-page', String(perPage));
        rail.querySelectorAll('[data-gallery-spacer]').forEach((node) => node.remove());
        pageCount = Math.max(1, Math.ceil(cards.length / perPage));
        const missing = pageCount * perPage - cards.length;
        for (let i = 0; i < missing; i++) {
          const spacer = document.createElement('li');
          spacer.dataset.gallerySpacer = '';
          spacer.setAttribute('aria-hidden', 'true');
          spacer.setAttribute('role', 'presentation');
          rail.append(spacer);
        }
        // Every title gets the height of the tallest caption at this width.
        const captions = cards.map((card) => card.querySelector<HTMLElement>('figcaption')!);
        rail.style.removeProperty('--gallery-caption-height');
        const height = Math.ceil(
          Math.max(...captions.map((caption) => caption.getBoundingClientRect().height)),
        );
        rail.style.setProperty('--gallery-caption-height', `${height}px`);
        page = Math.min(pageCount - 1, Math.floor(visibleIndex / perPage));
        rail.scrollLeft = page * stride();
        controls.hidden = counter.hidden = pageCount <= 1;
        lastWidth = rail.clientWidth;
        update();
      };
      this.dataset.ready = 'true';
      previous.addEventListener('click', () => move(page - 1), { signal });
      next.addEventListener('click', () => move(page + 1), { signal });
      rail.addEventListener(
        'keydown',
        (event) => {
          if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
          event.preventDefault();
          move(page + (event.key === 'ArrowRight' ? 1 : -1));
        },
        { signal },
      );
      rail.addEventListener(
        'scrollend',
        () => {
          if (busy) return;
          page = Math.max(0, Math.min(pageCount - 1, Math.round(rail.scrollLeft / stride())));
          update();
        },
        { signal },
      );
      rail.addEventListener(
        'pointerdown',
        () => {
          stopAnimation();
          update();
        },
        { signal },
      );
      rail.addEventListener(
        'click',
        async (event) => {
          const link = (event.target as Element).closest<HTMLAnchorElement>(
            '[data-certificate-open]',
          );
          if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
          const image = link.querySelector<HTMLImageElement>('img')!;
          if (!image.naturalWidth) return;
          event.preventDefault();
          if (previewState !== 'closed') return;
          previewState = 'opening';
          opener = link;
          sourceImage = image;
          largeImage.src = image.currentSrc || link.href;
          largeImage.alt = image.alt;
          try {
            await largeImage.decode();
          } catch {
            previewState = 'closed';
            return;
          }
          if (signal.aborted) return;
          const origin = imageBounds(image);
          const root = document.documentElement;
          previousOverflow = document.documentElement.style.overflow;
          previousPadding = root.style.paddingRight;
          const gutter = window.innerWidth - root.clientWidth;
          root.style.paddingRight = `${parseFloat(getComputedStyle(root).paddingRight) + gutter}px`;
          root.style.overflow = 'hidden';
          dialog.showModal();
          const destination = placePreview();
          image.style.visibility = 'hidden';
          const duration = reducedMotion.matches ? 0 : 420;
          previewAnimation = preview.animate(
            [{ transform: transformFor(origin, destination) }, { transform: 'none' }],
            { duration, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'both' },
          );
          shadeAnimation = shade.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration,
            fill: 'both',
          });
          previewAnimation.finished
            .then(() => {
              if (previewState === 'opening') previewState = 'open';
            })
            .catch(() => {});
        },
        { signal },
      );
      preview.addEventListener('click', closePreview, { signal });
      dialog.addEventListener(
        'cancel',
        (event) => {
          event.preventDefault();
          closePreview();
        },
        { signal },
      );
      dialog.addEventListener(
        'click',
        (event) => {
          if (event.target === dialog || event.target === shade) closePreview();
        },
        { signal },
      );
      dialog.addEventListener(
        'close',
        () => {
          document.documentElement.style.overflow = previousOverflow;
          document.documentElement.style.paddingRight = previousPadding;
          if (sourceImage) sourceImage.style.visibility = '';
          previewAnimation?.cancel();
          shadeAnimation?.cancel();
          previewState = 'closed';
          opener?.focus({ preventScroll: true });
        },
        { signal },
      );
      window.addEventListener(
        'resize',
        () => {
          if (!dialog.open || previewState === 'closing') return;
          previewAnimation?.cancel();
          shadeAnimation?.cancel();
          placePreview();
          previewState = 'open';
        },
        { signal },
      );
      const observer = new ResizeObserver(() => {
        if (rail.clientWidth !== lastWidth) measure();
      });
      observer.observe(rail);
      compact.addEventListener('change', measure, { signal });
      document.fonts.ready.then(() => {
        if (!signal.aborted) measure();
      });
      measure();
      this.cleanup = () => {
        stopAnimation();
        observer.disconnect();
        if (dialog.open) {
          dialog.close();
          document.documentElement.style.overflow = previousOverflow;
          document.documentElement.style.paddingRight = previousPadding;
        }
        previewAnimation?.cancel();
        shadeAnimation?.cancel();
        if (sourceImage) sourceImage.style.visibility = '';
        controller.abort();
      };
    }

    disconnectedCallback() {
      this.cleanup?.();
      this.cleanup = undefined;
    }
  }
  customElements.define('profile-award-gallery', ProfileAwardGallery);
}
