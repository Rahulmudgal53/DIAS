'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import SearchBar from '@/components/SearchBar';
import BookCard from '@/components/BookCard';
import BookDetails from '@/components/BookDetails';
import { useSearch } from '@/hooks/useSearch';
import { Book } from '@/services/bookService';
import styles from '@/styles/explore.module.css';

export default function ExplorePage() {
  const { role } = useAuth();
  const { results, search, clearResults } = useSearch();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [currentFilters, setCurrentFilters] = useState({});

  const handleSearch = (query: string) => {
    search(query, currentFilters);
  };

  const handleFilterChange = (filters: any) => {
    setCurrentFilters(filters);
    // Re-search with new filters if there's a current search
  };

  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <h1>Explore Books</h1>
        <SearchBar onSearch={handleSearch} onFilterChange={handleFilterChange} />

        <div className={styles.grid}>
          {results.length > 0 ? (
            results.map((book) => (
              <div
                key={book._id}
                className={styles.bookWrapper}
                onClick={() => setSelectedBook(book)}
              >
                <BookCard book={book} />
              </div>
            ))
          ) : (
            <p className={styles.empty}>No books found. Try a different search.</p>
          )}
        </div>

        {selectedBook && (
          <BookDetails
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}
