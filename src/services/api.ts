import axios, { AxiosError } from 'axios';
import { User, LoginResponse, Podcast, ShareResponse, ApiError } from '../types/api';
import { toast } from '../components/common/Toast';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'ngrok-skip-browser-warning': 'true'
  }
});

// Add request interceptor to attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Clear local storage
      localStorage.clear();
      
      // Show toast message
      toast.error('Your session has expired. Please login again.');
      
      // Redirect to login after a short delay to ensure toast is visible
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
    }
    return Promise.reject(error);
  }
);

// Handle API errors
const handleError = (error: AxiosError<ApiError>) => {
  if (error.response?.data) {
    throw new Error(error.response.data.detail);
  }
  throw error;
};

export const auth = {
  signup: async (email: string, password: string, name: string, confirmPassword: string) => {
    console.log('Signing up with email:', email, 'and password:', password);
    const response = await api.post('/auth/signup', { email, password, name, confirmPassword });
    return response.data;
  },  

  requestPasswordReset: async (email: string) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError<ApiError>);
    }
  },

  verifyOTP: async (email: string, otp: string) => {
    try {
      const response = await api.post('/auth/verify-otp', { email, otp });
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError<ApiError>);
    }
  },

  resetPassword: async (email: string, otp: string, new_password: string) => {
    try {
      const response = await api.post('/auth/reset-password', { 
        email, 
        otp, 
        new_password 
      });
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError<ApiError>);
    }
  },

  login: async (email: string, password: string) => {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);

    const response = await api.post('/auth/token', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Store the token after successful login
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }

    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await api.get<User>('/auth/me');
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError<ApiError>);
    }
  }
};

export const podcasts = {
  async upload(title: string, file: File, onProgress?: (progress: number) => void): Promise<Podcast> {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('file', file);

      const response = await api.post<Podcast>('/podcasts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total && onProgress) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(percentCompleted);
          }
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

export const payments = {
  async createCheckoutSession(tokenAmount: number): Promise<{ checkout_url: string }> {
    try {
      const response = await api.post<{ checkout_url: string }>('/payments/create-checkout', {
        token_amount: tokenAmount
      });
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError<ApiError>);
    }
  }
};

export const tokens = {
  async getBalance(): Promise<{ available_tokens: number }> {
    try {
      const response = await api.get<{ available_tokens: number }>('/tokens/balance');
      return response.data;
    } catch (error) {
      return handleError(error as AxiosError<ApiError>);
    }
  }
}; 