import React, { useState } from 'react';
import { Play, Pause, Share2, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { PodcastItemProps } from './types';
import { StatusBadge } from './StatusBadge';
import { KeyPoints } from './KeyPoints';
import { DeleteConfirmModal } from './DeleteConfirmModal';

export const PodcastItem: React.FC<PodcastItemProps> = ({ podcast, onDelete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    setShowDeleteModal(false);
    onDelete(podcast.id);
  };

  return (
    <>
      <li className="hover:bg-gray-50 dark:hover:bg-gray-750">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </button>
              <div className="ml-2">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {podcast.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Duration: {podcast.duration}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <StatusBadge status={podcast.status} />
              <button
                onClick={() => setShowDeleteModal(true)}
                className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                title="Delete podcast"
              >
                <Trash2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          {isExpanded && (
            <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
              <KeyPoints podcast={podcast} />
            </div>
          )}
        </div>
      </li>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        podcastTitle={podcast.title}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  );
};