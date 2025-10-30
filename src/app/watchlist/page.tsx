'use client';

import { useWatchlist } from '@/context/WatchlistContext';
import { MovieCard } from '@/components/MovieCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Film } from 'lucide-react';

export default function WatchlistPage() {
  const { watchlist } = useWatchlist();

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-headline font-bold">My Watchlist</h1>
        <p className="text-muted-foreground mt-2">Movies you've saved for later.</p>
      </div>
      {watchlist.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
          {watchlist.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center border-2 border-dashed rounded-lg py-20">
          <Film className="w-16 h-16 text-muted-foreground/50 mb-4" />
          <h2 className="text-2xl font-headline font-semibold">Your Watchlist is Empty</h2>
          <p className="text-muted-foreground mt-2 max-w-sm">
            Add movies to your watchlist to see them here.
          </p>
          <Button asChild className="mt-6" variant="default">
            <Link href="/">Browse Movies</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
