import api from '@/utils/api';

export interface UserProfile {
  _id: string;
  username: string;
  email: string;
  role: 'reader' | 'author';
  profileImage?: string;
  bio?: string;
  createdAt: string;
  stats?: {
    totalBooks?: number;
    totalPurchases?: number;
    totalReviews?: number;
  };
}

export interface UpdateProfilePayload {
  username?: string;
  bio?: string;
  profileImage?: string;
}

export const userService = {
  getProfile: async (): Promise<UserProfile> => {
    const response = await api.get('/api/auth/profile');
    return response.data;
  },

  updateProfile: async (data: UpdateProfilePayload): Promise<UserProfile> => {
    const response = await api.put('/api/auth/updateProfile', data);
    return response.data;
  },

  getUserStats: async (): Promise<any> => {
    const response = await api.get('/api/auth/stats');
    return response.data;
  },
};
