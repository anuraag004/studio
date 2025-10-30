'use client';

import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { useEffect, useState, useTransition } from 'react';

export function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  // Use state to manage the input value, but derive initial value from URL
  const [inputValue, setInputValue] = useState(searchParams.get('query')?.toString() || '');

  // Sync state with URL if it changes externally
  useEffect(() => {
    setInputValue(searchParams.get('query')?.toString() || '');
  }, [searchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (inputValue) {
        params.set('query', inputValue);
      } else {
        params.delete('query');
      }
      
      startTransition(() => {
        replace(`${pathname}?${params.toString()}`);
      });

    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, pathname, replace, searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (inputValue) {
      params.set('query', inputValue);
    } else {
      params.delete('query');
    }
    startTransition(() => {
      replace(`/?${params.toString()}`);
    });
  }

  return (
    <form onSubmit={handleSearchSubmit} className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search movies, actors..."
        className="w-full pl-10 h-12 text-base"
        aria-label="Search movies"
      />
    </form>
  );
}
