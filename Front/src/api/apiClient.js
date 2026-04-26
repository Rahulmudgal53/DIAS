// API Client with automatic auth token handling
const API_BASE_URL = 'http://localhost:5000/api';

const getAuthToken = () => localStorage.getItem('auth-token');

export const apiCall = async (endpoint, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add auth token if it exists
  const token = getAuthToken();
  if (token) {
    headers['auth-token'] = token;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API Error');
  }

  return data;
};

// Auth endpoints
export const auth = {
  login: (email, password) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  register: (username, email, password, role) =>
    apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password, role }),
    }),
  getUser: () => apiCall('/auth/getUser', { method: 'POST' }),
};

// Book endpoints
export const books = {
  addBook: (bookData) =>
    apiCall('/book/addbook', {
      method: 'POST',
      body: JSON.stringify(bookData),
    }),
  fetchUserBooks: () =>
    apiCall('/book/fetchbooks', { method: 'GET' }),
  fetchAllBooks: () =>
    apiCall('/book/fetchallbooks', { method: 'GET' }),
  updateBook: (id, bookData) =>
    apiCall(`/book/updateBook/${id}`, {
      method: 'PUT',
      body: JSON.stringify(bookData),
    }),
  deleteBook: (id) =>
    apiCall(`/book/deleteBook/${id}`, {
      method: 'DELETE',
    }),
};
