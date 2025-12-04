import { useEffect, useState } from "react";
import { X, Star, Calendar, Clock, Heart } from "lucide-react";
import { MovieDetails } from "../types/movie";
import { getMovieDetails } from "../services/omdbApi";

interface MovieDetailsModalProps {
  imdbID: string;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function MovieDetailsModal({
  imdbID,
  onClose,
  isFavorite,
  onToggleFavorite,
}: MovieDetailsModalProps) {
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMovieDetails(imdbID);
        setDetails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load details");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [imdbID]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const posterUrl =
    details?.Poster !== "N/A"
      ? details?.Poster
      : "https://via.placeholder.com/300x450/e5e7eb/9ca3af?text=No+Poster";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {error && (
          <div className="p-8 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {details && (
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 p-4 sm:p-6">
            <div className="md:w-1/3 flex-shrink-0">
              <img
                src={posterUrl}
                alt={details.Title}
                className="w-full rounded-lg shadow-lg"
              />
              <button
                onClick={onToggleFavorite}
                className={`w-full mt-4 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm sm:text-base ${
                  isFavorite
                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
                />
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </button>
            </div>

            <div className="md:w-2/3">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {details.Title}
              </h2>

              <div className="flex flex-wrap gap-4 mb-6">
                {details.imdbRating !== "N/A" && (
                  <div className="flex items-center gap-1 text-gray-700">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{details.imdbRating}</span>
                    <span className="text-gray-500 text-sm">/ 10</span>
                  </div>
                )}
                {details.Year !== "N/A" && (
                  <div className="flex items-center gap-1 text-gray-700">
                    <Calendar className="w-5 h-5" />
                    <span>{details.Year}</span>
                  </div>
                )}
                {details.Runtime !== "N/A" && (
                  <div className="flex items-center gap-1 text-gray-700">
                    <Clock className="w-5 h-5" />
                    <span>{details.Runtime}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium capitalize">
                  {details.Type}
                </span>
                {details.Rated !== "N/A" && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                    {details.Rated}
                  </span>
                )}
                {details.Genre !== "N/A" &&
                  details.Genre.split(", ").map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
              </div>

              {details.Plot !== "N/A" && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Plot
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {details.Plot}
                  </p>
                </div>
              )}

              <div className="space-y-3 text-xs sm:text-sm">
                {details.Director !== "N/A" && (
                  <div>
                    <span className="font-semibold text-gray-900">
                      Director:{" "}
                    </span>
                    <span className="text-gray-700">{details.Director}</span>
                  </div>
                )}
                {details.Actors !== "N/A" && (
                  <div>
                    <span className="font-semibold text-gray-900">Cast: </span>
                    <span className="text-gray-700">{details.Actors}</span>
                  </div>
                )}
                {details.Writer !== "N/A" && (
                  <div>
                    <span className="font-semibold text-gray-900">
                      Writer:{" "}
                    </span>
                    <span className="text-gray-700">{details.Writer}</span>
                  </div>
                )}
                {details.Language !== "N/A" && (
                  <div>
                    <span className="font-semibold text-gray-900">
                      Language:{" "}
                    </span>
                    <span className="text-gray-700">{details.Language}</span>
                  </div>
                )}
                {details.Country !== "N/A" && (
                  <div>
                    <span className="font-semibold text-gray-900">
                      Country:{" "}
                    </span>
                    <span className="text-gray-700">{details.Country}</span>
                  </div>
                )}
                {details.Awards !== "N/A" && (
                  <div>
                    <span className="font-semibold text-gray-900">
                      Awards:{" "}
                    </span>
                    <span className="text-gray-700">{details.Awards}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
