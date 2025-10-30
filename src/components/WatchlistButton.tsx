'use client';

import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { useWatchlist } from '@/context/WatchlistContext';
import type { Movie } from '@/lib/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useEffect, useState } from 'react';

interface WatchlistButtonProps extends Omit<ButtonProps, 'onClick'> {
  movie: Movie;
}

export function WatchlistButton({ movie, ...props }: WatchlistButtonProps) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const inWatchlist = isClient ? isInWatchlist(movie.id) : false;

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

  if (!isClient) {
    // Render a placeholder or null on the server and initial client render
    const { size } = props;
    if (size === 'icon') {
       return <div className="h-10 w-10" />;
    }
    return <div className="h-11 w-44" />;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={handleToggleWatchlist} {...props}>
            <Icon className="h-5 w-5" />
            <span className="sr-only">{tooltipText}</span>
            {props.children && <span className="ml-2">{props.children}</span>}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
