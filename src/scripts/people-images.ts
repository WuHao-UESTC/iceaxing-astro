export function initPeopleImages() {
  document
    .querySelectorAll<HTMLImageElement>('[data-profile-image], [data-person-avatar]')
    .forEach((image) => {
      if (image.dataset.imageReady) return;
      image.dataset.imageReady = 'true';
      const placeholder = image
        .closest('.profile-certificate-media')
        ?.querySelector('.profile-certificate-placeholder');
      const markLoaded = () => {
        if (!image.naturalWidth) return;
        image.hidden = false;
        placeholder?.setAttribute('aria-hidden', 'true');
      };
      const markFailed = () => {
        image.hidden = true;
        placeholder?.removeAttribute('aria-hidden');
      };
      image.addEventListener('load', markLoaded);
      image.addEventListener('error', markFailed);
      // Reveal replaced sources so that previously failed lazy images can load again.
      new MutationObserver(() => {
        image.hidden = false;
        if (image.complete && image.naturalWidth) markLoaded();
      }).observe(image, { attributes: true, attributeFilter: ['src', 'srcset'] });
      if (image.complete) {
        if (image.naturalWidth) markLoaded();
        else if (image.currentSrc || image.loading !== 'lazy') markFailed();
      }
    });
}
