'use client';

import React, { useState } from 'react';
import styles from '@/styles/searchbar.module.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterChange?: (filters: any) => void;
}

export default function SearchBar({ onSearch, onFilterChange }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    genre: '',
    minPrice: '',
    maxPrice: '',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange({
        genre: newFilters.genre || undefined,
        minPrice: newFilters.minPrice ? parseFloat(newFilters.minPrice) : undefined,
        maxPrice: newFilters.maxPrice ? parseFloat(newFilters.maxPrice) : undefined,
      });
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books, authors, tags..."
          className={styles.input}
        />
        <button type="submit" className={styles.searchBtn}>
          🔍
        </button>
        <button
          type="button"
          className={styles.filterBtn}
          onClick={() => setShowFilters(!showFilters)}
        >
          ⚙️ Filters
        </button>
      </form>

      {showFilters && (
        <div className={styles.filters}>
          <select
            value={filters.genre}
            onChange={(e) => handleFilterChange('genre', e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">All Genres</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Mystery">Mystery</option>
            <option value="Romance">Romance</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Fantasy">Fantasy</option>
          </select>

          <input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            className={styles.filterInput}
            min="0"
          />

          <input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            className={styles.filterInput}
            min="0"
          />
        </div>
      )}
    </div>
  );
}
