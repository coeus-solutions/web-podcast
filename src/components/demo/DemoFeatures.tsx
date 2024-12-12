import React from 'react';
import { FileText, Brain, Share2 } from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'Live Transcription',
    description: 'Get real-time transcription of your podcast audio with high accuracy.',
  },
  {
    icon: Brain,
    title: 'AI Key Points',
    description: 'Automatically extract and highlight the most important points from your content.',
  },
  {
    icon: Share2,
    title: 'Easy Sharing',
    description: 'Create and share clips of your best moments with just a few clicks.',
  },
];

export const DemoFeatures: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feature) => (
        <div key={feature.title} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <feature.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {feature.title}
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
};