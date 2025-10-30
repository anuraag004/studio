import { getMovieById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Star, UserCircle2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { WatchlistButton } from '@/components/WatchlistButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MovieDetailPage({ params }: { params: { id: string } }) {
  const movie = getMovieById(params.id);

  if (!movie) {
    notFound();
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="grid md:grid-cols-12 gap-8 lg:gap-12">
        <div className="md:col-span-4 lg:col-span-3">
          <Card className="overflow-hidden sticky top-24">
            <Image
              src={movie.posterUrl}
              alt={`Poster for ${movie.title}`}
              width={400}
              height={600}
              className="w-full h-auto object-cover"
              data-ai-hint={movie.posterHint}
              priority
            />
          </Card>
        </div>
        <div className="md:col-span-8 lg:col-span-9">
          <div className="flex flex-col space-y-4">
             <div className="space-y-2">
                <div className="flex items-center gap-4">
                    <h1 className="text-4xl lg:text-5xl font-headline font-bold">{movie.title}</h1>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <span>Directed by {movie.director}</span>
                </div>
             </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-accent fill-accent" />
                <span className="font-bold text-xl">{movie.rating.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">/ 10</span>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex flex-wrap gap-2">
                {movie.genre.map(g => (
                  <Badge key={g} variant="secondary">{g}</Badge>
                ))}
              </div>
            </div>

            <p className="text-lg text-foreground/80 leading-relaxed max-w-prose">
              {movie.description}
            </p>
            
            <div>
              <WatchlistButton movie={movie} size="lg">
                {`Add to Watchlist`}
              </WatchlistButton>
            </div>

            <Separator className="my-6" />

            <div>
              <h2 className="text-2xl font-headline font-semibold mb-4">Cast</h2>
              <div className="flex flex-wrap gap-4">
                {movie.cast.map(actor => (
                  <div key={actor} className="flex items-center gap-2 p-2 bg-secondary rounded-lg">
                    <UserCircle2 className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm font-medium">{actor}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-6">
                <h2 className="text-2xl font-headline font-semibold">Reviews</h2>
                {movie.reviews.length > 0 ? (
                    movie.reviews.map((review, index) => (
                        <Card key={index} className="bg-secondary/50">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center justify-between">
                                    <span>{review.author}</span>
                                    <div className="flex items-center gap-1 text-base">
                                        <span className="font-bold">{review.rating}</span>
                                        <Star className="w-4 h-4 text-accent fill-accent" />
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground italic">"{review.text}"</p>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p className="text-muted-foreground">No reviews yet.</p>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
