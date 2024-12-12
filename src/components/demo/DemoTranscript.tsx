import React from 'react';
import { FileText } from 'lucide-react';

const transcriptData = [
  { time: '00:00', text: 'Welcome to our podcast about artificial intelligence.' },
  { time: '00:15', text: 'Today, we\'ll be discussing the impact of AI on modern business.' },
  { time: '00:30', text: 'Let\'s start by looking at some recent developments in the field.' },
];

export const DemoTranscript: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Live Transcript
        </h3>
      </div>
      <div className="space-y-4">
        {transcriptData.map((item, index) => (
          <div key={index} className="flex space-x-3">
            <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
              {item.time}
            </span>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};