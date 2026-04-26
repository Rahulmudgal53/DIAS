import api from '@/utils/api';

export interface Book {
  _id: string;
  title: string;
  cover: string;
  description: string;
  genre: string;
  price: number;
  tags: string[];
  status: string;
  author: string;
}

export interface CreateBookPayload {
  cover: string;
  title: string;
  description: string;
  genre: string;
  price: number;
  tags: string[];
  status?: string;
}

export const bookService = {
  fetchBooks: async (): Promise<Book[]> => {
    const response = await api.get('/api/book/fetchbooks');
    return response.data;
  },

  getAllBooks: async (): Promise<Book[]> => {
    const response = await api.get('/api/book/fetchallbooks');
    return response.data;
  },

  addBook: async (data: CreateBookPayload): Promise<Book> => {
    const response = await api.post('/api/book/addbook', data);
    return response.data;
  },

  updateBook: async (id: string, data: Partial<CreateBookPayload>): Promise<Book> => {
    const response = await api.put(`/api/book/updateBook/${id}`, data);
    return response.data;
  },

  deleteBook: async (id: string): Promise<void> => {
    await api.delete(`/api/book/deleteBook/${id}`);
  },
};
