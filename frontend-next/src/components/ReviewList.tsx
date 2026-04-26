'use client';

import React from 'react';
import { Review } from '@/services/reviewService';
import styles from '@/styles/reviewlist.module.css';

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return <p className={styles.empty}>No reviews yet. Be the first to review!</p>;
  }

  return (
    <div className={styles.list}>
      {reviews.map((review) => (
        <div key={review._id} className={styles.review}>
          <div className={styles.header}>
            <strong>{review.userName || 'Anonymous'}</strong>
            <span className={styles.rating}>
              {Array(review.rating).fill('⭐').join('')}
            </span>
          </div>
          <p className={styles.date}>
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
          <p className={styles.comment}>{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
