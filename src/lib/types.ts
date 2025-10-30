export interface Review {
  author: string;
  text: string;
  rating: number;
}

export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  posterHint: string;
  description: string;
  cast: string[];
  director: string;
  rating: number;
  reviews: Review[];
  genre: string[];
}
