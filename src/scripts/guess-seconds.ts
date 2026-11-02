import { isValidTarget, SecondsChallenge, type GuessResult } from '../lib/tools/guess-seconds';

type Phase = 'ready' | 'running' | 'result' | 'interrupted';

class GuessSeconds extends HTMLElement {
  private cleanup?: () => void;

  connectedCallback() {
    const copy = JSON.parse(this.dataset.copy ?? '{}') as Record<string, string>;
    const locale = this.dataset.locale ?? 'zh';
    const input = this.querySelector<HTMLInputElement>('input')!;
    const primary = this.querySelector<HTMLButtonElement>('[data-primary]')!;
    const change = this.querySelector<HTMLButtonElement>('[data-change]')!;
    const error = this.querySelector<HTMLElement>('#guess-error')!;
    const announcement = this.querySelector<HTMLElement>('[data-announcement]')!;
    const game = new SecondsChallenge();
    const events = new AbortController();
    const { signal } = events;
    let phase: Phase = 'ready';
    const format = (value: number, digits = 2) =>
      value.toLocaleString(locale, {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
        useGrouping: false,
      });
    const seconds = (value: number) => `${format(value)} ${copy.seconds}`;
    const selectedTarget = () => input.valueAsNumber;
    const updateStats = () => {
      this.querySelector('[data-attempts]')!.textContent = String(game.attempts);
      const best = game.bestByTarget.get(selectedTarget());
      this.querySelector('[data-best]')!.textContent = best
        ? `${seconds(Math.abs(best.difference))} / ${format(best.errorPercent)}%`
        : '—';
    };
    const setPhase = (next: Phase) => {
      phase = next;
      this.dataset.phase = phase;
      for (const name of ['setup', 'running', 'result', 'interrupted', 'summary']) {
        const visible =
          name === 'setup'
            ? phase === 'ready'
            : name === 'summary'
              ? phase !== 'running'
              : name === phase;
        this.querySelector<HTMLElement>(`[data-${name}]`)!.hidden = !visible;
      }
      primary.textContent =
        phase === 'running' ? copy.stop! : phase === 'ready' ? copy.start! : copy.retry!;
      change.hidden = phase === 'running' || phase === 'ready';
      updateStats();
    };
    const verdict = (result: GuessResult) => {
      if (Math.abs(result.difference) < 0.005) return copy.exact!;
      return `${result.difference < 0 ? copy.early : copy.late} ${seconds(Math.abs(result.difference))}`;
    };
    const showResult = (result: GuessResult) => {
      this.querySelector('[data-actual]')!.textContent = format(result.actual);
      this.querySelector('[data-target]')!.textContent = seconds(result.target);
      const roundedToZero = Math.abs(result.difference) < 0.005;
      this.querySelector('[data-difference]')!.textContent =
        `${roundedToZero ? '' : result.difference < 0 ? '−' : '+'}${seconds(Math.abs(result.difference))}`;
      this.querySelector('[data-percent]')!.textContent = `${format(result.errorPercent)}%`;
      this.querySelector('[data-verdict]')!.textContent = verdict(result);
      setPhase('result');
      announcement.textContent = `${copy.target} ${seconds(result.target)}. ${copy.actual} ${seconds(result.actual)}. ${verdict(result)}. ${copy.percent} ${format(result.errorPercent)}%.`;
    };
    const activate = () => {
      const now = performance.now();
      if (phase === 'running') {
        const result = game.stop(now);
        if (result) showResult(result);
        return;
      }
      const target = selectedTarget();
      const valid =
        isValidTarget(target) && Math.abs(target * 100 - Math.round(target * 100)) < 1e-7;
      error.hidden = valid;
      input.setAttribute('aria-invalid', String(!valid));
      if (!valid) {
        setPhase('ready');
        input.focus();
        return;
      }
      if (game.start(target, now)) {
        setPhase('running');
        primary.focus({ preventScroll: true });
        announcement.textContent = copy.running!;
      }
    };
    const updateSelection = () => {
      this.querySelectorAll<HTMLButtonElement>('[data-seconds]').forEach((button) => {
        button.setAttribute(
          'aria-pressed',
          String(Number(button.dataset.seconds) === selectedTarget()),
        );
      });
      error.hidden = true;
      input.removeAttribute('aria-invalid');
      updateStats();
    };
    this.querySelectorAll<HTMLButtonElement>('[data-seconds]').forEach((button) => {
      button.addEventListener(
        'click',
        () => {
          input.value = button.dataset.seconds!;
          updateSelection();
        },
        { signal },
      );
    });
    input.addEventListener('input', updateSelection, { signal });
    input.addEventListener(
      'keydown',
      (event) => {
        if (event.key !== 'Enter' || event.repeat) return;
        event.preventDefault();
        activate();
      },
      { signal },
    );
    primary.addEventListener('click', activate, { signal });
    change.addEventListener(
      'click',
      () => {
        setPhase('ready');
        announcement.textContent = copy.ready!;
        input.focus({ preventScroll: true });
      },
      { signal },
    );
    document.addEventListener(
      'keydown',
      (event) => {
        if (
          event.code !== 'Space' ||
          event.altKey ||
          event.ctrlKey ||
          event.metaKey ||
          event.isComposing
        )
          return;
        const target = event.target;
        if (
          document.querySelector('dialog[open]') ||
          (target instanceof HTMLElement &&
            (target.isContentEditable ||
              target.closest('input, textarea, select, a') ||
              (target.closest('button') && target !== primary)))
        )
          return;
        event.preventDefault();
        if (!event.repeat) activate();
      },
      { signal },
    );
    // Suppress the button's native keyup click after a Space-triggered state change.
    primary.addEventListener(
      'keyup',
      (event) => {
        if (event.code === 'Space') event.preventDefault();
      },
      { signal },
    );
    const interrupt = () => {
      if (phase !== 'running') return;
      game.interrupt();
      setPhase('interrupted');
      announcement.textContent = `${copy.interrupted}. ${copy.interruptedNote}`;
    };
    window.addEventListener('blur', interrupt, { signal });
    window.addEventListener('pagehide', interrupt, { signal });
    document.addEventListener(
      'visibilitychange',
      () => {
        if (document.hidden) interrupt();
      },
      { signal },
    );
    this.addEventListener(
      'focusout',
      () => {
        if (document.querySelector('dialog[open]')) interrupt();
      },
      { signal },
    );
    this.cleanup = () => {
      game.interrupt();
      events.abort();
    };
    setPhase('ready');
  }

  disconnectedCallback() {
    this.cleanup?.();
  }
}

if (!customElements.get('guess-seconds')) customElements.define('guess-seconds', GuessSeconds);
