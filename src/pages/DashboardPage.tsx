import React, { useEffect } from 'react';
import { PodcastList } from '../components/dashboard/PodcastList';
import { UploadSection } from '../components/dashboard/UploadSection';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { PageLayout } from '../components/layout/PageLayout';
import { useAuthContext } from '../contexts/AuthContext';

const LoadingStats = () => (
  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
    {[...Array(4)].map((_, index) => (
      <div 
        key={index} 
        className="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg p-8 animate-pulse border border-gray-100 dark:border-gray-700"
      >
        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg w-24 mb-3"></div>
        <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg w-16"></div>
      </div>
    ))}
  </div>
);

const LoadingUploadSection = () => (
  <div className="mt-8">
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg p-8 animate-pulse border border-gray-100 dark:border-gray-700">
        <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg w-32 mb-4"></div>
        <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg mb-4"></div>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-12 bg-gray-50/80 dark:bg-gray-900/80">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-full mb-4"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg w-48 mb-2"></div>
            <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg w-24"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const LoadingPodcastList = () => (
  <div className="mt-8">
    <div className="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="p-6 border-b border-gray-200 dark:border-gray-700 last:border-0 animate-pulse">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <div className="h-5 w-5 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg"></div>
              <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg w-48"></div>
            </div>
            <div className="h-5 w-5 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg"></div>
          </div>
          <div className="flex space-x-4 ml-8">
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg w-24"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg w-32"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const DashboardPage: React.FC = () => {
  const { refreshUser } = useAuthContext();

  useEffect(() => {
    // Fetch latest user information when dashboard loads
    refreshUser().catch(console.error);
  }, [refreshUser]);

  return (
    <PageLayout>
      <div className="space-y-12">
        {/* Stats Section with enhanced styling */}
        <div className="relative">
          <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg border border-gray-100/20 dark:border-gray-700/20"></div>
          <div className="relative p-8">
            <DashboardStats />
          </div>
        </div>

        {/* Upload Section with glass morphism */}
        <div className="relative">
          <div className="absolute inset-0 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg border border-gray-100/20 dark:border-gray-700/20"></div>
          <div className="relative p-8">
            <UploadSection />
          </div>
        </div>

        {/* Video List Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-white/95 dark:bg-gray-800/95 rounded-2xl shadow-lg border border-gray-100/20 dark:border-gray-700/20"></div>
          <div className="relative p-8">
            <PodcastList />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};