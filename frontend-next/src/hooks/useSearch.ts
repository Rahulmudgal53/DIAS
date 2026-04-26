import { useState, useCallback } from 'react';
import { bookService, Book } from '@/services/bookService';

export function useSearch() {
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string, filters?: { genre?: string; minPrice?: number; maxPrice?: number }) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const allBooks = await bookService.getAllBooks();

      let filtered = allBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.description.toLowerCase().includes(query.toLowerCase()) ||
          book.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
      );

      if (filters?.genre) {
        filtered = filtered.filter((book) => book.genre === filters.genre);
      }

      if (filters?.minPrice !== undefined) {
        filtered = filtered.filter((book) => book.price >= filters.minPrice!);
      }

      if (filters?.maxPrice !== undefined) {
        filtered = filtered.filter((book) => book.price <= filters.maxPrice!);
      }

      setResults(filtered);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return { results, loading, error, search, clearResults };
}
