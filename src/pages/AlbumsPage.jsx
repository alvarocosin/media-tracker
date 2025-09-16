import React from 'react';
import { Link } from 'react-router-dom';

export default function AlbumsPage() { 
    return (
        <div>
          <h1>Albums</h1>
          <Link to="/" className="big-button">Back to Home</Link>
        </div>
    );
 }