'use client';

import React from 'react';
import { Book } from '@/services/bookService';
import styles from '@/styles/bookcard.module.css';

interface BookCardProps {
  book: Book;
  onEdit?: (book: Book) => void;
  onDelete?: (id: string) => void;
  isAuthor?: boolean;
}

export default function BookCard({
  book,
  onEdit,
  onDelete,
  isAuthor = false,
}: BookCardProps) {
  return (
    <div className={styles.card}>
      <img src={book.cover} alt={book.title} className={styles.cover} />
      <div className={styles.content}>
        <h3 className={styles.title}>{book.title}</h3>
        <p className={styles.author}>{book.genre}</p>
        <p className={styles.description}>{book.description}</p>
        <div className={styles.tags}>
          {book.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <p className={styles.price}>${book.price}</p>
        {isAuthor && (
          <div className={styles.actions}>
            {onEdit && (
              <button
                onClick={() => onEdit(book)}
                className={styles.editBtn}
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(book._id)}
                className={styles.deleteBtn}
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
