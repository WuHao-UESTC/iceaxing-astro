import { fields } from '@keystatic/core';
import { useId } from 'react';

const base = fields.integer({
  label: '进度（%）',
  defaultValue: 0,
  validation: { min: 0, max: 100, isRequired: true },
});

/** Only the editor control changes; the stored property remains an integer. */
export const projectProgress: typeof base = {
  ...base,
  Input: function ProgressInput({ value, onChange, autoFocus }) {
    const id = useId();
    return (
      <div data-ws-progress="true">
        <label htmlFor={id}>进度</label>
        <div className="ws-progress-control">
          <input
            id={id}
            type="range"
            min={0}
            max={100}
            step={1}
            aria-label="进度"
            value={value ?? 0}
            autoFocus={autoFocus}
            aria-valuetext={`${value ?? 0}%`}
            onChange={(event) => onChange(Number(event.target.value))}
          />
          <output htmlFor={id}>{value ?? 0}%</output>
        </div>
      </div>
    );
  },
};
