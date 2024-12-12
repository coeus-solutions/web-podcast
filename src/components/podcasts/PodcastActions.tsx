import React from 'react';
import { Share2, Download } from 'lucide-react';
import { PodcastActionsProps } from './types';

export const PodcastActions: React.FC<PodcastActionsProps> = ({ podcast }) => {
  return (
    <div className="flex space-x-2">
      <button 
        className="p-2 text-gray-400 hover:text-gray-500"
        onClick={() => {/* Handle share */}}
      >
        <Share2 className="h-5 w-5" />
      </button>
      <button 
        className="p-2 text-gray-400 hover:text-gray-500"
        onClick={() => {/* Handle download */}}
      >
        <Download className="h-5 w-5" />
      </button>
    </div>
  );
};