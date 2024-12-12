import React from 'react';
import { Brain } from 'lucide-react';

const keyPoints = [
  {
    time: '00:15',
    point: 'Introduction to AI in business',
  },
  {
    time: '01:30',
    point: 'Key benefits of AI implementation',
  },
  {
    time: '02:45',
    point: 'Common challenges and solutions',
  },
];

export const DemoKeyPoints: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Key Points
        </h3>
      </div>
      <div className="space-y-4">
        {keyPoints.map((point, index) => (
          <div 
            key={index}
            className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
          >
            <span className="text-sm text-indigo-600 dark:text-indigo-400 whitespace-nowrap">
              {point.time}
            </span>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {point.point}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};