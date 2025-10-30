'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { useWatchlist } from '@/context/WatchlistContext';
import { recommendMovies } from '@/ai/flows/personalized-recommendations';
import { getMoviesByTitle } from '@/lib/data';
import type { Movie } from '@/lib/types';
import { MovieCard } from '@/components/MovieCard';
import { Loader2, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const viewingHistory = ['Cosmic Odyssey', 'Blade Runner 2049'];

export default function RecommendationsPage() {
  const { watchlist } = useWatchlist();
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleGetRecommendations = () => {
    startTransition(async () => {
      setError(null);
      try {
        const savedMovieTitles = watchlist.map(movie => movie.title);
        const input = {
          viewingHistory: viewingHistory,
          savedMovies: savedMovieTitles,
        };
        const result = await recommendMovies(input);
        const recommendedMovies = getMoviesByTitle(result.recommendations);
        setRecommendations(recommendedMovies);
      } catch (e: any) {
        setError(e.message || 'An unexpected error occurred.');
      }
    });
  };

  return (
    <div className="container py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-headline font-bold">AI Recommendations</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Based on your viewing history and watchlist, here are some movies you might like.
        </p>
      </div>

      <div className="max-w-4xl mx-auto p-6 border rounded-lg bg-card">
        <h2 className="text-lg font-semibold">Your Taste Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <h3 className="font-medium">Recently Watched</h3>
            {viewingHistory.length > 0 ? (
              <ul className="list-disc list-inside text-muted-foreground mt-2">
                {viewingHistory.map(title => <li key={title}>{title}</li>)}
              </ul>
            ) : <p className="text-sm text-muted-foreground mt-2">No viewing history yet.</p>}
          </div>
          <div>
            <h3 className="font-medium">In Your Watchlist</h3>
            {watchlist.length > 0 ? (
              <ul className="list-disc list-inside text-muted-foreground mt-2">
                {watchlist.map(movie => <li key={movie.id}>{movie.title}</li>)}
              </ul>
            ): <p className="text-sm text-muted-foreground mt-2">Your watchlist is empty.</p>}
          </div>
        </div>
        <div className="mt-6 text-center">
            <Button onClick={handleGetRecommendations} disabled={isPending} size="lg">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Get AI Recommendations
                </>
              )}
            </Button>
        </div>
      </div>
      
      {error && (
        <Alert variant="destructive" className="my-8">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {recommendations.length > 0 && (
        <div className="mt-12">
            <h2 className="text-2xl font-headline font-bold text-center mb-8">Recommended For You</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
                {recommendations.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
      )}
    </div>
  );
}
