import React, { useEffect, useState, useRef } from 'react';
import { Play, Download, ChevronDown, ChevronUp, Square, Share2, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePodcasts } from '../../hooks/usePodcasts';
import { KeyPoint } from '../../types/api';

const LoadingPodcastCard = () => (
  <div className="bg-white dark:bg-gray-800 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 animate-pulse">
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4"></div>
        <div className="flex items-center space-x-2">
          <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-24"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-32"></div>
      </div>
    </div>
  </div>
);

export const PodcastList: React.FC = () => {
  const { podcasts, loading, error, fetchPodcasts, deletePodcast } = usePodcasts();
  const [expandedPodcastId, setExpandedPodcastId] = useState<number | null>(null);
  const [playingKeyPoint, setPlayingKeyPoint] = useState<number | null>(null);
  const [podcastToDelete, setPodcastToDelete] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    fetchPodcasts();
  }, [fetchPodcasts]);

  const handlePodcastClick = (podcastId: number) => {
    setExpandedPodcastId((prevId) => prevId === podcastId ? null : podcastId);
  };

  const handlePlayKeyPoint = (keyPoint: KeyPoint) => {
    if (playingKeyPoint === keyPoint.id) {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      setPlayingKeyPoint(null);
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      setPlayingKeyPoint(keyPoint.id);
    }
  };

  const handleShareOnFacebook = (podcast: any, keyPoint: KeyPoint) => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(`Check out this key point from "${podcast.title}": ${keyPoint.content}`)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleDeleteClick = (e: React.MouseEvent, podcastId: number) => {
    e.stopPropagation();
    setPodcastToDelete(podcastId);
  };

  const handleConfirmDelete = async () => {
    if (podcastToDelete) {
      try {
        await deletePodcast(podcastToDelete);
        setPodcastToDelete(null);
        if (expandedPodcastId === podcastToDelete) {
          setExpandedPodcastId(null);
        }
        if (videoRef.current) {
          videoRef.current.pause();
          setPlayingKeyPoint(null);
        }
        const updatedPodcasts = podcasts.filter(podcast => podcast.id !== podcastToDelete);
        podcasts.splice(0, podcasts.length, ...updatedPodcasts);
      } catch (error) {
        console.error('Error deleting podcast:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex-1 p-6 ml-64">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <LoadingPodcastCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-6 ml-64">
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-white dark:bg-gray-800 backdrop-blur-sm rounded-xl shadow-lg border border-red-200 dark:border-red-800">
          <div className="text-red-500 text-lg mb-4">
            {error}
          </div>
          <button
            onClick={() => fetchPodcasts()}
            className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (podcasts.length === 0) {
    return (
      <div className="flex-1 p-6 ml-64">
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-white dark:bg-gray-800 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="text-gray-500 dark:text-gray-400 text-lg mb-4">
            No podcasts uploaded yet
          </div>
          <Link
            to="/app/dashboard"
            className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            Upload Your First Podcast
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 ml-64">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 auto-rows-auto">
        {podcasts.map((podcast) => (
          <div 
            key={podcast.id}
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-800 h-fit"
          >
            <div 
              className="p-6 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handlePodcastClick(podcast.id);
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate flex-1 mr-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {podcast.title}
                </h2>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <button
                    className="p-2 text-red-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                    onClick={(e) => handleDeleteClick(e, podcast.id)}
                    title="Delete Podcast"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <a 
                    href={podcast.file_path} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
                    download
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Download className="h-5 w-5" />
                  </a>
                  {expandedPodcastId === podcast.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors" />
                  )}
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
                  Key Points: {podcast.key_points.length}
                </span>
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                  {new Date(podcast.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
            {expandedPodcastId === podcast.id && podcast.key_points.length > 0 && (
              <div className="border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                <div className="p-6">
                  <video
                    ref={videoRef}
                    src={podcast.file_path}
                    className="w-full rounded-lg mb-4"
                    controls
                  />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Key Points</h3>
                  <div className="space-y-4">
                  {podcast.key_points.map((keyPoint) => (
                    <div 
                      key={keyPoint.id}
                      className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-900 dark:text-white flex-1 mr-4">{keyPoint.content}</p>
                        <div className="flex items-center gap-2">
                          <button 
                            className="p-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShareOnFacebook(podcast, keyPoint);
                            }}
                            title="Share on Facebook"
                          >
                            <Share2 className="h-4 w-4" />
                          </button>
                          <button 
                            className="p-2 text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
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
                      </div>
                      <div className="mt-4">
                        <video
                          src={keyPoint.file_path}
                          className="w-full rounded-lg"
                          controls
                        />
                      </div>
                      <div className="mt-2 flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700">
                          {Math.floor(keyPoint.start_time / 60)}:
                          {(keyPoint.start_time % 60).toString().padStart(2, '0')}
                        </span>
                        <span>to</span>
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700">
                          {Math.floor(keyPoint.end_time / 60)}:
                          {(keyPoint.end_time % 60).toString().padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {podcastToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Delete Podcast
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this podcast? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                onClick={() => setPodcastToDelete(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};