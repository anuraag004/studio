'use client';

import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';

export function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [query, setQuery] = useState(searchParams.get('query')?.toString() || '');

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (query) {
        params.set('query', query);
      } else {
        params.delete('query');
      }
      
      if (pathname === '/') {
        replace(`${pathname}?${params.toString()}`);
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query, pathname, replace, searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('query', query);
    } else {
      params.delete('query');
    }
    // if not on homepage, go to homepage with search query
    replace(`/?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSearchSubmit} className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies, actors, genres..."
        className="w-full pl-10 h-12 text-base"
        aria-label="Search movies"
      />
    </form>
  );
}
