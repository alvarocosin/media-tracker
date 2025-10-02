import React from 'react';

export default function MediaCard({ item }) {
  return (
    <div className="media-card">
      <img src={item.posterUrl} alt={item.title} />
      <div className="media-info">
        {/* Top: title */}
        <h3>{item.title}</h3>

        {/* Bottom: director, year, date */}
        <div className="bottom-info">
          <p className="director">{item.director}</p>
          <p className="meta">{item.year}</p>
          <p className="watched">Watched: {item.dateWatched}</p>
        </div>
      </div>
    </div>
  );
}