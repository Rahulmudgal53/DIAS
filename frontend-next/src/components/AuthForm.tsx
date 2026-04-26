'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthHook } from '@/hooks/useAuth';
import styles from '@/styles/authform.module.css';

type AuthMode = 'login' | 'register';
type UserRole = 'reader' | 'author';

export default function AuthForm() {
  const router = useRouter();
  const { register, login, loading, error, clearError } = useAuthHook();
  const [mode, setMode] = useState<AuthMode>('login');
  const [role, setRole] = useState<UserRole>('reader');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError();

    try {
      if (mode === 'register') {
        await register({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role,
        });
        router.push(role === 'author' ? '/addbook' : '/home');
      } else {
        await login(
          {
            email: formData.email,
            password: formData.password,
          },
          role
        );
        router.push(role === 'author' ? '/addbook' : '/home');
      }
    } catch (err) {
      console.error('Auth error:', err);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>{mode === 'login' ? 'Login' : 'Register'}</h1>

        <div className={styles.roleSelector}>
          <label>
            <input
              type="radio"
              value="reader"
              checked={role === 'reader'}
              onChange={(e) => setRole(e.target.value as UserRole)}
            />
            Reader
          </label>
          <label>
            <input
              type="radio"
              value="author"
              checked={role === 'author'}
              onChange={(e) => setRole(e.target.value as UserRole)}
            />
            Author
          </label>
        </div>

        {mode === 'register' && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
          className={styles.input}
        />

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? 'Loading...' : mode === 'login' ? 'Login' : 'Register'}
        </button>

        <p className={styles.toggle}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className={styles.toggleLink}
          >
            {mode === 'login' ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </div>
  );
}
