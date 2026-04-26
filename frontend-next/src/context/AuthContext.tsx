'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookie from 'js-cookie';

type UserRole = 'reader' | 'author' | '';

interface AuthContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>('');
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage and cookies
    const storedRole = localStorage.getItem('user-role') as UserRole;
    const storedToken = Cookie.get('auth-token');

    if (storedRole) setRole(storedRole);
    if (storedToken) setToken(storedToken);

    setIsLoading(false);
  }, []);

  const handleSetRole = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole) {
      localStorage.setItem('user-role', newRole);
    } else {
      localStorage.removeItem('user-role');
    }
  };

  const handleSetToken = (newToken: string | null) => {
    setToken(newToken);
    if (newToken) {
      Cookie.set('auth-token', newToken, { expires: 1 });
    } else {
      Cookie.remove('auth-token');
    }
  };

  const logout = () => {
    handleSetRole('');
    handleSetToken(null);
    localStorage.removeItem('user-role');
    Cookie.remove('auth-token');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        role,
        setRole: handleSetRole,
        token,
        setToken: handleSetToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
