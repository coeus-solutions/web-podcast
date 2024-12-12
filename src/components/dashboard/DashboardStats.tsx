import React from 'react';
import { FileAudio, Clock } from 'lucide-react';

const stats = [
  { name: 'Total Podcasts', value: '12', icon: FileAudio },
  { name: 'Processing Time', value: '1.2h', icon: Clock },
];

export const DashboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 mt-8">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="relative bg-white dark:bg-gray-800 pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
        >
          <dt>
            <div className="absolute bg-indigo-500 rounded-md p-3">
              <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p className="ml-16 text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              {stat.name}
            </p>
          </dt>
          <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {stat.value}
            </p>
          </dd>
        </div>
      ))}
    </div>
  );
};