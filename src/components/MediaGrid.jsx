import React from 'react';
import MediaCard from './MediaCard';

export default function MediaGrid({ items }) {
  if (!items || items.length === 0) {
    return <p>No movies found.</p>;
  }

  return (
    <div className="media-grid">
      {items.map((item, index) => (
        <MediaCard key={index} item={item} />
      ))}
    </div>
  );
}