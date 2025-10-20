import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-container">
      <Link to="/movies" className="home-button">
        <img src="/images/movies.png" alt="Movies" />
        <span>Movies</span>
      </Link>
      <Link to="/books" className="home-button">
        <img src="/images/books.png" alt="Movies" />
        <span>Books</span>
      </Link>
      <Link to="/albums" className="home-button">
        <img src="/images/albums.png" alt="Movies" />
        <span>Albums</span>
      </Link>
    </div>
  );
}

