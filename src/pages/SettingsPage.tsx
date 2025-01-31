import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';

export const SettingsPage: React.FC = () => {
  return (
    <PageLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 dark:from-sky-300 dark:via-indigo-300 dark:to-purple-300">
            Settings
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-200 max-w-2xl mx-auto font-medium">
            Customize your Vid Highlights experience
          </p>
        </div>

        {/* Settings Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-white/95 dark:bg-gray-800/95 rounded-2xl shadow-lg border border-gray-100/20 dark:border-gray-700/20"></div>
          <div className="relative p-8">
            {/* Settings content goes here */}
            <div className="space-y-6">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600 dark:from-sky-400 dark:to-indigo-400 mb-4">
                  Account Settings
                </h2>
                {/* Add your settings form or content here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};