import React, { useEffect, useState, useRef } from 'react';
import { Play, Download, ChevronDown, ChevronUp, Square, Share2, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePodcastContext } from '../../contexts/PodcastContext';
import { Podcast, KeyPoint } from '../../types/api';

const LoadingPodcastItem = () => (
  <div className="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg p-8 animate-pulse border border-gray-100 dark:border-gray-700">
    <div className="flex items-center justify-between mb-4">
      <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg w-3/4"></div>
      <div className="flex items-center space-x-2">
        <div className="h-5 w-5 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg"></div>
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg w-24"></div>
      <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg w-32"></div>
    </div>
  </div>
);

export const PodcastList: React.FC = () => {
  const { podcasts, loading, error, fetchPodcasts } = usePodcastContext();
  const [expandedPodcast, setExpandedPodcast] = useState<number | null>(null);
  const [playingKeyPoint, setPlayingKeyPoint] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Fetch podcasts only on mount
  useEffect(() => {
    const loadPodcasts = async () => {
      try {
        await fetchPodcasts();
      } catch (err) {
        console.error('Failed to fetch podcasts:', err);
      }
    };
    loadPodcasts();
  }, []); // Remove fetchPodcasts from dependencies

  // Add handleDownload function
  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  // Get 5 most recent podcasts
  const recentPodcasts = React.useMemo(() => {
    return [...podcasts]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5);
  }, [podcasts]);

  const handlePodcastClick = (podcastId: number) => {
    setExpandedPodcast(expandedPodcast === podcastId ? null : podcastId);
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

  const handleShareOnFacebook = (podcast: Podcast, keyPoint: KeyPoint) => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(`Check out this highlight from "${podcast.title}": ${keyPoint.content}`)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  if (error) {
    return (
      <div className="text-center text-red-500 dark:text-red-400 p-8 bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg border border-red-100 dark:border-red-900">
        <p className="text-lg font-medium mb-4">{error}</p>
        <button
          onClick={() => fetchPodcasts()}
          className="px-6 py-2 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (podcasts.length === 0 && !loading) {
    return (
      <div className="text-center p-8 bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">No videos uploaded yet</p>
        <Link
          to="/app/podcasts"
          className="px-6 py-2 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 inline-block"
        >
          Upload Your First Video
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with View All link */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600 dark:from-sky-400 dark:to-indigo-400">
          Recent Videos
        </h2>
        <Link
          to="/app/podcasts"
          className="flex items-center px-4 py-2 text-sm font-medium text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300 transition-colors group"
        >
          View All Videos
          <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Grid of recent videos */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 auto-rows-auto">
        {loading ? (
          [...Array(3)].map((_, index) => <LoadingPodcastItem key={index} />)
        ) : (
          recentPodcasts.map((podcast) => (
            <div 
              key={podcast.id}
              className="group relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-xl shadow-lg overflow-hidden border border-transparent hover:border-sky-200 dark:hover:border-sky-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-fit backdrop-blur-sm"
            >
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-400/0 via-indigo-400/0 to-purple-400/0 group-hover:from-sky-400/5 group-hover:via-indigo-400/5 group-hover:to-purple-400/5 dark:group-hover:from-sky-400/10 dark:group-hover:via-indigo-400/10 dark:group-hover:to-purple-400/10 transition-all duration-300"></div>
              
              <div className="p-6 cursor-pointer relative" onClick={() => handlePodcastClick(podcast.id)}>
                {/* Title and Actions */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 truncate flex-1 mr-4 group-hover:from-sky-600 group-hover:to-indigo-600 dark:group-hover:from-sky-300 dark:group-hover:to-indigo-300 transition-all duration-300">
                    {podcast.title}
                  </h2>
                  <div className="flex items-center space-x-1">
                    <a 
                      href={podcast.file_path} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 text-sky-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors rounded-lg hover:bg-sky-50 dark:hover:bg-sky-900/20"
                      download
                      onClick={(e) => e.stopPropagation()}
                      title="Download Video"
                    >
                      <Download className="h-5 w-5" />
                    </a>
                    <button 
                      className="p-2 text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                      title={expandedPodcast === podcast.id ? "Show Less" : "Show More"}
                    >
                      {expandedPodcast === podcast.id ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center text-sm space-x-4">
                  <span className="flex items-center px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-300">
                    <span className="w-2 h-2 bg-sky-400 rounded-full mr-2 animate-pulse"></span>
                    {podcast.key_points.length} Highlights
                  </span>
                  <span className="flex items-center px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300">
                    <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
                    {new Date(podcast.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedPodcast === podcast.id && podcast.key_points.length > 0 && (
                <div className="border-t border-gray-100 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                  <div className="p-6">
                    <video
                      ref={videoRef}
                      src={podcast.file_path}
                      className="w-full rounded-lg mb-4 shadow-lg"
                      controls
                    />
                    <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400 mb-4">
                      Video Highlights
                    </h3>
                    <div className="space-y-4">
                      {podcast.key_points.map((keyPoint) => (
                        <div 
                          key={keyPoint.id}
                          className="group/card bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 dark:border-gray-700 hover:border-sky-200 dark:hover:border-sky-800"
                        >
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-900 dark:text-white flex-1 mr-4">{keyPoint.content}</p>
                            <div className="flex items-center gap-2 pointer-events-auto z-10">
                              <a 
                                href={keyPoint.file_path}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleDownload(keyPoint.file_path, `${podcast.title}-clip-${keyPoint.id}.mp4`);
                                }}
                                className="p-2 text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 transition-colors rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/30 cursor-pointer inline-flex items-center"
                                title="Download Clip"
                              >
                                <Download className="h-4 w-4" />
                              </a>
                              <button 
                                className="p-2 text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                                onClick={(e) => {
                                  e.preventDefault();
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
                              className="w-full rounded-lg shadow-md"
                              controls
                            />
                          </div>
                          <div className="mt-2 flex items-center space-x-2 text-xs">
                            <span className="px-2 py-1 rounded-md bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-300">
                              {Math.floor(keyPoint.start_time / 60)}:
                              {(keyPoint.start_time % 60).toString().padStart(2, '0')}
                            </span>
                            <span className="text-gray-400">to</span>
                            <span className="px-2 py-1 rounded-md bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300">
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
          ))
        )}
      </div>
    </div>
  );
};