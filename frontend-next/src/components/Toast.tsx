'use client';

import React from 'react';
import { Toast as ToastType } from '@/utils/toast';
import styles from '@/styles/toast.module.css';

interface ToastProps {
  toast: ToastType;
  onRemove: (id: string) => void;
}

export default function Toast({ toast, onRemove }: ToastProps) {
  React.useEffect(() => {
    if (toast.duration > 0) {
      const timeout = setTimeout(() => onRemove(toast.id), toast.duration);
      return () => clearTimeout(timeout);
    }
  }, [toast, onRemove]);

  return (
    <div className={`${styles.toast} ${styles[toast.type]}`}>
      <p>{toast.message}</p>
      <button
        className={styles.closeBtn}
        onClick={() => onRemove(toast.id)}
        aria-label="Close toast"
      >
        ✕
      </button>
    </div>
  );
}
