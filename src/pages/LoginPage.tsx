import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthInput } from '../components/auth/AuthInput';
import { AuthButton } from '../components/auth/AuthButton';
import { Sparkles, Mail, Lock } from 'lucide-react';
import { useAuthContext } from '../contexts/AuthContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, loading: authLoading } = useAuthContext();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError(null);

    try {
      const response = await login(formData.email, formData.password);
      if (response) {
        navigate('/app/dashboard');
      }
    } catch (err: any) {
      console.error('Login failed:', err);
      setValidationError(err.response?.data?.detail || 'An error occurred during login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-md w-full space-y-8 relative">
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-xl opacity-20" />
        <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-xl opacity-20" />
        
        {/* Main content */}
        <div className="relative bg-white/70 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <Sparkles className="h-8 w-8 text-indigo-500" />
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-500">
              Welcome Back
            </h2>
          </div>

          {validationError && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-100">
              <p className="text-red-500 text-sm text-center">
                {validationError}
              </p>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div className="relative">
                <Mail className="absolute left-3 top-[38px] h-5 w-5 text-indigo-400 pointer-events-none z-10" />
                <AuthInput
                  id="email"
                  label="Email address"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 bg-white"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-[38px] h-5 w-5 text-indigo-400 pointer-events-none z-10" />
                <AuthInput
                  id="password"
                  label="Password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 bg-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 transition-all duration-200"
              >
                Forgot your password?
              </Link>
            </div>

            <div>
              <AuthButton
                type="submit"
                loading={authLoading}
                className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-indigo-500/20"
              >
                Sign in
              </AuthButton>
            </div>

            <div className="text-center">
              <span className="text-gray-600">Don't have an account? </span>
              <Link
                to="/signup"
                className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 transition-all duration-200"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};