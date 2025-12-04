import { MovieDetails, SearchResponse } from "../types/movie";

const API_KEY = "1b65ae45";
const BASE_URL = "https://www.omdbapi.com";

export const searchMovies = async (
  query: string,
  page: number = 1
): Promise<SearchResponse> => {
  if (!query.trim()) {
    return {
      Search: [],
      totalResults: "0",
      Response: "False",
    };
  }

  try {
    const response = await fetch(
      `${BASE_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(
        query
      )}&page=${page}`,
      {
        method: "GET",
        headers: { Accept: "application/json" },
      }
    );

    const data: SearchResponse = await response.json();

    return data;
  } catch (error) {
    throw new Error("Failed to search movies");
  }
};

export const getMovieDetails = async (
  imdbID: string
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${BASE_URL}/?apikey=${API_KEY}&i=${imdbID}&plot=full`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.Response === "True") {
      return data;
    }

    throw new Error(data.Error || "Failed to fetch movie details");
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch movie details"
    );
  }
};
