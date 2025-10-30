// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar.jsx';
import Home from './pages/Home.jsx';
import MoviesPage from './pages/MoviesPage.jsx';
import BooksPage from './pages/BooksPage.jsx';
import AlbumsPage from './pages/AlbumsPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';

export default function App() {
  return (
    <>
      <NavBar />

      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/albums" element={<AlbumsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>
    </>
  );
}