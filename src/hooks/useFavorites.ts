import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'movie-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (imdbID: string) => {
    setFavorites(prev =>
      prev.includes(imdbID)
        ? prev.filter(id => id !== imdbID)
        : [...prev, imdbID]
    );
  };

  const isFavorite = (imdbID: string) => favorites.includes(imdbID);

  return { favorites, toggleFavorite, isFavorite };
}
