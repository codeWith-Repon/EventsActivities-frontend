'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useTransition } from 'react';

export interface SelectFilterOption {
  label: string;
  value: string;
}

interface SelectFilterProps {
  paramName: string;
  placeholder: string;
  options: SelectFilterOption[];
  /** label for the "no filter" option */
  allLabel?: string;
  className?: string;
}

const ALL = '__all__';

const SelectFilter = ({
  paramName,
  placeholder,
  options,
  allLabel = 'All',
  className,
}: SelectFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const current = searchParams.get(paramName) ?? ALL;

  const onChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === ALL) params.delete(paramName);
    else params.set(paramName, value);
    params.set('page', '1');
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <Select value={current} onValueChange={onChange} disabled={isPending}>
      <SelectTrigger
        className={`h-10 min-w-[9rem] border-border bg-muted ${className ?? ''}`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL}>{allLabel}</SelectItem>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectFilter;
