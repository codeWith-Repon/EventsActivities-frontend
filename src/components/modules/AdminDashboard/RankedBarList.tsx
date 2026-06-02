'use client';

export interface RankedItem {
  id: string;
  label: string;
  sublabel?: string;
  value: number;
}

const money = (n: number) => `৳ ${new Intl.NumberFormat('en-US').format(Math.round(n))}`;

const RankedBarList = ({ items }: { items: RankedItem[] }) => {
  if (!items.length) {
    return (
      <p className='py-8 text-center text-sm text-muted-foreground'>
        No revenue recorded yet.
      </p>
    );
  }
  const max = Math.max(...items.map((i) => i.value), 1);

  return (
    <ul className='space-y-3'>
      {items.map((item, i) => (
        <li key={item.id} className='group'>
          <div className='mb-1.5 flex items-center justify-between gap-3'>
            <span className='flex min-w-0 items-center gap-2.5'>
              <span className='grid size-5 shrink-0 place-items-center rounded-md bg-white/5 font-mono text-[10px] text-muted-foreground'>
                {i + 1}
              </span>
              <span className='truncate text-sm text-foreground'>
                {item.label}
              </span>
            </span>
            <span className='shrink-0 font-mono text-sm font-medium text-foreground'>
              {money(item.value)}
            </span>
          </div>
          <div className='h-1.5 w-full overflow-hidden rounded-full bg-white/5'>
            <div
              className='h-full rounded-full bg-gradient-aurora transition-all duration-500'
              style={{ width: `${Math.max((item.value / max) * 100, 2)}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RankedBarList;
