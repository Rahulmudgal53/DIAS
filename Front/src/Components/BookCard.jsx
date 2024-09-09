import React from 'react';

const BookCard = ({ book }) => {
  return (
    <div className="card shadow-sm h-100" style={{width:"320px"}}>
      <img
        src={book.cover}
        className="card-img-top img-fluid"
        alt={book.title}
        style={{ height: '200px', objectFit: 'contain' }} // Small cover image
      />
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text" style={{height:'30px',width:'280px'}}>{book.description.slice(0, 100)}...</p> 
        <p className="card-text">
          <small className="text-muted">Price: ${book.price}</small>
        </p>
        <a href="#" className="btn btn-primary">View Details</a> 
        <a href="#" className="btn btn-secondary">Buy Now</a> 
      </div>
    </div>
  );
};

export default BookCard;
