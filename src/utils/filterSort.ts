import { Movie } from '../types/movie';

export function filterMovies(movies: Movie[], typeFilter: string): Movie[] {
  if (typeFilter === 'all') {
    return movies;
  }
  return movies.filter(movie => movie.Type.toLowerCase() === typeFilter.toLowerCase());
}

export function sortMovies(movies: Movie[], sortBy: string): Movie[] {
  const sorted = [...movies];

  switch (sortBy) {
    case 'year-desc':
      return sorted.sort((a, b) => {
        const yearA = parseInt(a.Year.split('–')[0]);
        const yearB = parseInt(b.Year.split('–')[0]);
        return yearB - yearA;
      });
    case 'year-asc':
      return sorted.sort((a, b) => {
        const yearA = parseInt(a.Year.split('–')[0]);
        const yearB = parseInt(b.Year.split('–')[0]);
        return yearA - yearB;
      });
    case 'title-asc':
      return sorted.sort((a, b) => a.Title.localeCompare(b.Title));
    case 'title-desc':
      return sorted.sort((a, b) => b.Title.localeCompare(a.Title));
    default:
      return sorted;
  }
}
