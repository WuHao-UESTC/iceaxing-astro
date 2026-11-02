export function initPeopleImages() {
  document
    .querySelectorAll<HTMLImageElement>('[data-profile-image], [data-person-avatar]')
    .forEach((image) => {
      if (image.dataset.imageReady) return;
      image.dataset.imageReady = 'true';
      const placeholder = image
        .closest('.profile-certificate-media')
        ?.querySelector('.profile-certificate-placeholder');
      const archiveCard = image.closest<HTMLElement>('.profile-project-archive a');
      const updateImageTone = () => {
        if (!archiveCard) return;
        delete archiveCard.dataset.imageTone;
        try {
          const canvas = document.createElement('canvas');
          canvas.width = canvas.height = 24;
          const context = canvas.getContext('2d', { willReadFrequently: true });
          if (!context) return;
          context.drawImage(image, 0, 0, 24, 24);
          const pixels = context.getImageData(0, 0, 24, 24).data;
          let luminance = 0;
          let weight = 0;
          for (let i = 0; i < pixels.length; i += 4) {
            const alpha = pixels[i + 3]! / 255;
            luminance +=
              (0.2126 * pixels[i]! + 0.7152 * pixels[i + 1]! + 0.0722 * pixels[i + 2]!) * alpha;
            weight += alpha;
          }
          if (weight && luminance / weight < 70) archiveCard.dataset.imageTone = 'dark';
        } catch {
          // Cross-origin images can render even when pixel sampling is unavailable.
        }
      };
      const markLoaded = () => {
        if (!image.naturalWidth) return;
        image.hidden = false;
        placeholder?.setAttribute('aria-hidden', 'true');
        updateImageTone();
      };
      const markFailed = () => {
        image.hidden = true;
        placeholder?.removeAttribute('aria-hidden');
        if (archiveCard) delete archiveCard.dataset.imageTone;
      };
      image.addEventListener('load', markLoaded);
      image.addEventListener('error', markFailed);
      // Reveal replaced sources so that previously failed lazy images can load again.
      new MutationObserver(() => {
        if (archiveCard) delete archiveCard.dataset.imageTone;
        image.hidden = false;
        if (image.complete && image.naturalWidth) markLoaded();
      }).observe(image, { attributes: true, attributeFilter: ['src', 'srcset'] });
      if (image.complete) {
        if (image.naturalWidth) markLoaded();
        else if (image.currentSrc || image.loading !== 'lazy') markFailed();
      }
    });
}
