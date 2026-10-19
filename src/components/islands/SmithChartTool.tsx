import { useMemo, useRef, useState } from 'react';

import type { Locale } from '../../i18n/config';
import {
  admittance,
  complex,
  gammaPoint,
  impedanceToGamma,
  lNetworkMatches,
  magnitude,
  pointToImpedance,
  singleStubMatches,
  smithMetrics,
  transformImpedance,
  type Complex,
} from '../../lib/tools/smith';

interface Props {
  locale: Locale;
}

interface Marker {
  id: number;
  label: string;
  load: Complex;
  z0: number;
}

const SIZE = 520;
const copy = {
  zh: {
    input: '端口参数',
    line: '传输线变换',
    results: '计算结果',
    matching: '匹配助手',
    resistance: '电阻 R',
    reactance: '电抗 X',
    impedance: '阻抗 Z',
    admittance: '导纳 Y',
    distance: '线长',
    generator: '向信号源',
    load: '向负载',
    save: '保存标记',
    clear: '清空',
    exportSvg: '导出 SVG',
    exportCsv: '导出 CSV',
    fine: '精细网格',
    overlay: '导纳网格',
    physical: '物理长度',
    stub: '并联单短截线',
    lnetwork: 'L 型网络',
    noMatch: '当前点不存在有限的无源匹配方案。',
    drag: '在圆图内点击或拖动以设置负载。',
  },
  en: {
    input: 'Port input',
    line: 'Transmission line',
    results: 'Live results',
    matching: 'Matching assistant',
    resistance: 'Resistance R',
    reactance: 'Reactance X',
    impedance: 'Impedance Z',
    admittance: 'Admittance Y',
    distance: 'Line length',
    generator: 'Toward generator',
    load: 'Toward load',
    save: 'Save marker',
    clear: 'Clear',
    exportSvg: 'Export SVG',
    exportCsv: 'Export CSV',
    fine: 'Fine grid',
    overlay: 'Admittance overlay',
    physical: 'Physical length',
    stub: 'Single shunt stub',
    lnetwork: 'L network',
    noMatch: 'No finite passive match for this point.',
    drag: 'Click or drag inside the chart to set the load.',
  },
  de: {
    input: 'Portparameter',
    line: 'Leitungstransformation',
    results: 'Ergebnisse',
    matching: 'Anpassung',
    resistance: 'Widerstand R',
    reactance: 'Reaktanz X',
    impedance: 'Impedanz Z',
    admittance: 'Admittanz Y',
    distance: 'Leitungslänge',
    generator: 'Zum Generator',
    load: 'Zur Last',
    save: 'Marker speichern',
    clear: 'Leeren',
    exportSvg: 'SVG exportieren',
    exportCsv: 'CSV exportieren',
    fine: 'Feines Raster',
    overlay: 'Admittanzraster',
    physical: 'Physische Länge',
    stub: 'Paralleler Stub',
    lnetwork: 'L-Netzwerk',
    noMatch: 'Keine endliche passive Anpassung für diesen Punkt.',
    drag: 'Klicken oder ziehen, um die Last zu setzen.',
  },
} as const;

function format(value: number, digits = 3) {
  if (!Number.isFinite(value)) return '∞';
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: digits }).format(value);
}

function formatComplex(value: Complex, unit = '') {
  return `${format(value.re)} ${value.im < 0 ? '−' : '+'} j${format(Math.abs(value.im))}${unit}`;
}

function download(name: string, type: string, contents: string) {
  const anchor = document.createElement('a');
  anchor.href = URL.createObjectURL(new Blob([contents], { type }));
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(anchor.href);
}

function NumericField({
  label,
  value,
  unit,
  onChange,
  min,
}: {
  label: string;
  value: number;
  unit?: string;
  min?: number;
  onChange(value: number): void;
}) {
  return (
    <label className="smith-field">
      <span>{label}</span>
      <span>
        <input
          type="number"
          value={Number.isFinite(value) ? value : 0}
          min={min}
          step="any"
          onChange={(event) => onChange(Number(event.target.value))}
        />
        <small>{unit}</small>
      </span>
    </label>
  );
}

export default function SmithChartTool({ locale }: Props) {
  const labels = copy[locale];
  const [load, setLoad] = useState<Complex>(complex(75, 25));
  const [z0, setZ0] = useState(50);
  const [frequency, setFrequency] = useState(100);
  const [velocityFactor, setVelocityFactor] = useState(0.66);
  const [distance, setDistance] = useState(0);
  const [towardGenerator, setTowardGenerator] = useState(true);
  const [fineGrid, setFineGrid] = useState(true);
  const [showAdmittance, setShowAdmittance] = useState(false);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [dragging, setDragging] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const transformed = useMemo(
    () => transformImpedance(load, z0, distance, towardGenerator),
    [distance, load, towardGenerator, z0],
  );
  const metrics = useMemo(() => smithMetrics(transformed, z0), [transformed, z0]);
  const loadGamma = impedanceToGamma(load, z0);
  const loadPoint = gammaPoint(loadGamma, SIZE);
  const activePoint = gammaPoint(metrics.gamma, SIZE);
  const stubSolutions = useMemo(() => singleStubMatches(load, z0), [load, z0]);
  const lMatches = useMemo(() => lNetworkMatches(load, z0), [load, z0]);
  const wavelength = 299_792_458 / Math.max(1, frequency * 1_000_000);
  const physicalLength = distance * wavelength * velocityFactor;

  function setFromPointer(event: React.PointerEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * SIZE;
    const y = ((event.clientY - rect.top) / rect.height) * SIZE;
    setLoad(pointToImpedance(x, y, SIZE, z0));
    setDistance(0);
  }

  function saveMarker() {
    setMarkers((current) => [
      ...current,
      { id: Date.now(), label: `M${current.length + 1}`, load, z0 },
    ]);
  }

  function exportSvg() {
    if (!svgRef.current) return;
    download(
      'smith-chart.svg',
      'image/svg+xml',
      new XMLSerializer().serializeToString(svgRef.current),
    );
  }

  function exportCsv() {
    const rows = [
      ['parameter', 'real', 'imaginary'],
      ['load_ohm', load.re, load.im],
      ['transformed_ohm', transformed.re, transformed.im],
      ['gamma', metrics.gamma.re, metrics.gamma.im],
      ['vswr', metrics.vswr, ''],
      ['return_loss_db', metrics.returnLossDb, ''],
    ];
    download('smith-chart.csv', 'text/csv', rows.map((row) => row.join(',')).join('\n'));
  }

  const gridValues = fineGrid ? [0.2, 0.5, 1, 2, 5] : [0.5, 1, 2];

  return (
    <div className="smith-workbench">
      <section className="smith-chart-panel">
        <div className="tool-toolbar">
          <div>
            <p className="tool-index">VECTOR / Z</p>
            <strong>
              Γ {format(metrics.magnitude, 4)} ∠ {format(metrics.phaseDegrees, 1)}°
            </strong>
          </div>
          <div>
            <button type="button" onClick={saveMarker}>
              {labels.save}
            </button>
            <button type="button" onClick={exportSvg}>
              {labels.exportSvg}
            </button>
            <button type="button" onClick={exportCsv}>
              {labels.exportCsv}
            </button>
          </div>
        </div>
        <svg
          ref={svgRef}
          className="smith-chart"
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          role="img"
          aria-label="Interactive Smith chart"
          onPointerDown={(event) => {
            setDragging(true);
            event.currentTarget.setPointerCapture(event.pointerId);
            setFromPointer(event);
          }}
          onPointerMove={(event) => {
            if (dragging) setFromPointer(event);
          }}
          onPointerUp={() => setDragging(false)}
        >
          <rect width={SIZE} height={SIZE} rx="18" className="smith-background" />
          <circle cx="260" cy="260" r="218.4" className="smith-boundary" />
          <line x1="41.6" y1="260" x2="478.4" y2="260" className="smith-axis" />
          {gridValues.map((resistance) => {
            const radius = 218.4 / (resistance + 1);
            const center = 260 + (218.4 * resistance) / (resistance + 1);
            return (
              <circle
                key={`r-${resistance}`}
                cx={center}
                cy="260"
                r={radius}
                className="smith-grid"
              />
            );
          })}
          {gridValues
            .flatMap((reactance) => [reactance, -reactance])
            .map((reactance) => {
              const radius = Math.abs(218.4 / reactance);
              const centerY = 260 - 218.4 / reactance;
              return (
                <circle
                  key={`x-${reactance}`}
                  cx="478.4"
                  cy={centerY}
                  r={radius}
                  className="smith-grid smith-reactance"
                />
              );
            })}
          {showAdmittance && (
            <g className="smith-admittance">
              <circle cx="150.8" cy="260" r="109.2" />
              <circle cx="187.2" cy="260" r="72.8" />
            </g>
          )}
          {distance > 0 && (
            <circle cx="260" cy="260" r={magnitude(loadGamma) * 218.4} className="smith-vswr" />
          )}
          {markers.map((marker) => {
            const point = gammaPoint(impedanceToGamma(marker.load, marker.z0), SIZE);
            return (
              <g
                key={marker.id}
                transform={`translate(${point.x} ${point.y})`}
                className="smith-marker"
              >
                <circle r="7" />
                <text x="11" y="-9">
                  {marker.label}
                </text>
              </g>
            );
          })}
          {distance > 0 && (
            <circle cx={loadPoint.x} cy={loadPoint.y} r="5" className="smith-load-point" />
          )}
          <g transform={`translate(${activePoint.x} ${activePoint.y})`} className="smith-active">
            <circle r="14" />
            <circle r="6" />
            <path d="M-20 0h11M9 0h11M0-20v11M0 9v11" />
          </g>
        </svg>
        <p className="tool-note">{labels.drag}</p>
        <div className="smith-options">
          <label>
            <input
              type="checkbox"
              checked={fineGrid}
              onChange={(event) => setFineGrid(event.target.checked)}
            />
            {labels.fine}
          </label>
          <label>
            <input
              type="checkbox"
              checked={showAdmittance}
              onChange={(event) => setShowAdmittance(event.target.checked)}
            />
            {labels.overlay}
          </label>
        </div>
      </section>

      <aside className="tool-controls smith-controls">
        <section className="tool-card">
          <p className="tool-index">01 / INPUT</p>
          <h2>{labels.input}</h2>
          <div className="smith-fields">
            <NumericField
              label={labels.resistance}
              value={load.re}
              unit="Ω"
              onChange={(value) => setLoad({ ...load, re: Math.max(0.001, value) })}
            />
            <NumericField
              label={labels.reactance}
              value={load.im}
              unit="Ω"
              onChange={(value) => setLoad({ ...load, im: value })}
            />
            <NumericField
              label="Z₀"
              value={z0}
              unit="Ω"
              min={0.001}
              onChange={(value) => setZ0(Math.max(0.001, value))}
            />
            <NumericField
              label="Frequency"
              value={frequency}
              unit="MHz"
              min={0.001}
              onChange={(value) => setFrequency(Math.max(0.001, value))}
            />
          </div>
          <div className="smith-presets">
            {[25, 50, 75, 100].map((value) => (
              <button type="button" key={value} onClick={() => setZ0(value)}>
                {value} Ω
              </button>
            ))}
          </div>
        </section>
        <section className="tool-card">
          <p className="tool-index">02 / LINE</p>
          <h2>{labels.line}</h2>
          <div className="smith-direction">
            <button
              type="button"
              aria-pressed={towardGenerator}
              onClick={() => setTowardGenerator(true)}
            >
              {labels.generator}
            </button>
            <button
              type="button"
              aria-pressed={!towardGenerator}
              onClick={() => setTowardGenerator(false)}
            >
              {labels.load}
            </button>
          </div>
          <label className="smith-range">
            <span>
              {labels.distance}: {format(distance, 4)} λ / {format(distance * 360, 1)}°
            </span>
            <input
              type="range"
              min="0"
              max="0.5"
              step="0.001"
              value={distance}
              onChange={(event) => setDistance(Number(event.target.value))}
            />
          </label>
          <NumericField
            label="Velocity factor"
            value={velocityFactor}
            min={0.01}
            onChange={(value) => setVelocityFactor(Math.min(1, Math.max(0.01, value)))}
          />
          <p className="tool-note">
            {labels.physical}: <strong>{format(physicalLength, 4)} m</strong>
          </p>
        </section>
        <section className="tool-card">
          <p className="tool-index">03 / READOUT</p>
          <h2>{labels.results}</h2>
          <dl className="smith-results">
            <div>
              <dt>{labels.impedance}</dt>
              <dd>{formatComplex(transformed, ' Ω')}</dd>
            </div>
            <div>
              <dt>{labels.admittance}</dt>
              <dd>{formatComplex(admittance(transformed), ' S')}</dd>
            </div>
            <div>
              <dt>VSWR</dt>
              <dd>{format(metrics.vswr)}</dd>
            </div>
            <div>
              <dt>Return loss</dt>
              <dd>{format(metrics.returnLossDb)} dB</dd>
            </div>
            <div>
              <dt>Mismatch loss</dt>
              <dd>{format(metrics.mismatchLossDb)} dB</dd>
            </div>
          </dl>
        </section>
        <section className="tool-card">
          <p className="tool-index">04 / MATCH</p>
          <h2>{labels.matching}</h2>
          <h3>{labels.stub}</h3>
          {stubSolutions.length ? (
            <ol className="smith-solutions">
              {stubSolutions.map((solution, index) => (
                <li key={index}>
                  <strong>#{index + 1}</strong>
                  <span>d = {format(solution.distance, 4)} λ</span>
                  <span>Open = {format(solution.openStub, 4)} λ</span>
                  <span>Short = {format(solution.shortStub, 4)} λ</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="tool-note">{labels.noMatch}</p>
          )}
          <h3>{labels.lnetwork}</h3>
          {lMatches.length ? (
            <ol className="smith-solutions">
              {lMatches.map((solution, index) => (
                <li key={index}>
                  <strong>{solution.topology}</strong>
                  <span>X = {format(solution.seriesReactance)} Ω</span>
                  <span>B = {format(solution.shuntSusceptance, 6)} S</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="tool-note">{labels.noMatch}</p>
          )}
        </section>
        {markers.length > 0 && (
          <section className="tool-card">
            <div className="tool-card-heading">
              <h2>Markers</h2>
              <button type="button" onClick={() => setMarkers([])}>
                {labels.clear}
              </button>
            </div>
            <ul className="smith-marker-list">
              {markers.map((marker) => (
                <li key={marker.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setLoad(marker.load);
                      setZ0(marker.z0);
                      setDistance(0);
                    }}
                  >
                    <strong>{marker.label}</strong> {formatComplex(marker.load, ' Ω')}
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete ${marker.label}`}
                    onClick={() =>
                      setMarkers((current) => current.filter((item) => item.id !== marker.id))
                    }
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </aside>
    </div>
  );
}
