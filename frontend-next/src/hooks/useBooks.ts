import { useState, useCallback } from 'react';
import { bookService, Book, CreateBookPayload } from '@/services/bookService';

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookService.fetchBooks();
      setBooks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch books');
    } finally {
      setLoading(false);
    }
  }, []);

  const getAllBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookService.getAllBooks();
      setBooks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch books');
    } finally {
      setLoading(false);
    }
  }, []);

  const addBook = useCallback(async (bookData: CreateBookPayload) => {
    setLoading(true);
    setError(null);
    try {
      const newBook = await bookService.addBook(bookData);
      setBooks((prev) => [...prev, newBook]);
      return newBook;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add book');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateBook = useCallback(
    async (id: string, bookData: Partial<CreateBookPayload>) => {
      setLoading(true);
      setError(null);
      try {
        const updatedBook = await bookService.updateBook(id, bookData);
        setBooks((prev) =>
          prev.map((book) => (book._id === id ? updatedBook : book))
        );
        return updatedBook;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update book');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteBook = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await bookService.deleteBook(id);
      setBooks((prev) => prev.filter((book) => book._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete book');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { books, loading, error, fetchBooks, getAllBooks, addBook, updateBook, deleteBook };
}
