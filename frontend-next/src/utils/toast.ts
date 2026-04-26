export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
}

let toastId = 0;
const listeners: Set<(toast: Toast) => void> = new Set();
const activeToasts: Map<string, NodeJS.Timeout> = new Map();

export const showToast = (message: string, type: ToastType = 'info', duration: number = 3000) => {
  const id = `toast-${++toastId}`;
  const toast: Toast = { id, message, type, duration };

  listeners.forEach((listener) => listener(toast));

  if (duration > 0) {
    const timeout = setTimeout(() => {
      removeToast(id);
    }, duration);
    activeToasts.set(id, timeout);
  }

  return id;
};

export const removeToast = (id: string) => {
  const timeout = activeToasts.get(id);
  if (timeout) {
    clearTimeout(timeout);
    activeToasts.delete(id);
  }
};

export const onToast = (listener: (toast: Toast) => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
