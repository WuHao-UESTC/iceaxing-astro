export function initPeopleImages() {
  document.querySelectorAll<HTMLImageElement>('[data-person-avatar]').forEach((image) => {
    if (image.complete && !image.naturalWidth) image.hidden = true;
    image.addEventListener(
      'error',
      () => {
        image.hidden = true;
      },
      { once: true },
    );
  });
}
