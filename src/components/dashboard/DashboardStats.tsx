import React, { useState } from 'react';
import { FileAudio, Coins, LucideIcon } from 'lucide-react';
import { PurchaseTokenModal } from '../tokens/PurchaseTokenModal';
import { useAuthContext } from '../../contexts/AuthContext';

interface StatItem {
  name: string;
  value: string;
  icon: LucideIcon;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const DashboardStats: React.FC<{ totalVideos: number }> = ({ totalVideos }) => {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const { user } = useAuthContext();

  // Calculate available tokens with default values
  const totalTokens = user?.total_tokens ?? 0;
  const usedTokens = user?.used_tokens ?? 0;
  const availableTokens = totalTokens - usedTokens;

  const stats: StatItem[] = [
    {
      name: 'Total Videos',
      value: totalVideos.toString(),
      icon: FileAudio
    },
    {
      name: 'Available Tokens',
      value: availableTokens.toLocaleString(),
      icon: Coins,
      action: {
        label: 'Buy More',
        onClick: () => setIsPurchaseModalOpen(true)
      }
    }
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 mt-1">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative bg-white dark:bg-gray-800 pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              <div className="absolute bg-indigo-500 rounded-md p-3">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                {stat.name}
              </p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {stat.value}
              </p>
              {stat.action && (
                <div className="ml-auto">
                  <button
                    onClick={stat.action.onClick}
                    className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-md text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/50 hover:bg-indigo-100 dark:hover:bg-indigo-900"
                  >
                    {stat.action.label}
                  </button>
                </div>
              )}
            </dd>
          </div>
        ))}
      </div>

      <PurchaseTokenModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
      />
    </>
  );
};