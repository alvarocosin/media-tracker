import React, { useState, useEffect } from 'react';
import MediaGrid from '../components/MediaGrid.jsx';
import moviesData from '../data/movies.json';
import { Link } from 'react-router-dom';

// Helper to group movies by year and month
function groupMoviesByDate(movies) {
  return movies.reduce((acc, movie) => {
    const date = new Date(movie.dateWatched);
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" });

    if (!acc[year]) acc[year] = {};
    if (!acc[year][month]) acc[year][month] = [];

    acc[year][month].push(movie);
    return acc;
  }, {});
}

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const API_KEY = "4723d1042068d890074a88f91dfd805b";
  const DEFAULT_POSTER = '/default-poster.png';

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

  if (movies.length === 0) {
    return <p>Loading movies...</p>;
  }

  const groupedMovies = groupMoviesByDate(movies);

  return (
    <div>
      <h1>Movies</h1>

      {Object.keys(groupedMovies)
        .sort((a, b) => b - a) // show latest year first
        .map((year) => (
          <div key={year}>
            <h2>{year}</h2>
            {Object.keys(groupedMovies[year])
              .sort(
                (a, b) =>
                  new Date(`${a} 1, ${year}`) -
                  new Date(`${b} 1, ${year}`)
              )
              .map((month) => (
                <div key={month}>
                  <h3>{month}</h3>
                  <MediaGrid items={groupedMovies[year][month]} />
                </div>
              ))}
          </div>
        ))}

      <Link to="/" className="big-button">Back to Home</Link>
    </div>
  );
}