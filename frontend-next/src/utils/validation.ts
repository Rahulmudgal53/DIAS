export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < 5) {
    errors.push('Password must be at least 5 characters');
  }
  if (password.length > 16) {
    errors.push('Password must not exceed 16 characters');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const validateUsername = (username: string): { valid: boolean; message: string } => {
  if (username.length < 3) {
    return { valid: false, message: 'Username must be at least 3 characters' };
  }
  if (username.length > 30) {
    return { valid: false, message: 'Username must not exceed 30 characters' };
  }

  return { valid: true, message: '' };
};

export const validateBook = (book: any): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!book.title || book.title.trim().length < 3) {
    errors.push('Title must be at least 3 characters');
  }

  if (!book.cover || !isValidUrl(book.cover)) {
    errors.push('Valid cover URL is required');
  }

  if (!book.description || book.description.trim().length < 10) {
    errors.push('Description must be at least 10 characters');
  }

  if (!book.genre || book.genre.trim().length === 0) {
    errors.push('Genre is required');
  }

  if (!book.price || parseFloat(book.price) < 0) {
    errors.push('Price must be a positive number');
  }

  return { valid: errors.length === 0, errors };
};

export const validateReview = (rating: number, comment: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (rating < 1 || rating > 5) {
    errors.push('Rating must be between 1 and 5');
  }

  if (!comment || comment.trim().length < 5) {
    errors.push('Comment must be at least 5 characters');
  }

  if (comment.length > 500) {
    errors.push('Comment must not exceed 500 characters');
  }

  return { valid: errors.length === 0, errors };
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
