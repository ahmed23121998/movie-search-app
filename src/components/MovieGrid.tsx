import { Movie } from "../types/movie";
import { MovieCard } from "./MovieCard";
import { PlayCircle } from "lucide-react";
interface MovieGridProps {
  movies: Movie[];
  hasSearched: boolean;
  onMovieClick: (imdbID: string) => void;
  isFavorite: (imdbID: string) => boolean;
  onToggleFavorite: (imdbID: string) => void;
}

export function MovieGrid({
  movies,
  hasSearched,
  onMovieClick,
  isFavorite,
  onToggleFavorite,
}: MovieGridProps) {
  if (!hasSearched) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500 px-4 sm:px-6">
        <PlayCircle className="w-16 h-16 mb-4 text-gray-400" />
        <p className="text-xl text-center">
          Start searching for your favorite movies and TV shows
        </p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <PlayCircle className="w-16 h-16 mb-4 text-gray-400" />
        <p className="text-xl">No results found</p>
        <p className="text-xl mt-2">Try a different search like Avatar</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onClick={() => onMovieClick(movie.imdbID)}
          isFavorite={isFavorite(movie.imdbID)}
          onToggleFavorite={() => onToggleFavorite(movie.imdbID)}
        />
      ))}
    </div>
  );
}
