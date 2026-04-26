'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useBooks } from '@/hooks/useBooks';
import ProtectedRoute from '@/components/ProtectedRoute';
import BookCard from '@/components/BookCard';
import styles from '@/styles/dashboard.module.css';

export default function Dashboard() {
  const { role } = useAuth();
  const { books, loading, error, fetchBooks, deleteBook } = useBooks();

  useEffect(() => {
    if (role === 'author') {
      fetchBooks();
    }
  }, [role, fetchBooks]);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id);
      } catch (err) {
        console.error('Error deleting book:', err);
      }
    }
  };

  return (
    <ProtectedRoute allowedRoles={['author']}>
      <div className={styles.container}>
        <h1>Your Books</h1>

        {error && <div className={styles.error}>{error}</div>}

        {loading ? (
          <div className={styles.loading}>Loading books...</div>
        ) : (
          <div className={styles.grid}>
            {books.length > 0 ? (
              books.map((book) => (
                <BookCard
                  key={book._id}
                  book={book}
                  onDelete={handleDelete}
                  isAuthor={true}
                />
              ))
            ) : (
              <p>No books yet. Start by adding a book!</p>
            )}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
