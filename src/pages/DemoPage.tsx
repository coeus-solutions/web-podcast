import React from 'react';
import { DemoPlayer } from '../components/demo/DemoPlayer';
import { DemoFeatures } from '../components/demo/DemoFeatures';

export const DemoPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white text-center">
          Try PodcastAI in Action
        </h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 text-center max-w-3xl mx-auto">
          Experience how PodcastAI transforms your podcast content with our interactive demo
        </p>
        <DemoPlayer />
        <DemoFeatures />
      </div>
    </div>
  );
};