import { useState, useCallback } from 'react';
import axios from 'axios';
import { User } from '../contexts/AuthContext';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => {
    // Try to get user from localStorage on initial load
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/token', {
        username: email,
        password: password,
      });
      
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);

      // Fetch user data after successful login
      const userResponse = await axios.get('http://localhost:8000/api/v1/auth/me', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const userData = userResponse.data;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    } catch (err) {
      setError('Invalid email or password');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem('token');
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
    login,
    logout,
    updateUser,
  };
}; 