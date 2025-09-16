import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import MoviesPage from './pages/MoviesPage.jsx';
import BooksPage from './pages/BooksPage.jsx';
import AlbumsPage from './pages/AlbumsPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/books" element={<BooksPage />} />
      <Route path="/albums" element={<AlbumsPage />} />
    </Routes>
  );
}