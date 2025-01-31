import React, { useState } from 'react';
import { X } from 'lucide-react';
import { payments } from '../../services/api';
import { toast } from '../../components/common/Toast';

interface PurchaseTokenModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PurchaseTokenModal: React.FC<PurchaseTokenModalProps> = ({ isOpen, onClose }) => {
  const [tokenAmount, setTokenAmount] = useState<string>('1000');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    const amount = parseInt(tokenAmount);
    
    // Validation
    if (isNaN(amount) || amount < 1000) {
      setError('Minimum token purchase is 1000 tokens');
      return;
    }

    if (!Number.isInteger(amount)) {
      setError('Token amount must be a whole number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Get the base URL from the current window location
      const baseUrl = window.location.origin;
      const successUrl = `${baseUrl}/payment/success`;
      
      const { checkout_url } = await payments.createCheckoutSession(amount);
      window.location.href = checkout_url;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to initiate purchase. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const cost = (parseInt(tokenAmount) || 0) * 0.0001;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Purchase Tokens
        </h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="tokenAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Number of Tokens
            </label>
            <input
              type="number"
              id="tokenAmount"
              min="1000"
              step="1"
              value={tokenAmount}
              onChange={(e) => setTokenAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-white"
              placeholder="Minimum 1000 tokens"
            />
            {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Cost: ${cost.toFixed(2)} USD
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Rate: $0.0001 per token
            </p>
          </div>

          <button
            onClick={handlePurchase}
            disabled={loading}
            className={`
              w-full py-2 px-4 rounded-lg text-white font-medium
              ${loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600'}
            `}
          >
            {loading ? 'Processing...' : 'Purchase Tokens'}
          </button>
        </div>
      </div>
    </div>
  );
}; 