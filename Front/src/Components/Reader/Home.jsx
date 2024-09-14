import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';
import './Home.css'; 
import { Outlet } from 'react-router-dom';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/book/fetchallbooks');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setBooks(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <>      
    
      <div className="home-container">
      <div className="book-grid">
        {books.map((book) => (
          <div className="book-item" key={book._id}> 
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </div>
      
    </>
  );
};

export default Home;
