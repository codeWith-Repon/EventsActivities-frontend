'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

type Tone = 'violet' | 'cyan' | 'fuchsia' | 'teal' | 'amber' | 'slate';

const toneVar: Record<Tone, string> = {
  violet: 'var(--aurora-violet)',
  cyan: 'var(--aurora-cyan)',
  fuchsia: 'var(--aurora-fuchsia)',
  teal: 'var(--aurora-teal)',
  amber: 'var(--aurora-amber)',
  slate: 'oklch(0.6 0.03 285)',
};

export interface DonutSegment {
  label: string;
  value: number;
  tone: Tone;
}

interface DonutChartProps {
  segments: DonutSegment[];
  centerLabel?: string;
}

const R = 58;
const STROKE = 18;
const C = 2 * Math.PI * R;

const DonutChart = ({ segments, centerLabel = 'Total' }: DonutChartProps) => {
  const [active, setActive] = useState<number | null>(null);
  const total = segments.reduce((s, d) => s + d.value, 0);

  if (total === 0) {
    return (
      <div className='flex h-[180px] items-center justify-center text-sm text-muted-foreground'>
        No events yet
      </div>
    );
  }

  const arcs = segments.map((seg, i) => {
    const dash = (seg.value / total) * C;
    // cumulative length of all prior segments (n is tiny, so O(n²) is fine)
    const priorLength = segments
      .slice(0, i)
      .reduce((sum, s) => sum + (s.value / total) * C, 0);
    return {
      seg,
      i,
      dash,
      gap: C - dash,
      offset: -priorLength,
    };
  });

  const shown = active !== null ? segments[active] : null;

  return (
    <div className='flex flex-col items-center gap-5 sm:flex-row sm:gap-7'>
      <div className='relative shrink-0'>
        <svg viewBox='0 0 160 160' className='size-44 -rotate-90'>
          <circle
            cx='80'
            cy='80'
            r={R}
            fill='none'
            stroke='currentColor'
            strokeOpacity={0.08}
            strokeWidth={STROKE}
            className='text-foreground'
          />
          {arcs.map(({ seg, i, dash, gap, offset }) => (
            <circle
              key={i}
              cx='80'
              cy='80'
              r={R}
              fill='none'
              stroke={toneVar[seg.tone]}
              strokeWidth={active === i ? STROKE + 4 : STROKE}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={offset}
              strokeLinecap='butt'
              className='cursor-pointer transition-all duration-200'
              style={{ opacity: active === null || active === i ? 1 : 0.4 }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            />
          ))}
        </svg>
        <div className='absolute inset-0 flex flex-col items-center justify-center'>
          <span className='font-display text-2xl font-semibold text-foreground'>
            {shown ? shown.value : total}
          </span>
          <span className='font-mono text-[10px] uppercase tracking-wider text-muted-foreground'>
            {shown ? shown.label : centerLabel}
          </span>
        </div>
      </div>

      {/* legend */}
      <ul className='grid w-full grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-1'>
        {segments.map((seg, i) => (
          <li
            key={seg.label}
            className={cn(
              'flex items-center justify-between gap-3 rounded-lg px-2 py-1 text-sm transition-colors',
              active === i && 'bg-white/5'
            )}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            <span className='flex items-center gap-2'>
              <span
                className='size-2.5 rounded-sm'
                style={{ background: toneVar[seg.tone] }}
              />
              <span className='capitalize text-muted-foreground'>
                {seg.label.toLowerCase()}
              </span>
            </span>
            <span className='font-mono text-xs text-foreground'>
              {seg.value}
              <span className='ml-1 text-muted-foreground'>
                {Math.round((seg.value / total) * 100)}%
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DonutChart;
