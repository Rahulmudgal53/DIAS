import api from '@/utils/api';
import { Book } from './bookService';

export interface WishlistItem {
  _id: string;
  userId: string;
  bookId: Book;
  addedAt: string;
}

export const wishlistService = {
  getWishlist: async (): Promise<WishlistItem[]> => {
    const response = await api.get('/api/wishlist');
    return response.data;
  },

  addToWishlist: async (bookId: string): Promise<WishlistItem> => {
    const response = await api.post('/api/wishlist/add', { bookId });
    return response.data;
  },

  removeFromWishlist: async (bookId: string): Promise<void> => {
    await api.delete(`/api/wishlist/${bookId}`);
  },

  isInWishlist: async (bookId: string): Promise<boolean> => {
    try {
      const response = await api.get(`/api/wishlist/check/${bookId}`);
      return response.data.inWishlist;
    } catch {
      return false;
    }
  },
};
