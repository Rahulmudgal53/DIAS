// import React, { useEffect, useState } from 'react';
// import BookCard from './BookCard';
// import { books } from '../../api/apiClient';
// import './Home.css'; 
// import { Outlet } from 'react-router-dom';

// const Home = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true); 
//   const [error, setError] = useState(null); 

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const data = await books.fetchAllBooks();
//         setBooks(data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching books:", err);
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchBooks();
//   }, []);

//   if (loading) {
//     return <div className="loading">Loading...</div>;
//   }

//   if (error) {
//     return <div className="error">Error: {error}</div>;
//   }

//   return (
//     <>      
    
//       <div className="home-container">
//       <div className="book-grid">
//         {books.map((book) => (
//           <div className="book-item" key={book._id}> 
//             <BookCard book={book} />
//           </div>
//         ))}
//       </div>
//     </div>
      
//     </>
//   );
// };

// export default Home;


import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import { books as booksAPI } from "../../api/apiClient"; // 🔥 renamed import
import "./Home.css";

const Home = () => {
  const [books, setBooks] = useState([]); // state stays 'books'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await booksAPI.fetchAllBooks(); // ✅ fixed
        setBooks(data);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="home-container">
      <div className="book-grid">
        {books.map((book) => (
          <div className="book-item" key={book._id}>
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;