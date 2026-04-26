import api from '@/utils/api';

export interface Purchase {
  _id: string;
  bookId: string;
  userId: string;
  price: number;
  purchaseDate: string;
  downloadUrl?: string;
  bookDetails?: {
    title: string;
    cover: string;
    author: string;
  };
}

export interface CreatePurchasePayload {
  bookId: string;
  price: number;
}

export const purchaseService = {
  getPurchaseHistory: async (): Promise<Purchase[]> => {
    const response = await api.get('/api/purchases/history');
    return response.data;
  },

  createPurchase: async (data: CreatePurchasePayload): Promise<Purchase> => {
    const response = await api.post('/api/purchases/buy', data);
    return response.data;
  },

  downloadBook: async (purchaseId: string): Promise<{ downloadUrl: string }> => {
    const response = await api.get(`/api/purchases/download/${purchaseId}`);
    return response.data;
  },

  getAuthorSales: async (): Promise<any> => {
    const response = await api.get('/api/purchases/sales');
    return response.data;
  },
};
