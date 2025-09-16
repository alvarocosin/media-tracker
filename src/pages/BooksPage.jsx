import React from 'react';
import { Link } from 'react-router-dom';

export default function BooksPage() { 
    return (
        <div>
          <h1>Books</h1>
          <Link to="/" className="big-button">Back to Home</Link>
        </div>
    );
 }
