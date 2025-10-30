'use client';

import { MovieCard } from '@/components/MovieCard';
import { getMovies, movies } from '@/lib/data';
import { SearchBar } from '@/components/SearchBar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    genre?: string;
  };
}) {
  const query = searchParams?.query || '';
  const genre = searchParams?.genre || '';
  
  const allGenres = Array.from(new Set(movies.flatMap(m => m.genre)));

  const filteredMovies = getMovies(query, genre);

  return (
    <div className="container py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4 tracking-tight">
          Explore the Cinematic Universe
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover your next favorite film. Search for movies, actors, genres, and get personalized recommendations.
        </p>
        <div className="mt-8 max-w-lg mx-auto">
          <SearchBar />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-headline font-semibold mb-4 text-center">Browse by Genre</h2>
        <div className="flex flex-wrap gap-2 justify-center">
          <Link href={{ pathname: '/', query: { ...searchParams, genre: undefined } }}>
            <Badge variant={!genre ? 'default' : 'secondary'} className="text-sm cursor-pointer">
              All
            </Badge>
          </Link>
          {allGenres.map(g => (
            <Link key={g} href={{ pathname: '/', query: { ...searchParams, genre: g } }}>
               <Badge variant={genre === g ? 'default' : 'secondary'} className="text-sm cursor-pointer">
                {g}
              </Badge>
            </Link>
          ))}
        </div>
      </section>

      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
          {filteredMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">
            {query ? `No movies found for "${query}"` : 'No movies found.'}
            {genre && query && ` in the ${genre} genre`}
            {genre && !query && `No movies found in the ${genre} genre.`}
          </p>
          <p className="text-sm text-muted-foreground mt-2">Try a different search or genre.</p>
        </div>
      )}
    </div>
  );
}
