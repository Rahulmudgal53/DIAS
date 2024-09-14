import React from 'react';
import './BookCard.css'; 

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <img
        src={book.cover}
        className="book-card-img"
        alt={book.title}
      />
      <div className="book-card-body">
        <h5 className="book-card-title">{book.title}</h5>
        <p className="book-card-description">{book.description.slice(0, 75)}...</p> 
        <p className="book-card-price">
          <small>Price: ${book.price}</small>
        </p>
        <div className="book-card-buttons">
          <a href="#" className="book-card-btn book-card-btn-primary">View Details</a> 
          <a href="#" className="book-card-btn book-card-btn-secondary">Buy Now</a> 
        </div>
      </div>
    </div>
  );
};

export default BookCard;
