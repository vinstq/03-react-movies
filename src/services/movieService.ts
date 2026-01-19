import axios from 'axios';
import { type Movie } from '../types/movie';

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

interface FetchMoviesResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const { data } = await axios.get<FetchMoviesResponse>('/search/movie', {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
    },
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
  });
  return data.results;
};