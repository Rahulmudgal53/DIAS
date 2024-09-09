import React, { useEffect, useState } from 'react';
import BookCard from './BookCard'; 

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    // Fetch books from the public route (no auth token required)
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
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">Error: {error}</div>;
  }

  return (
    <div className="container mt-50"> 
      <div className="row" >
        {books.map((book) => (
          <div className="col-md-3 mb-4" key={book._id}> 
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
