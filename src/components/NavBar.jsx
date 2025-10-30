import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

export default function NavBar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        📝 MediaTracker
      </Link>

      <div className="navbar-links">
        <Link
          to="/movies"
          className={location.pathname === "/movies" ? "active" : ""}
        >
          Movies
        </Link>
        <Link
          to="/books"
          className={location.pathname === "/books" ? "active" : ""}
        >
          Books
        </Link>
        <Link
          to="/albums"
          className={location.pathname === "/albums" ? "active" : ""}
        >
          Albums
        </Link>
        <Link 
          to="/favorites" 
          className={location.pathname === "/favorites" ? "active" : ""}
          >
            Favs
        </Link>
      </div>
    </nav>
  );
}