import React from 'react';
import { Share2 } from 'lucide-react';

const clips = [
  {
    title: 'AI Benefits Overview',
    duration: '0:45',
    shares: 128,
  },
  {
    title: 'Implementation Strategy',
    duration: '1:15',
    shares: 89,
  },
  {
    title: 'Success Stories',
    duration: '0:55',
    shares: 245,
  },
];

export const DemoClips: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Share2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Shareable Clips
        </h3>
      </div>
      <div className="space-y-4">
        {clips.map((clip, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
          >
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                {clip.title}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Duration: {clip.duration}
              </p>
            </div>
            <button className="flex items-center space-x-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
              <Share2 className="w-4 h-4" />
              <span className="text-xs">{clip.shares}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};