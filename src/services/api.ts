import axios, { AxiosError } from 'axios';
import { User, LoginResponse, Podcast, ShareResponse, ApiError } from '../types/api';

const BASE_URL = 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle API errors
const handleError = (error: AxiosError<ApiError>) => {
  if (error.response?.data) {
    throw new Error(error.response.data.detail);
  }
  throw error;
};

export const auth = {
  async signup(email: string, password: string): Promise<User> {
    try {
      const response = await api.post<User>('/auth/signup', { email, password });
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError<ApiError>);
    }
  },

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);

      const response = await api.post<LoginResponse>('/auth/token', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      localStorage.setItem('token', response.data.access_token);
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError<ApiError>);
    }
  },

  logout() {
    localStorage.removeItem('token');
  },
};

export const podcasts = {
  async upload(title: string, file: File): Promise<Podcast> {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('file', file);

      const response = await api.post<Podcast>('/podcasts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError<ApiError>);
    }
  },

  async getAll(): Promise<Podcast[]> {
    try {
      const response = await api.get<Podcast[]>('/podcasts');
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError<ApiError>);
    }
  },

  async getById(id: number): Promise<Podcast> {
    try {
      const response = await api.get<Podcast>(`/podcasts/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError<ApiError>);
    }
  },

  async delete(id: number): Promise<void> {
    try {
      await api.delete(`/podcasts/${id}`);
    } catch (error) {
      return handleError(error as AxiosError<ApiError>);
    }
  },

  async shareKeyPointOnFacebook(keyPointId: number): Promise<ShareResponse> {
    try {
      const response = await api.get<ShareResponse>(`/podcasts/key-points/${keyPointId}/share/facebook`);
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError<ApiError>);
    }
  },
}; 