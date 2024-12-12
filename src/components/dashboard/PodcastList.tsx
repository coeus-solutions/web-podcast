import React, { useEffect, useState, useRef } from 'react';
import { Play, Download, ChevronDown, ChevronUp, Square } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePodcasts } from '../../hooks/usePodcasts';
import { Podcast, KeyPoint } from '../../types/api';

const LoadingPodcastItem = () => (
  <div className="animate-pulse flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
    <div className="flex items-center space-x-3">
      <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
    </div>
    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
  </div>
);

export const PodcastList: React.FC = () => {
  const { podcasts, loading, error, fetchPodcasts } = usePodcasts();
  const [expandedPodcast, setExpandedPodcast] = useState<number | null>(null);
  const [playingKeyPoint, setPlayingKeyPoint] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetchPodcasts();
  }, [fetchPodcasts]);

  const handlePodcastClick = (podcastId: number) => {
    setExpandedPodcast(expandedPodcast === podcastId ? null : podcastId);
  };

  const handlePlayKeyPoint = (keyPoint: KeyPoint) => {
    if (playingKeyPoint === keyPoint.id) {
      // Stop playing
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setPlayingKeyPoint(null);
    } else {
      // Stop previous audio if playing
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      // Play new audio
      const audio = new Audio(keyPoint.file_path);
      audioRef.current = audio;
      audio.play();
      setPlayingKeyPoint(keyPoint.id);
      
      // Reset state when audio finishes playing
      audio.onended = () => {
        setPlayingKeyPoint(null);
      };
    }
  };


  if (error) {
    return (
      <div className="mt-8">
        <div className="text-center text-red-500">
          {error}
        </div>
      </div>
    );
  }

  if (podcasts.length === 0 && !loading) {
    return (
      <div className="mt-8">
        <div className="text-center text-gray-500 dark:text-gray-400">
          No podcasts uploaded yet
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Your Podcasts
      </h2>
      
      {loading ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          {[...Array(3)].map((_, index) => (
            <LoadingPodcastItem key={index} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {podcasts.map((podcast) => (
              <li key={podcast.id}>
                <div 
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 cursor-pointer"
                  onClick={() => handlePodcastClick(podcast.id)}
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {expandedPodcast === podcast.id ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                        <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                          {podcast.title}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <a 
                          href={podcast.file_path} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 text-gray-400 hover:text-gray-500"
                          download
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Download className="h-5 w-5" />
                        </a>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          Key Points: {podcast.key_points.length}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0 sm:ml-6">
                          Uploaded: {new Date(podcast.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  {expandedPodcast === podcast.id && podcast.key_points.length > 0 && (
                    <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-4 sm:px-6 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Key Points</h3>
                      <div className="space-y-3">
                        {podcast.key_points.map((keyPoint) => (
                          <div 
                            key={keyPoint.id}
                            className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm"
                          >
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-gray-900 dark:text-white">{keyPoint.content}</p>
                              <button 
                                className="p-1 text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePlayKeyPoint(keyPoint);
                                }}
                              >
                                {playingKeyPoint === keyPoint.id ? (
                                  <Square className="h-4 w-4" />
                                ) : (
                                  <Play className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                              {Math.floor(keyPoint.start_time / 60)}:
                              {(keyPoint.start_time % 60).toString().padStart(2, '0')} - {' '}
                              {Math.floor(keyPoint.end_time / 60)}:
                              {(keyPoint.end_time % 60).toString().padStart(2, '0')}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};