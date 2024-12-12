import React from 'react';
import { Play, Share2 } from 'lucide-react';
import { KeyPointsProps } from './types';

const mockKeyPoints = [
  { id: 1, timestamp: '02:15', text: 'Introduction to the main topic', duration: '00:30' },
  { id: 2, timestamp: '05:45', text: 'Key insights and analysis', duration: '00:45' },
  { id: 3, timestamp: '12:30', text: 'Important conclusions', duration: '00:35' },
];

export const KeyPoints: React.FC<KeyPointsProps> = ({ podcast }) => {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
        Key Points ({mockKeyPoints.length})
      </h4>
      <div className="space-y-2">
        {mockKeyPoints.map((point) => (
          <div
            key={point.id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-750 rounded-md"
          >
            <div className="flex items-center space-x-3">
              <button className="p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <Play className="h-4 w-4" />
              </button>
              <div>
                <p className="text-sm text-gray-900 dark:text-white">{point.text}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {point.timestamp} • {point.duration}
                </p>
              </div>
            </div>
            <button className="p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};