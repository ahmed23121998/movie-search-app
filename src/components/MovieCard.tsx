import { Movie } from "../types/movie";
import { Heart } from "lucide-react";

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function MovieCard({
  movie,
  onClick,
  isFavorite,
  onToggleFavorite,
}: MovieCardProps) {
  const posterUrl =
    movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450/e5e7eb/9ca3af?text=No+Poster";

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite();
  };

  return (
    <div
      onClick={onClick}
      className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 sm:hover:scale-105"
    >
      <div className="aspect-[2/3] w-full relative">
        <img
          src={posterUrl}
          alt={movie.Title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
          <h3 className="text-white font-bold text-base sm:text-lg mb-1 line-clamp-2">
            {movie.Title}
          </h3>
          <p className="text-gray-300 text-xs sm:text-sm mb-1">{movie.Year}</p>
          <p className="text-gray-400 text-xs sm:text-xs capitalize">
            {movie.Type}
          </p>
        </div>
      </div>

      <button
        onClick={handleFavoriteClick}
        className="absolute top-2 sm:top-3 right-2 sm:right-3 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors hover:scale-110 z-10"
      >
        <Heart
          className={`w-5 h-5 ${
            isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
          }`}
        />
      </button>
    </div>
  );
}
