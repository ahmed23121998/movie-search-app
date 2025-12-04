import { useState, useEffect } from "react";
import { SearchBar } from "../components/SearchBar";
import { FilterSort } from "../components/FilterSort";
import { MovieGrid } from "../components/MovieGrid";
import { MovieDetailsModal } from "../components/MovieDetailsModal";
import { searchMovies } from "../services/omdbApi";
import { useFavorites } from "../hooks/useFavorites";
import { Movie } from "../types/movie";
import { filterMovies, sortMovies } from "../utils/filterSort";
import toast from "react-hot-toast";
import { Pagination } from "../components/Pagination";

const ITEMS_PER_PAGE = 10;

export function SearchPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("none");
  const [currentPage, setCurrentPage] = useState(1);

  const { toggleFavorite, isFavorite } = useFavorites();

  const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);

  const handleSearch = async (searchQuery: string, page = 1) => {
    const trimmedQuery = searchQuery.trim();
    setQuery(trimmedQuery);

    if (!trimmedQuery) {
      setMovies([]);
      setHasSearched(false);
      setError(null);
      setTotalResults(0);
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const data = await searchMovies(trimmedQuery, page);
      setMovies(data.Search || []);
      setTotalResults(Number(data.totalResults) || 0);

      if (!data.Search || data.Search.length === 0) {
        toast.error("No results found");
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to search movies";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = (imdbID: string) => {
    toggleFavorite(imdbID);
    toast.success(
      isFavorite(imdbID) ? "Removed from favorites" : "Added to favorites"
    );
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    handleSearch(query, page);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [typeFilter, sortBy]);

  const filteredMovies = filterMovies(movies, typeFilter);
  const sortedMovies = sortMovies(filteredMovies, sortBy);

  return (
    <>
      <div className="bg-gray-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <SearchBar onSearch={(q) => handleSearch(q, 1)} isLoading={loading} />
        </div>
      </div>

      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {loading && (
          <div className="flex items-center justify-center py-16 sm:py-20">
            <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-blue-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 sm:px-6 py-4 rounded-lg text-center max-w-xl mx-auto">
            {error}
          </div>
        )}

        {!loading && !error && hasSearched && movies.length > 0 && (
          <div className="mb-6">
            <div className="flex justify-center">
              <FilterSort
                typeFilter={typeFilter}
                sortBy={sortBy}
                onTypeFilterChange={setTypeFilter}
                onSortChange={setSortBy}
              />
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            <MovieGrid
              movies={sortedMovies}
              hasSearched={hasSearched}
              onMovieClick={setSelectedMovieId}
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavorite}
            />

            <div className="mt-6 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
              />
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
      </main>
    </>
  );
}
