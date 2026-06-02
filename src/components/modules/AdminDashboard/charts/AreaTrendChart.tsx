'use client';

import { useId, useState } from 'react';

type Tone = 'violet' | 'cyan' | 'fuchsia' | 'teal' | 'amber';

const toneVar: Record<Tone, string> = {
  violet: 'var(--aurora-violet)',
  cyan: 'var(--aurora-cyan)',
  fuchsia: 'var(--aurora-fuchsia)',
  teal: 'var(--aurora-teal)',
  amber: 'var(--aurora-amber)',
};

interface AreaTrendChartProps {
  data: { label: string; value: number }[];
  tone?: Tone;
  height?: number;
  formatValue?: (n: number) => string;
}

const W = 640;
const PAD = { t: 16, r: 16, b: 22, l: 16 };

const AreaTrendChart = ({
  data,
  tone = 'violet',
  height = 220,
  formatValue = (n) => String(n),
}: AreaTrendChartProps) => {
  const gid = useId().replace(/:/g, '');
  const [active, setActive] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className='flex h-[180px] items-center justify-center text-sm text-muted-foreground'>
        No data for this period
      </div>
    );
  }

  const H = height;
  const plotW = W - PAD.l - PAD.r;
  const plotH = H - PAD.t - PAD.b;
  const max = Math.max(...data.map((d) => d.value), 1);
  const n = data.length;

  const x = (i: number) => (n === 1 ? PAD.l + plotW / 2 : PAD.l + (i / (n - 1)) * plotW);
  const y = (v: number) => PAD.t + plotH - (v / max) * plotH;

  const linePath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(d.value).toFixed(1)}`)
    .join(' ');
  const areaPath =
    `M${x(0).toFixed(1)},${(PAD.t + plotH).toFixed(1)} ` +
    data.map((d, i) => `L${x(i).toFixed(1)},${y(d.value).toFixed(1)}`).join(' ') +
    ` L${x(n - 1).toFixed(1)},${(PAD.t + plotH).toFixed(1)} Z`;

  const color = toneVar[tone];

  const handleMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    let nearest = 0;
    let best = Infinity;
    for (let i = 0; i < n; i++) {
      const d = Math.abs(x(i) - px);
      if (d < best) {
        best = d;
        nearest = i;
      }
    }
    setActive(nearest);
  };

  return (
    <div className='relative w-full'>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className='w-full'
        style={{ height }}
        preserveAspectRatio='none'
        onMouseMove={handleMove}
        onMouseLeave={() => setActive(null)}
      >
        <defs>
          <linearGradient id={`area-${gid}`} x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor={color} stopOpacity='0.45' />
            <stop offset='100%' stopColor={color} stopOpacity='0' />
          </linearGradient>
        </defs>

        {/* gridlines */}
        {[0, 0.25, 0.5, 0.75, 1].map((g) => (
          <line
            key={g}
            x1={PAD.l}
            x2={W - PAD.r}
            y1={PAD.t + plotH * g}
            y2={PAD.t + plotH * g}
            stroke='currentColor'
            strokeOpacity={0.08}
            className='text-foreground'
          />
        ))}

        <path d={areaPath} fill={`url(#area-${gid})`} />
        <path
          d={linePath}
          fill='none'
          stroke={color}
          strokeWidth={2}
          strokeLinejoin='round'
          strokeLinecap='round'
          vectorEffect='non-scaling-stroke'
        />

        {/* active guide */}
        {active !== null && (
          <>
            <line
              x1={x(active)}
              x2={x(active)}
              y1={PAD.t}
              y2={PAD.t + plotH}
              stroke={color}
              strokeOpacity={0.4}
              strokeDasharray='3 3'
            />
            <circle cx={x(active)} cy={y(data[active].value)} r={4.5} fill={color} />
            <circle cx={x(active)} cy={y(data[active].value)} r={9} fill={color} fillOpacity={0.2} />
          </>
        )}
      </svg>

      {/* tooltip */}
      {active !== null && (
        <div
          className='pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg border border-border bg-[var(--popover)] px-2.5 py-1.5 text-xs shadow-lg'
          style={{
            left: `${(x(active) / W) * 100}%`,
            top: `${(y(data[active].value) / H) * 100}%`,
          }}
        >
          <div className='font-mono text-[10px] uppercase tracking-wider text-muted-foreground'>
            {data[active].label}
          </div>
          <div className='font-display text-sm font-semibold text-foreground'>
            {formatValue(data[active].value)}
          </div>
        </div>
      )}
    </div>
  );
};

export default AreaTrendChart;
