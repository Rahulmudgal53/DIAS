'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { purchaseService, Purchase } from '@/services/purchaseService';
import ProtectedRoute from '@/components/ProtectedRoute';
import { showToast } from '@/utils/toast';
import styles from '@/styles/purchases.module.css';

export default function PurchasesPage() {
  const { role } = useAuth();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const data = await purchaseService.getPurchaseHistory();
        setPurchases(data);
      } catch (err) {
        showToast('Failed to load purchase history', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  const handleDownload = async (purchaseId: string) => {
    try {
      const { downloadUrl } = await purchaseService.downloadBook(purchaseId);
      // Open download link
      window.open(downloadUrl, '_blank');
      showToast('Download started', 'success');
    } catch (err) {
      showToast('Failed to download book', 'error');
    }
  };

  if (loading) return <div className={styles.loading}>Loading purchase history...</div>;

  return (
    <ProtectedRoute allowedRoles={['reader']}>
      <div className={styles.container}>
        <h1>Purchase History</h1>

        {purchases.length > 0 ? (
          <div className={styles.table}>
            <div className={styles.header}>
              <div className={styles.cell}>Book</div>
              <div className={styles.cell}>Price</div>
              <div className={styles.cell}>Date</div>
              <div className={styles.cell}>Action</div>
            </div>

            {purchases.map((purchase) => (
              <div key={purchase._id} className={styles.row}>
                <div className={styles.cell}>
                  <span className={styles.title}>{purchase.bookDetails?.title}</span>
                </div>
                <div className={styles.cell}>${purchase.price}</div>
                <div className={styles.cell}>
                  {new Date(purchase.purchaseDate).toLocaleDateString()}
                </div>
                <div className={styles.cell}>
                  <button
                    className={styles.downloadBtn}
                    onClick={() => handleDownload(purchase._id)}
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p>No purchases yet</p>
            <p className={styles.subtext}>
              Explore and purchase books to see them here
            </p>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
