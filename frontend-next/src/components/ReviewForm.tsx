'use client';

import React, { useState } from 'react';
import { reviewService } from '@/services/reviewService';
import { validateReview } from '@/utils/validation';
import { showToast } from '@/utils/toast';
import styles from '@/styles/reviewform.module.css';

interface ReviewFormProps {
  bookId: string;
  onReviewAdded: (review: any) => void;
}

export default function ReviewForm({ bookId, onReviewAdded }: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    const validation = validateReview(rating, comment);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);

    try {
      const review = await reviewService.createReview({
        bookId,
        rating,
        comment,
      });

      onReviewAdded(review);
      setRating(5);
      setComment('');
    } catch (err) {
      showToast('Failed to add review', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label>Rating</label>
        <div className={styles.ratingInput}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`${styles.star} ${rating >= star ? styles.filled : ''}`}
              onClick={() => setRating(star)}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className={styles.field}>
        <label>Your Review</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts about this book..."
          className={styles.textarea}
          rows={4}
        />
      </div>

      {errors.length > 0 && (
        <ul className={styles.errors}>
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      )}

      <button type="submit" disabled={loading} className={styles.submitBtn}>
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}
