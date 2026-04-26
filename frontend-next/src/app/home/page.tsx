'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useBooks } from '@/hooks/useBooks';
import ProtectedRoute from '@/components/ProtectedRoute';
import BookCard from '@/components/BookCard';
import styles from '@/styles/home.module.css';

export default function Home() {
  const { role } = useAuth();
  const { books, loading, error, getAllBooks } = useBooks();

  useEffect(() => {
    if (role === 'reader') {
      getAllBooks();
    }
  }, [role, getAllBooks]);

  return (
    <ProtectedRoute allowedRoles={['reader']}>
      <div className={styles.container}>
        <h1>Available Books</h1>

        {error && <div className={styles.error}>{error}</div>}

        {loading ? (
          <div className={styles.loading}>Loading books...</div>
        ) : (
          <div className={styles.grid}>
            {books.length > 0 ? (
              books.map((book) => <BookCard key={book._id} book={book} />)
            ) : (
              <p>No books available</p>
            )}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
