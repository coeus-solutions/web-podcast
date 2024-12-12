import React from 'react';
import { FeaturesList } from './FeaturesList';

export const FeaturesSection: React.FC = () => {
  return (
    <div className="py-12 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">
            Features
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Everything you need for your podcast
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
            Streamline your podcast workflow with our comprehensive suite of AI-powered tools.
          </p>
        </div>
        <div className="mt-10">
          <FeaturesList />
        </div>
      </div>
    </div>
  );
};