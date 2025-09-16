import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-page">
      <h1>Welcome to Media Tracker</h1>
      <div className="buttons-container">
        <Link to="/movies" className="big-button">Movies</Link>
        <Link to="/books" className="big-button">Books</Link>
        <Link to="/albums" className="big-button">Albums</Link>
      </div>
    </div>
  );
}

