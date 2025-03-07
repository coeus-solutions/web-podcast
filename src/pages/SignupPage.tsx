import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthInput } from '../components/auth/AuthInput';
import { AuthButton } from '../components/auth/AuthButton';
import { SignupFormData } from '../types/auth';
import { Sparkles, UserPlus, Mail, Lock, KeyRound } from 'lucide-react';
import { useAuthContext } from '../contexts/AuthContext';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup, loading: authLoading } = useAuthContext();
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (formData.password !== formData.confirmPassword) {
      setValidationError("Passwords don't match");
      return;
    }

    try {
      const { success, user } = await signup(
        formData.email,
        formData.password,
        formData.name,
        formData.confirmPassword
      );
      
      if (success && user) {
        navigate('/app/dashboard');
      }
    } catch (err: any) {
      console.error('Signup failed:', err);
      setValidationError(err.response?.data?.detail || 'An error occurred during signup');
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
              Create Account
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
                <UserPlus className="absolute left-3 top-[38px] h-5 w-5 text-indigo-400 pointer-events-none z-10" />
                <AuthInput
                  id="name"
                  label="Full name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-10 bg-white"
                />
              </div>

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

              <div className="relative">
                <KeyRound className="absolute left-3 top-[38px] h-5 w-5 text-indigo-400 pointer-events-none z-10" />
                <AuthInput
                  id="confirmPassword"
                  label="Confirm password"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="pl-10 bg-white"
                />
              </div>
            </div>

            <div className="text-sm text-center text-gray-600">
              By creating an account, you agree to our{' '}
              <Link
                to="/terms"
                className="text-indigo-600 hover:text-indigo-500"
              >
                Terms & Conditions
              </Link>{' '}
              and{' '}
              <Link
                to="/privacy"
                className="text-indigo-600 hover:text-indigo-500"
              >
                Privacy Policy
              </Link>
            </div>

            <div>
              <AuthButton
                type="submit"
                loading={authLoading}
                className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-indigo-500/20"
              >
                Create account
              </AuthButton>
            </div>

            <div className="text-center">
              <span className="text-gray-600">Already have an account? </span>
              <Link
                to="/login"
                className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 transition-all duration-200"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};