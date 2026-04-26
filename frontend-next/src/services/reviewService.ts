import api from '@/utils/api';

export interface Review {
  _id: string;
  bookId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  userName?: string;
}

export interface CreateReviewPayload {
  bookId: string;
  rating: number;
  comment: string;
}

export const reviewService = {
  getBookReviews: async (bookId: string): Promise<Review[]> => {
    const response = await api.get(`/api/reviews/book/${bookId}`);
    return response.data;
  },

  createReview: async (data: CreateReviewPayload): Promise<Review> => {
    const response = await api.post('/api/reviews/create', data);
    return response.data;
  },

  updateReview: async (reviewId: string, data: Partial<CreateReviewPayload>): Promise<Review> => {
    const response = await api.put(`/api/reviews/${reviewId}`, data);
    return response.data;
  },

  deleteReview: async (reviewId: string): Promise<void> => {
    await api.delete(`/api/reviews/${reviewId}`);
  },

  getAverageRating: async (bookId: string): Promise<{ average: number; count: number }> => {
    const response = await api.get(`/api/reviews/rating/${bookId}`);
    return response.data;
  },
};
