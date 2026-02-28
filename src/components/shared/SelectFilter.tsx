'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useTransition } from 'react';

interface SelectFilterProps {
  paramsName: string;
  placeholder?: string;
  defaultValue?: string;
  options: { value: string; label: string }[];
}

const SelectFilter = ({
  paramsName,
  placeholder,
  defaultValue = 'All',
  options,
}: SelectFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentValue = searchParams.get(paramsName) || defaultValue;

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === defaultValue) {
      params.delete(paramsName);
    } else if (value) {
      params.set(paramsName, value);
    } else {
      params.delete(paramsName);
    }

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };
  return (
    <Select
      value={currentValue}
      onValueChange={handleChange}
      disabled={isPending}
    >
      <SelectTrigger className='cursor-pointer'>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value={defaultValue} className='cursor-pointer'>
          {defaultValue}
        </SelectItem>

        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className='cursor-pointer'
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectFilter;
