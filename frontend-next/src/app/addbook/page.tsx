'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useBooks } from '@/hooks/useBooks';
import ProtectedRoute from '@/components/ProtectedRoute';
import styles from '@/styles/addbook.module.css';

export default function AddBook() {
  const router = useRouter();
  const { role } = useAuth();
  const { addBook, loading, error } = useBooks();

  const [formData, setFormData] = useState({
    cover: '',
    title: '',
    description: '',
    genre: '',
    price: '',
    tags: '',
    status: 'available',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addBook({
        cover: formData.cover,
        title: formData.title,
        description: formData.description,
        genre: formData.genre,
        price: parseFloat(formData.price),
        tags: formData.tags.split(',').map((tag) => tag.trim()),
        status: formData.status,
      });

      router.push('/dashboard');
    } catch (err) {
      console.error('Error adding book:', err);
    }
  };

  return (
    <ProtectedRoute allowedRoles={['author']}>
      <div className={styles.container}>
        <h1>Add New Book</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="url"
            name="cover"
            placeholder="Cover Image URL"
            value={formData.cover}
            onChange={handleInputChange}
            required
            className={styles.input}
          />

          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className={styles.input}
          />

          <textarea
            name="description"
            placeholder="Book Description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className={styles.textarea}
            rows={4}
          />

          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={formData.genre}
            onChange={handleInputChange}
            required
            className={styles.input}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            required
            step="0.01"
            className={styles.input}
          />

          <input
            type="text"
            name="tags"
            placeholder="Tags (comma-separated)"
            value={formData.tags}
            onChange={handleInputChange}
            className={styles.input}
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className={styles.select}
          >
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? 'Adding...' : 'Add Book'}
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
