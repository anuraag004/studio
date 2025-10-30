'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Movie } from '@/lib/types';
import { WatchlistButton } from './WatchlistButton';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="group relative">
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <Link href={`/movie/${movie.id}`} className="block">
          <CardContent className="p-0">
            <Image
              src={movie.posterUrl}
              alt={`Poster for ${movie.title}`}
              width={400}
              height={600}
              className="w-full h-auto object-cover aspect-[2/3]"
              data-ai-hint={movie.posterHint}
            />
          </CardContent>
        </Link>
        <CardFooter className="p-4 flex flex-col items-start flex-grow">
          <div className="flex-grow">
            <Link href={`/movie/${movie.id}`} className="block">
              <h3 className="font-headline font-semibold text-lg leading-tight truncate group-hover:text-primary">
                {movie.title}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground mt-1">{movie.director}</p>
          </div>
          <div className="flex justify-between items-end w-full mt-4">
             <Badge variant="outline" className="font-mono text-sm">{movie.rating.toFixed(1)}</Badge>
            <WatchlistButton movie={movie} size="icon" variant="ghost" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
