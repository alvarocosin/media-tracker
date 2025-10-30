import React, { useState, useEffect } from 'react';
import MediaGrid from '../components/MediaGrid.jsx';
import moviesData from '../data/movies.json';
import { Link } from 'react-router-dom';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const API_KEY = "4723d1042068d890074a88f91dfd805b";
  const DEFAULT_POSTER = '/default-poster.png';

  useEffect(() => {
    async function fetchPosters() {
      // 1️⃣ Filter only favorites
      const favMovies = moviesData.filter(movie => movie.fav === true);

      // 2️⃣ Sort by date watched (latest first)
      const sortedFavorites = favMovies.sort(
        (a, b) => new Date(b.dateWatched) - new Date(a.dateWatched)
      );

      // 3️⃣ Fetch posters for each
      const updatedFavorites = await Promise.all(
        sortedFavorites.map(async (movie) => {
          try {
            const response = await fetch(
              `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(movie.title)}&year=${movie.year}`
            );
            const data = await response.json();
            const firstResult = data.results && data.results[0];

            return {
              ...movie,
              posterUrl: firstResult?.poster_path
                ? `https://image.tmdb.org/t/p/w500${firstResult.poster_path}`
                : DEFAULT_POSTER,
            };
          } catch (err) {
            console.error('Error fetching poster for', movie.title, err);
            return { ...movie, posterUrl: DEFAULT_POSTER };
          }
        })
      );

      setFavorites(updatedFavorites);
    }

    fetchPosters();
  }, []);

  if (favorites.length === 0) {
    return <p>No favorite movies found.</p>;
  }

  return (
    <div>
      <h1>❤️ Favorite Movies</h1>
      <MediaGrid items={favorites} />
    </div>
  );
}