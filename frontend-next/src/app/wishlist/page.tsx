'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { wishlistService } from '@/services/wishlistService';
import ProtectedRoute from '@/components/ProtectedRoute';
import BookCard from '@/components/BookCard';
import BookDetails from '@/components/BookDetails';
import { WishlistItem } from '@/services/wishlistService';
import { Book } from '@/services/bookService';
import { showToast } from '@/utils/toast';
import styles from '@/styles/wishlist.module.css';

export default function WishlistPage() {
  const { role } = useAuth();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await wishlistService.getWishlist();
        setWishlist(data);
      } catch (err) {
        showToast('Failed to load wishlist', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemove = async (bookId: string) => {
    try {
      await wishlistService.removeFromWishlist(bookId);
      setWishlist((prev) => prev.filter((item) => item.bookId._id !== bookId));
      showToast('Removed from wishlist', 'info');
    } catch (err) {
      showToast('Failed to remove from wishlist', 'error');
    }
  };

  if (loading) return <div className={styles.loading}>Loading wishlist...</div>;

  return (
    <ProtectedRoute allowedRoles={['reader']}>
      <div className={styles.container}>
        <h1>My Wishlist</h1>

        {wishlist.length > 0 ? (
          <div className={styles.grid}>
            {wishlist.map((item) => (
              <div
                key={item._id}
                className={styles.bookWrapper}
                onClick={() => setSelectedBook(item.bookId)}
              >
                <BookCard
                  book={item.bookId}
                  onDelete={() => handleRemove(item.bookId._id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p>Your wishlist is empty</p>
            <p className={styles.subtext}>
              Add books to your wishlist to keep track of titles you'd like to read
            </p>
          </div>
        )}

        {selectedBook && (
          <BookDetails book={selectedBook} onClose={() => setSelectedBook(null)} />
        )}
      </div>
    </ProtectedRoute>
  );
}
