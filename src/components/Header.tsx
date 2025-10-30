"use client";

import Link from 'next/link';
import { Film } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/watchlist', label: 'Watchlist' },
  { href: '/recommendations', label: 'Recommendations' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-8 flex items-center space-x-2">
          <Film className="h-6 w-6 text-primary" />
          <span className="font-headline text-2xl font-bold inline-block">CineScope</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname === link.href ? 'text-foreground' : 'text-foreground/60'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
