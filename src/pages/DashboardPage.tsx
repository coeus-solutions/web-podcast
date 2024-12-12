import React from 'react';
import { PodcastList } from '../components/dashboard/PodcastList';
import { UploadSection } from '../components/dashboard/UploadSection';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { usePodcasts } from '../hooks/usePodcasts';

const LoadingStats = () => (
  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
    {[...Array(4)].map((_, index) => (
      <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-3"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
      </div>
    ))}
  </div>
);

const LoadingUploadSection = () => (
  <div className="mt-8">
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 animate-pulse">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const LoadingPodcastList = () => (
  <div className="mt-8">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="p-4 border-b border-gray-200 dark:border-gray-700 last:border-0 animate-pulse">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
            </div>
            <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="flex space-x-4 ml-8">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const DashboardPage: React.FC = () => {

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DashboardStats />
        <UploadSection />
        <PodcastList />
      </div>
    </div>
  );
};