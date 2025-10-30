import { MovieCard } from '@/components/MovieCard';
import { getMovies } from '@/lib/data';
import { SearchBar } from '@/components/SearchBar';

export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || '';
  const movies = getMovies(query);

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

      {movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">No movies found for "{query}".</p>
          <p className="text-sm text-muted-foreground mt-2">Try a different search term.</p>
        </div>
      )}
    </div>
  );
}
