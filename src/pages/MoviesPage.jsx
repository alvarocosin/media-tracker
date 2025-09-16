import React from 'react';
import MediaGrid from '../components/MediaGrid.jsx';
import moviesData from '../data/movies.json';
import { Link } from 'react-router-dom';

export default function MoviesPage() {
  return (
    <div>
      <h1>Movies</h1>
      <MediaGrid items={moviesData} />
      <Link to="/" className="big-button">Back to Home</Link>
    </div>
  );
}