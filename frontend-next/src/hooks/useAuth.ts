import { useState, useCallback } from 'react';
import { authService, RegisterPayload, LoginPayload } from '@/services/authService';
import { useAuth as useAuthContext } from '@/context/AuthContext';

export function useAuthHook() {
  const { setRole, setToken, logout } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = useCallback(
    async (data: RegisterPayload) => {
      setLoading(true);
      setError(null);
      try {
        const response = await authService.register(data);
        setToken(response.authToken);
        setRole(data.role);
        return response;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Registration failed';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [setRole, setToken]
  );

  const login = useCallback(
    async (data: LoginPayload, role: 'reader' | 'author') => {
      setLoading(true);
      setError(null);
      try {
        const response = await authService.login(data);
        setToken(response.authToken);
        setRole(role);
        return response;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Login failed';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [setRole, setToken]
  );

  const handleLogout = useCallback(() => {
    logout();
    setError(null);
  }, [logout]);

  return {
    register,
    login,
    logout: handleLogout,
    loading,
    error,
    clearError: () => setError(null),
  };
}
