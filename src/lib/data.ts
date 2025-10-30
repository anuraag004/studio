import type { Movie } from '@/lib/types';
import images from '@/lib/placeholder-images.json';

const posters: Record<string, { imageUrl: string; imageHint: string }> = {};
images.placeholderImages.forEach(img => {
  posters[img.id] = { imageUrl: img.imageUrl, imageHint: img.imageHint };
});

export const movies: Movie[] = [
  {
    id: '1',
    title: 'Cosmic Odyssey',
    posterUrl: posters['m1'].imageUrl,
    posterHint: posters['m1'].imageHint,
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    director: 'Christopher Nolan',
    rating: 8.6,
    genre: ['Sci-Fi', 'Adventure', 'Drama'],
    reviews: [
      { author: 'CinemaBlend', rating: 5, text: 'A mind-bending masterpiece of science fiction.' },
      { author: 'Rolling Stone', rating: 4, text: 'Visually stunning and emotionally resonant.' },
    ],
  },
  {
    id: '2',
    title: 'Blade Runner 2049',
    posterUrl: posters['m2'].imageUrl,
    posterHint: posters['m2'].imageHint,
    description: 'A young Blade Runner\'s discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who\'s been missing for 30 years.',
    cast: ['Ryan Gosling', 'Harrison Ford', 'Ana de Armas'],
    director: 'Denis Villeneuve',
    rating: 8.0,
    genre: ['Sci-Fi', 'Action', 'Mystery'],
    reviews: [
      { author: 'Wired', rating: 5, text: 'A breathtaking, beautiful sequel that expands on the original.' },
      { author: 'The Verge', rating: 5, text: 'An atmospheric triumph.' },
    ],
  },
  {
    id: '3',
    title: 'Jungle Cruise',
    posterUrl: posters['m3'].imageUrl,
    posterHint: posters['m3'].imageHint,
    description: 'Based on Disneyland\'s theme park ride where a small riverboat takes a group of travelers through a jungle filled with dangerous animals and reptiles but with a supernatural element.',
    cast: ['Dwayne Johnson', 'Emily Blunt', 'Edgar Ramírez'],
    director: 'Jaume Collet-Serra',
    rating: 6.6,
    genre: ['Adventure', 'Comedy', 'Family'],
    reviews: [
      { author: 'IGN', rating: 3, text: 'A fun, if forgettable, family adventure.' },
    ],
  },
  {
    id: '4',
    title: 'Knives Out',
    posterUrl: posters['m4'].imageUrl,
    posterHint: posters['m4'].imageHint,
    description: 'A detective investigates the death of a patriarch of an eccentric, combative family.',
    cast: ['Daniel Craig', 'Chris Evans', 'Ana de Armas'],
    director: 'Rian Johnson',
    rating: 7.9,
    genre: ['Mystery', 'Comedy', 'Crime'],
    reviews: [
      { author: 'Variety', rating: 5, text: 'A delightfully modern whodunnit.' },
      { author: 'The Guardian', rating: 4, text: 'Witty, stylish, and thoroughly entertaining.' },
    ],
  },
  {
    id: '5',
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    posterUrl: posters['m5'].imageUrl,
    posterHint: posters['m5'].imageHint,
    description: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
    cast: ['Elijah Wood', 'Ian McKellen', 'Orlando Bloom'],
    director: 'Peter Jackson',
    rating: 8.8,
    genre: ['Fantasy', 'Adventure', 'Action'],
    reviews: [
      { author: 'Empire', rating: 5, text: 'An epic in the truest sense of the word.' },
    ],
  },
    {
    id: '6',
    title: 'Avatar: The Way of Water',
    posterUrl: posters['m6'].imageUrl,
    posterHint: posters['m6'].imageHint,
    description: 'Jake Sully and Ney\'tiri have formed a family and are doing everything to stay together. However, they must leave their home and explore the regions of Pandora.',
    cast: ['Sam Worthington', 'Zoe Saldaña', 'Sigourney Weaver'],
    director: 'James Cameron',
    rating: 7.7,
    genre: ['Sci-Fi', 'Action', 'Adventure'],
    reviews: [
      { author: 'Total Film', rating: 4, text: 'A stunning visual spectacle that pushes the boundaries of filmmaking.' },
    ],
  },
  {
    id: '7',
    title: 'The Good, the Bad and the Ugly',
    posterUrl: posters['m7'].imageUrl,
    posterHint: posters['m7'].imageHint,
    description: 'A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.',
    cast: ['Clint Eastwood', 'Eli Wallach', 'Lee Van Cleef'],
    director: 'Sergio Leone',
    rating: 8.8,
    genre: ['Western'],
    reviews: [
       { author: 'Cahiers du Cinéma', rating: 5, text: 'The definitive spaghetti Western.' },
    ],
  },
  {
    id: '8',
    title: 'La La Land',
    posterUrl: posters['m8'].imageUrl,
    posterHint: posters['m8'].imageHint,
    description: 'While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.',
    cast: ['Ryan Gosling', 'Emma Stone', 'John Legend'],
    director: 'Damien Chazelle',
    rating: 8.0,
    genre: ['Comedy', 'Drama', 'Music'],
    reviews: [
       { author: 'New York Times', rating: 5, text: 'A vibrant and heartfelt musical for the modern age.' },
    ],
  },
  // Movies for AI recommendation
  {
    id: '100',
    title: 'Movie A',
    posterUrl: posters['m9'].imageUrl,
    posterHint: posters['m9'].imageHint,
    description: 'This is a description for Movie A, a historical drama.',
    cast: ['Actor 1', 'Actor 2'],
    director: 'Director X',
    rating: 7.1,
    genre: ['Drama', 'History'],
    reviews: [],
  },
  {
    id: '101',
    title: 'Movie B',
    posterUrl: posters['m10'].imageUrl,
    posterHint: posters['m10'].imageHint,
    description: 'This is a description for Movie B, a superhero battle.',
    cast: ['Actor 3', 'Actor 4'],
    director: 'Director Y',
    rating: 6.5,
    genre: ['Action', 'Sci-Fi'],
    reviews: [],
  },
  {
    id: '102',
    title: 'Movie C',
    posterUrl: posters['m11'].imageUrl,
    posterHint: posters['m11'].imageHint,
    description: 'This is a description for Movie C, a zombie apocalypse thriller.',
    cast: ['Actor 5', 'Actor 6'],
    director: 'Director Z',
    rating: 7.8,
    genre: ['Horror', 'Thriller'],
    reviews: [],
  },
  {
    id: '103',
    title: 'Movie D',
    posterUrl: posters['m12'].imageUrl,
    posterHint: posters['m12'].imageHint,
    description: 'This is a description for Movie D, a high school comedy.',
    cast: ['Actor 7', 'Actor 8'],
    director: 'Director A',
    rating: 6.2,
    genre: ['Comedy'],
    reviews: [],
  },
  {
    id: '104',
    title: 'Movie E',
    posterUrl: posters['m1'].imageUrl,
    posterHint: 'futuristic adventure',
    description: 'This is a description for Movie E, a futuristic adventure.',
    cast: ['Actor 9', 'Actor 10'],
    director: 'Director B',
    rating: 8.1,
    genre: ['Sci-Fi', 'Adventure'],
    reviews: [],
  },
];

export const getMovies = (query?: string): Movie[] => {
  if (!query) return movies;
  const lowerCaseQuery = query.toLowerCase();
  return movies.filter(
    movie =>
      movie.title.toLowerCase().includes(lowerCaseQuery) ||
      movie.director.toLowerCase().includes(lowerCaseQuery) ||
      movie.cast.some(actor => actor.toLowerCase().includes(lowerCaseQuery)) ||
      movie.genre.some(g => g.toLowerCase().includes(lowerCaseQuery))
  );
};

export const getMovieById = (id: string): Movie | undefined => {
  return movies.find(movie => movie.id === id);
};

export const getMoviesByTitle = (titles: string[]): Movie[] => {
  return movies.filter(movie => titles.includes(movie.title));
}
