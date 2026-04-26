'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useBooks } from '@/hooks/useBooks';
import { purchaseService } from '@/services/purchaseService';
import ProtectedRoute from '@/components/ProtectedRoute';
import BookCard from '@/components/BookCard';
import { showToast } from '@/utils/toast';
import styles from '@/styles/authordashboard.module.css';

export default function AuthorDashboard() {
  const { role } = useAuth();
  const { books, fetchBooks } = useBooks();
  const [stats, setStats] = useState({ totalSales: 0, revenue: 0, totalBooks: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchBooks();
        const salesData = await purchaseService.getAuthorSales();
        setStats({
          totalSales: salesData.totalSales || 0,
          revenue: salesData.revenue || 0,
          totalBooks: salesData.totalBooks || 0,
        });
      } catch (err) {
        showToast('Failed to load dashboard', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchBooks]);

  if (loading) return <div className={styles.loading}>Loading dashboard...</div>;

  return (
    <ProtectedRoute allowedRoles={['author']}>
      <div className={styles.container}>
        <h1>Author Dashboard</h1>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>Total Books</h3>
            <p className={styles.statValue}>{stats.totalBooks}</p>
          </div>
          <div className={styles.statCard}>
            <h3>Total Sales</h3>
            <p className={styles.statValue}>{stats.totalSales}</p>
          </div>
          <div className={styles.statCard}>
            <h3>Revenue</h3>
            <p className={styles.statValue}>${stats.revenue.toFixed(2)}</p>
          </div>
        </div>

        <div className={styles.booksSection}>
          <h2>Your Books</h2>
          {books.length > 0 ? (
            <div className={styles.grid}>
              {books.map((book) => (
                <BookCard key={book._id} book={book} isAuthor={true} />
              ))}
            </div>
          ) : (
            <p className={styles.empty}>No books published yet</p>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
