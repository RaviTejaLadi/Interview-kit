import type { ComponentProps } from 'react';
import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';

type DTSearchBoxProps = {
  value?: string;
  onChange?: ComponentProps<'input'>['onChange'];
  placeholder?: string;
} & Omit<ComponentProps<typeof Input>, 'value' | 'onChange' | 'placeholder'>;

export function DTSearchBox({
  value,
  onChange,
  placeholder = 'Search...',
  ...DTSearchBoxProps
}: DTSearchBoxProps) {
  return (
    <div className="relative max-w-[400px] flex-1">
      <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-8"
        {...DTSearchBoxProps}
      />
    </div>
  );
}
