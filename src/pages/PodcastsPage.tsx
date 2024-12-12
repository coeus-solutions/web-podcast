import React from 'react';
import { PodcastList } from '../components/podcasts/PodcastList';

export const PodcastsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Podcasts</h1>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Total Episodes: 12
          </span>
        </div>
        <PodcastList />
      </div>
    </div>
  );
};