import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthInput } from '../components/auth/AuthInput';
import { AuthButton } from '../components/auth/AuthButton';
import { auth } from '../services/api';
import { toast } from '../components/common/Toast';
import { useAuthContext } from '../contexts/AuthContext';

type Step = 'email' | 'otp' | 'password';

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const [currentStep, setCurrentStep] = useState<Step>('email');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await auth.requestPasswordReset(email);
      toast.success('If the email exists, you will receive a password reset OTP');
      setCurrentStep('otp');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await auth.verifyOTP(email, otp);
      setCurrentStep('password');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await auth.resetPassword(email, otp, newPassword);
      toast.success('Password reset successfully');
      
      // Auto login with new credentials
      const success = await login(email, newPassword);
      if (success) {
        navigate('/app/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {currentStep === 'email' && 'Reset your password'}
            {currentStep === 'otp' && 'Enter verification code'}
            {currentStep === 'password' && 'Set new password'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {currentStep === 'email' && 'Enter your email to receive a verification code'}
            {currentStep === 'otp' && 'Enter the 6-digit code sent to your email'}
            {currentStep === 'password' && 'Enter your new password'}
          </p>
        </div>

        {error && (
          <div className="text-red-600 dark:text-red-400 text-center">{error}</div>
        )}

        {currentStep === 'email' && (
          <form className="mt-8 space-y-6" onSubmit={handleRequestOTP}>
            <AuthInput
              id="email"
              label="Email address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <AuthButton type="submit" loading={loading}>
              Send verification code
            </AuthButton>
          </form>
        )}

        {currentStep === 'otp' && (
          <form className="mt-8 space-y-6" onSubmit={handleVerifyOTP}>
            <AuthInput
              id="otp"
              label="Verification code"
              type="text"
              pattern="[0-9]*"
              maxLength={6}
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            />
            <AuthButton type="submit" loading={loading}>
              Verify code
            </AuthButton>
          </form>
        )}

        {currentStep === 'password' && (
          <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
            <AuthInput
              id="new-password"
              label="New password"
              type="password"
              required
              minLength={6}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Password must be at least 6 characters long
            </p>
            <AuthButton type="submit" loading={loading}>
              Reset password
            </AuthButton>
          </form>
        )}

        <div className="text-center">
          <button
            onClick={() => navigate('/login')}
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            Back to login
          </button>
        </div>
      </div>
    </div>
  );
}; 