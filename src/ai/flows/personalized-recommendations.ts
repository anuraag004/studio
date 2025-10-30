'use server';

/**
 * @fileOverview This file implements the AI-powered movie recommendation flow.
 *
 * - recommendMovies - A function that takes a user's viewing history and saved movies and returns personalized movie recommendations.
 * - RecommendMoviesInput - The input type for the recommendMovies function.
 * - RecommendMoviesOutput - The return type for the recommendMovies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendMoviesInputSchema = z.object({
  viewingHistory: z
    .array(z.string())
    .describe('An array of movie titles the user has watched.'),
  savedMovies: z
    .array(z.string())
    .describe('An array of movie titles the user has saved to their watchlist.'),
});
export type RecommendMoviesInput = z.infer<typeof RecommendMoviesInputSchema>;

const RecommendMoviesOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('An array of movie titles recommended for the user.'),
});
export type RecommendMoviesOutput = z.infer<typeof RecommendMoviesOutputSchema>;

export async function recommendMovies(input: RecommendMoviesInput): Promise<RecommendMoviesOutput> {
  return recommendMoviesFlow(input);
}

const findSimilarMovies = ai.defineTool(
  {
    name: 'findSimilarMovies',
    description: 'Finds movies similar to a given list of movies.',
    inputSchema: z.object({
      movieTitles: z.array(z.string()).describe('An array of movie titles to find similar movies to.'),
    }),
    outputSchema: z.array(z.string()).describe('An array of similar movie titles.'),
  },
  async input => {
    // TODO: Replace with actual implementation that searches a movie database.
    // This is a placeholder implementation that returns a static list of movies.
    return [
      'Movie A',
      'Movie B',
      'Movie C',
      'Movie D',
      'Movie E',
    ];
  }
);

const prompt = ai.definePrompt({
  name: 'recommendMoviesPrompt',
  input: {schema: RecommendMoviesInputSchema},
  output: {schema: RecommendMoviesOutputSchema},
  tools: [findSimilarMovies],
  prompt: `You are a movie recommendation expert. Based on the user's viewing history and saved movies, recommend movies they might like.

  The user's viewing history:
  {{#each viewingHistory}}
  - {{this}}
  {{/each}}

  The user's saved movies:
  {{#each savedMovies}}
  - {{this}}
  {{/each}}

  Use the findSimilarMovies tool to find movies similar to the user's viewing history and saved movies.
  Return the recommendations in a list.
  `,
});

const recommendMoviesFlow = ai.defineFlow(
  {
    name: 'recommendMoviesFlow',
    inputSchema: RecommendMoviesInputSchema,
    outputSchema: RecommendMoviesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
