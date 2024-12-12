import { useState, useCallback } from 'react';
import { auth } from '../services/api';
import { User } from '../types/api';
import axios from 'axios';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => {
    // Try to get user from localStorage on initial load
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const newUser = await auth.signup(email, password);
      setUser(newUser);
      return newUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during signup');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await auth.login(email, password);
      
      // After successful login, fetch user data
      const userResponse = await axios.get('http://localhost:8000/api/v1/auth/me', {
        headers: {
          Authorization: `Bearer ${response.access_token}`,
        },
      });

      const userData = userResponse.data;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    auth.logout();
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const updateUser = useCallback((userData: Partial<User>) => {
    setUser(prev => {
      if (!prev) return null;
      const updatedUser = { ...prev, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  }, []);

  return {
    user,
    loading,
    error,
    signup,
    login,
    logout,
    updateUser,
  };
};