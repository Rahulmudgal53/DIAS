import { useState, useEffect } from 'react';
import { Toast, onToast, removeToast } from '@/utils/toast';

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const unsubscribe = onToast((toast) => {
      setToasts((prev) => [...prev, toast]);
    });

    return unsubscribe;
  }, []);

  const removeToastHandler = (id: string) => {
    removeToast(id);
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, removeToast: removeToastHandler };
}
