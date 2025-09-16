import React from 'react';

export default function MediaCard({ item }) {
  return (
    <div className="media-card">
      <img src={item.posterUrl} alt={item.title} />
      <div className="media-info">
        <h3>{item.title}</h3>
        <p>{item.year}</p>
        <p>Watched: {item.dateWatched}</p>
      </div>
    </div>
  );
}