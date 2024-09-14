import React, { useState } from 'react';

const AddBook = () => {
  const [formData, setFormData] = useState({
    cover: '',
    title: '',
    description: '',
    genre: '',
    publishDate: '',
    price: '',
    tags: '',
    status: 'draft', // Default status is 'draft'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/book/addbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        alert('Book added successfully');
        setFormData({
          cover: '',
          title: '',
          description: '',
          genre: '',
          // publishDate: '',
          price: '',
          tags: '',
          status: 'draft',
        });
      } else {
        alert('Error adding book');
      }
    } catch (error) {
      console.log('Error:', error);
      alert('Error adding book');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="cover" className="form-label">Cover URL</label>
          <input
            type="text"
            className="form-control"
            id="cover"
            name="cover"
            value={formData.cover}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="genre" className="form-label">Genre</label>
          <input
            type="text"
            className="form-control"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          />
        </div>
        {/* <div className="mb-3">
          <label htmlFor="publishDate" className="form-label">Publish Date</label>
          <input
            type="date"
            className="form-control"
            id="publishDate"
            name="publishDate"
            value={formData.publishDate}
            onChange={handleChange}
            required
          />
        </div> */}
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">Tags (comma separated)</label>
          <input
            type="text"
            className="form-control"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="draft"
              name="status"
              value="draft"
              checked={formData.status === 'draft'}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="draft">
              Draft
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="publish"
              name="status"
              value="publish"
              checked={formData.status === 'publish'}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="publish">
              Publish
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
