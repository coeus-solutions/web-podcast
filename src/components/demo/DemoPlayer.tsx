import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

export const DemoPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="max-w-4xl mx-auto mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Sample Podcast Episode
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">03:45 / 15:00</span>
        </div>

        <div className="relative w-full h-24 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
          <div 
            className="absolute left-0 top-0 h-full bg-indigo-500 bg-opacity-20 dark:bg-opacity-40"
            style={{ width: '25%' }}
          />
        </div>

        <div className="flex items-center justify-center space-x-6">
          <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
            <SkipBack className="w-6 h-6" />
          </button>
          <button 
            className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8" />
            )}
          </button>
          <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
            <SkipForward className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};