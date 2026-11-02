import { createRuntime, type PlayRuntime } from './play/runtime';
class PlayWorkbench extends HTMLElement {
  private runtime?: PlayRuntime;
  async connectedCallback() {
    const r = createRuntime(this);
    this.runtime = r;
    try {
      const module = await {
        'blind-circle': () => import('./play/blind-circle'),
        gravity: () => import('./play/gravity'),
        reaction: () => import('./play/reaction'),
        ripples: () => import('./play/ripples'),
        'color-music': () => import('./play/color-music'),
        'fading-words': () => import('./play/fading-words'),
        'stack-stones': () => import('./play/stack-stones'),
        'visual-memory': () => import('./play/visual-memory'),
        'color-sense': () => import('./play/color-sense'),
        refraction: () => import('./play/refraction'),
        'snow-trails': () => import('./play/snow-trails'),
        constellation: () => import('./play/constellation'),
      }[r.tool]();
      if (!r.signal.aborted) {
        module.default(r);
        r.render();
        this.dataset.ready = 'true';
      }
    } catch (error) {
      r.status(String(error));
    }
  }
  disconnectedCallback() {
    this.runtime?.dispose();
  }
}
if (!customElements.get('play-workbench')) customElements.define('play-workbench', PlayWorkbench);
