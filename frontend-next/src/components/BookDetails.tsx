'use client';

import React, { useState, useEffect } from 'react';
import { Book } from '@/services/bookService';
import { Review, reviewService } from '@/services/reviewService';
import { wishlistService } from '@/services/wishlistService';
import { showToast } from '@/utils/toast';
import styles from '@/styles/bookdetails.module.css';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

interface BookDetailsProps {
  book: Book;
  onClose: () => void;
  onPurchase?: (book: Book) => void;
}

export default function BookDetails({ book, onClose, onPurchase }: BookDetailsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reviewsData, ratingData, wishlistStatus] = await Promise.all([
          reviewService.getBookReviews(book._id),
          reviewService.getAverageRating(book._id),
          wishlistService.isInWishlist(book._id),
        ]);

        setReviews(reviewsData);
        setAverageRating(ratingData.average || 0);
        setIsInWishlist(wishlistStatus);
      } catch (err) {
        console.error('Error fetching book details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [book._id]);

  const handleWishlistToggle = async () => {
    try {
      if (isInWishlist) {
        await wishlistService.removeFromWishlist(book._id);
        setIsInWishlist(false);
        showToast('Removed from wishlist', 'info');
      } else {
        await wishlistService.addToWishlist(book._id);
        setIsInWishlist(true);
        showToast('Added to wishlist', 'success');
      }
    } catch (err) {
      showToast('Failed to update wishlist', 'error');
    }
  };

  const handleReviewAdded = (newReview: Review) => {
    setReviews([newReview, ...reviews]);
    showToast('Review added successfully', 'success');
  };

  return (
    <div className={styles.modal}>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.content}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        <div className={styles.body}>
          <img src={book.cover} alt={book.title} className={styles.cover} />

          <div className={styles.info}>
            <h2>{book.title}</h2>
            <p className={styles.genre}>{book.genre}</p>

            <div className={styles.rating}>
              <span className={styles.stars}>
                {'⭐'.repeat(Math.round(averageRating))}
              </span>
              <span>{averageRating.toFixed(1)} ({reviews.length} reviews)</span>
            </div>

            <p className={styles.description}>{book.description}</p>

            <div className={styles.tags}>
              {book.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>

            <div className={styles.footer}>
              <span className={styles.price}>${book.price}</span>
              <div className={styles.actions}>
                {onPurchase && (
                  <button className={styles.buyBtn} onClick={() => onPurchase(book)}>
                    Buy Now
                  </button>
                )}
                <button
                  className={`${styles.wishlistBtn} ${isInWishlist ? styles.active : ''}`}
                  onClick={handleWishlistToggle}
                  title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  ♥
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.reviews}>
          <h3>Reviews</h3>
          <ReviewForm bookId={book._id} onReviewAdded={handleReviewAdded} />
          {loading ? <p>Loading reviews...</p> : <ReviewList reviews={reviews} />}
        </div>
      </div>
    </div>
  );
}
