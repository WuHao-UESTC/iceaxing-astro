class ToolsGallery extends HTMLElement {
  private cleanup?: () => void;
  connectedCallback() {
    const events = new AbortController();
    const { signal } = events;
    const cards = [...this.querySelectorAll<HTMLElement>('.tg-card')];
    const input = this.querySelector<HTMLInputElement>('input[type="search"]')!;
    const filters = [...this.querySelectorAll<HTMLButtonElement>('[data-filter]')];
    const normalize = (text: string) =>
      text
        .normalize('NFKD')
        .replace(/\p{Mark}/gu, '')
        .toLocaleLowerCase();
    const searchable = new Map(cards.map((card) => [card, normalize(card.dataset.search ?? '')]));
    let category = 'all';
    const update = () => {
      const query = normalize(input.value.trim());
      let count = 0;
      for (const card of cards) {
        card.hidden = !(
          (category === 'all' || card.dataset.category === category) &&
          searchable.get(card)!.includes(query)
        );
        if (!card.hidden) count++;
      }
      this.querySelector('[data-count]')!.textContent = String(count);
      this.querySelector<HTMLElement>('.tg-empty')!.hidden = count > 0;
      filters.forEach((button) =>
        button.setAttribute('aria-pressed', String(button.dataset.filter === category)),
      );
    };
    filters.forEach((button) =>
      button.addEventListener(
        'click',
        () => {
          category = button.dataset.filter!;
          update();
        },
        { signal },
      ),
    );
    input.addEventListener('input', update, { signal });
    input.addEventListener(
      'keydown',
      (event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          input.value = '';
          update();
        }
      },
      { signal },
    );
    // Browsers may restore the input when navigating back to the gallery.
    window.addEventListener('pageshow', update, { signal });
    this.cleanup = () => events.abort();
    update();
  }
  disconnectedCallback() {
    this.cleanup?.();
  }
}
if (!customElements.get('tools-gallery')) customElements.define('tools-gallery', ToolsGallery);
