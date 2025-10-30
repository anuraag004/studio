'use client';

import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { useWatchlist } from '@/context/WatchlistContext';
import type { Movie } from '@/lib/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface WatchlistButtonProps extends Omit<ButtonProps, 'onClick'> {
  movie: Movie;
}

export function WatchlistButton({ movie, ...props }: WatchlistButtonProps) {
  const { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(movie.id);

  const handleToggleWatchlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  const tooltipText = inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist';
  const Icon = inWatchlist ? BookmarkCheck : Bookmark;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={handleToggleWatchlist} {...props}>
            <Icon className="h-5 w-5" />
            <span className="sr-only">{tooltipText}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
