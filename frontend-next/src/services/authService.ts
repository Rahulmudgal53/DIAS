import api from '@/utils/api';

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  role: 'reader' | 'author';
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  authToken: string;
}

export const authService = {
  register: async (data: RegisterPayload): Promise<AuthResponse> => {
    const response = await api.post('/api/auth/register', data);
    return response.data;
  },

  login: async (data: LoginPayload): Promise<AuthResponse> => {
    const response = await api.post('/api/auth/login', data);
    return response.data;
  },
};
