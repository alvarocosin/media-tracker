import React, { useState, useEffect } from 'react';
import MediaGrid from '../components/MediaGrid.jsx';
import moviesData from '../data/movies.json';
import { Link } from 'react-router-dom';

// ✅ Helper to group movies by year and month index (0–11)
function groupMoviesByDate(movies) {
  return movies.reduce((acc, movie) => {
    const date = new Date(movie.dateWatched);
    const year = date.getFullYear();
    const monthIndex = date.getMonth(); // 0 = Jan, 11 = Dec

    if (!acc[year]) acc[year] = {};
    if (!acc[year][monthIndex]) acc[year][monthIndex] = [];

    acc[year][monthIndex].push(movie);
    return acc;
  }, {});
}

// For displaying readable month names
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

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
      {Object.keys(groupedMovies)
        .sort((a, b) => b - a) // latest year first
        .map((year) => (
          <div key={year}>
            <h2>{year}</h2>

            {Object.keys(groupedMovies[year])
              .map(Number) // convert month indexes to numbers
              .sort((a, b) => b - a) // 🔹 Dec → Jan consistently everywhere
              .map((monthIndex) => {
                let sortedMovies = [...groupedMovies[year][monthIndex]].sort(
                  (a, b) => new Date(b.dateWatched) - new Date(a.dateWatched)
                );

                // If all movies have the same date, reverse manually
                const allDatesEqual = sortedMovies.every(
                  (m) => m.dateWatched === sortedMovies[0].dateWatched
                );
                if (allDatesEqual) sortedMovies = sortedMovies.reverse();

                return (
                  <div key={monthIndex}>
                    <h3>{monthNames[monthIndex]}</h3>
                    <MediaGrid items={sortedMovies} />
                  </div>
                );
              })}
          </div>
        ))}
    </div>
  );
}