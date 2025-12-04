import { useState, useEffect } from "react";
import { PlayCircle } from "lucide-react";
import { MovieDetailsModal } from "../components/MovieDetailsModal";
import { MovieCard } from "../components/MovieCard";
import { useFavorites } from "../hooks/useFavorites";
import { getMovieDetails } from "../services/omdbApi";
import { MovieDetails } from "../types/movie";
import { filterMovies, sortMovies } from "../utils/filterSort";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 10;

export function FavoritesPage() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [favoriteMovies, setFavoriteMovies] = useState<MovieDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [typeFilter] = useState("all");
  const [sortBy] = useState("none");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadFavorites = async () => {
      if (favorites.length === 0) {
        setFavoriteMovies([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const moviesData = await Promise.all(
          favorites.map((id) => getMovieDetails(id))
        );
        setFavoriteMovies(moviesData);
      } catch (error) {
        toast.error("Failed to load favorite movies");
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [typeFilter, sortBy]);

  const handleToggleFavorite = async (imdbID: string) => {
    const wasFavorite = isFavorite(imdbID);
    toggleFavorite(imdbID);

    if (wasFavorite) {
      setFavoriteMovies((prev) =>
        prev.filter((movie) => movie.imdbID !== imdbID)
      );
      toast.success("Removed from favorites");
    } else {
      try {
        const movie = await getMovieDetails(imdbID);
        setFavoriteMovies((prev) => [...prev, movie]);
        toast.success("Added to favorites");
      } catch (error) {
        toast.error("Failed to add movie to favorites");
      }
    }
  };

  const filteredMovies = filterMovies(favoriteMovies, typeFilter);
  const sortedMovies = sortMovies(filteredMovies, sortBy);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedMovies = sortedMovies.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <div className="text-start p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          My Favorites
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          {favoriteMovies.length}{" "}
          {favoriteMovies.length === 1 ? "movie" : "movies"} saved
        </p>
      </div>

      {favoriteMovies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <PlayCircle className="w-16 h-16 mb-4 text-gray-400" />
          <p className="text-xl">No favorites yet</p>
          <p className="text-sm mt-2">
            Start adding movies to your favorites list
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
            {paginatedMovies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                onClick={() => setSelectedMovieId(movie.imdbID)}
                isFavorite={isFavorite(movie.imdbID)}
                onToggleFavorite={() => handleToggleFavorite(movie.imdbID)}
              />
            ))}
          </div>
        </>
      )}

      {selectedMovieId && (
        <MovieDetailsModal
          imdbID={selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
          isFavorite={isFavorite(selectedMovieId)}
          onToggleFavorite={() => handleToggleFavorite(selectedMovieId)}
        />
      )}
    </div>
  );
}
