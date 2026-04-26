'use client';

import React from 'react';
import { useToast } from '@/hooks/useToast';
import Toast from './Toast';
import styles from '@/styles/toastcontainer.module.css';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className={styles.container}>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
}
