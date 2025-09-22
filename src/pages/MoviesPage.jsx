import React, { useState, useEffect } from 'react';
import MediaGrid from '../components/MediaGrid.jsx';
import moviesData from '../data/movies.json';
import { Link } from 'react-router-dom';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const API_KEY = "4723d1042068d890074a88f91dfd805b";
  const DEFAULT_POSTER = '/default-poster.png'; // fallback image

  useEffect(() => {
    async function fetchPosters() {
      const updatedMovies = await Promise.all(
        moviesData.map(async (movie) => {
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

      setMovies(updatedMovies);
    }

    fetchPosters();
  }, []);

  return (
    <div>
      <h1>Movies</h1>
      {movies.length === 0 ? (
        <p>Loading movies...</p>
      ) : (
        <MediaGrid items={movies} />
      )}
      <Link to="/" className="big-button">Back to Home</Link>
    </div>
  );
}