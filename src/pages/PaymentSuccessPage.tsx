import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PaymentSuccessPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard after 5 seconds
    const timeout = setTimeout(() => {
      navigate('/app/dashboard');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
        <div className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 dark:text-green-400" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            Payment Successful!
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Thank you for your purchase. Your tokens will be added to your account in a couple of minutes.
          </p>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            You will be redirected to the dashboard in a few seconds...
          </p>
          <button
            onClick={() => navigate('/app/dashboard')}
            className="mt-6 w-full py-2 px-4 rounded-lg text-white font-medium bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}; 