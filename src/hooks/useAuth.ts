import { useState, useCallback } from 'react';
import { auth, api } from '../services/api';
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

  const signup = useCallback(async (email: string, password: string, name: string, confirmPassword: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Get signup response
      const response = await auth.signup(email, password, name, confirmPassword);
      
      // Login immediately after signup to get the token
      const loginResponse = await auth.login(email, password);
      localStorage.setItem('token', loginResponse.access_token);
      
      // Fetch user data
      const userResponse = await api.get('/auth/me');
      const userData = userResponse.data;
      
      // Store user data
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, user: userData };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during signup');
      return { success: false, user: null };
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await auth.login(email, password);
      
      // After successful login, fetch user data using api instead of auth
      const userResponse = await api.get('/auth/me', {
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

  const refreshUser = useCallback(async () => {
    try {
      const userData = await auth.getCurrentUser();
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to refresh user data';
      setError(message);
      throw error;
    }
  }, []);

  return {
    user,
    loading,
    error,
    signup,
    login,
    logout,
    updateUser,
    refreshUser
  };
};