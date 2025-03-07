import React, { useEffect, useState, useRef } from 'react';
import { Play, Download, ChevronDown, ChevronUp, Square, Share2, Trash2, Search, SortDesc, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { KeyPoint, Podcast } from '../../types/api';
import { podcasts as podcastsApi } from '../../services/api';

interface PodcastListProps {
  variant?: 'dashboard' | 'full';
  maxItems?: number;
  showSearch?: boolean;
  showSort?: boolean;
  showDelete?: boolean;
  className?: string;
  setTotalVideos?: (total: number) => void;
}

const LoadingPodcastCard = () => (
  <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 animate-pulse">
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-md w-3/4"></div>
        <div className="flex items-center space-x-2">
          <div className="h-5 w-5 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-md"></div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-md w-24"></div>
        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-md w-32"></div>
      </div>
    </div>
  </div>
);

export const PodcastList: React.FC<PodcastListProps> = ({
  variant = 'full',
  maxItems,
  showSearch = true,
  showSort = true,
  showDelete = true,
  className = '',
  setTotalVideos = null,
  showUpload = true
}) => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedPodcastId, setExpandedPodcastId] = useState<number | null>(null);
  const [playingKeyPoint, setPlayingKeyPoint] = useState<number | null>(null);
  const [podcastToDelete, setPodcastToDelete] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [downloadingClips, setDownloadingClips] = useState<number[]>([]);
  const [loadingKeyPoints, setLoadingKeyPoints] = useState<{ [key: number]: boolean }>({});
  const [keyPointsError, setKeyPointsError] = useState<{ [key: number]: string }>({});

  const fetchPodcasts = async () => {
    setIsFetching(true);
    setError(null);
    try {
      const data = await podcastsApi.getAll();
      setPodcasts(data);
      if (setTotalVideos) {
        setTotalVideos(data.length);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching podcasts');
      console.error('Fetch error:', err);
    } finally {
      setIsFetching(false);
    }
  };

  const deletePodcast = async (id: number) => {
    try {
      await podcastsApi.delete(id);
      setPodcasts(prevPodcasts => prevPodcasts.filter(podcast => podcast.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while deleting podcast');
      console.error('Delete error:', err);
      throw err;
    }
  };

  // Filter, sort and limit podcasts
  const filteredAndSortedPodcasts = React.useMemo(() => {
    let filtered = [...podcasts];
    
    if (showSearch && searchQuery) {
      filtered = filtered.filter(podcast =>
        podcast.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    if (maxItems) {
      filtered = filtered.slice(0, maxItems);
    }

    return filtered;
  }, [podcasts, searchQuery, sortOrder, maxItems, showSearch]);

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const handlePodcastClick = async (podcastId: number) => {
    if (expandedPodcastId === podcastId) {
      setExpandedPodcastId(null);
      return;
    }

    setExpandedPodcastId(podcastId);
    setLoadingKeyPoints(prev => ({ ...prev, [podcastId]: true }));
    setKeyPointsError(prev => ({ ...prev, [podcastId]: '' }));

    try {
      const keyPoints = await podcastsApi.getKeyPoints(podcastId);
      setPodcasts(prevPodcasts => 
        prevPodcasts.map(podcast => 
          podcast.id === podcastId 
            ? { ...podcast, key_points: keyPoints }
            : podcast
        )
      );
    } catch (err) {
      setKeyPointsError(prev => ({ 
        ...prev, 
        [podcastId]: err instanceof Error ? err.message : 'Failed to load key points'
      }));
      console.error('Error fetching key points:', err);
    } finally {
      setLoadingKeyPoints(prev => ({ ...prev, [podcastId]: false }));
    }
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
        setPodcasts(updatedPodcasts);
      } catch (error) {
        console.error('Error deleting video:', error);
      }
    }
  };

  const handleDownloadClip = async (e: React.MouseEvent, filePath: string, keyPointId: number) => {
    e.stopPropagation();
    setDownloadingClips(prev => [...prev, keyPointId]);
    try {
      const response = await fetch(filePath);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `clip-${keyPointId}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading clip:', error);
    } finally {
      setDownloadingClips(prev => prev.filter(id => id !== keyPointId));
    }
  };

  if (isFetching) {
    return (
      <div className={className || "flex-1 p-6 ml-64"}>
        <div className="mb-8">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-48 mb-4"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
        </div>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(variant === 'dashboard' ? 3 : 6)].map((_, index) => (
            <LoadingPodcastCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={className || "flex-1 p-6 ml-64"}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          {variant === 'dashboard' ? 'Recent Videos' : 'My Videos'}
        </h1>
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-white dark:bg-gray-800 backdrop-blur-sm rounded-xl shadow-lg border border-red-200 dark:border-red-800">
          <div className="text-red-500 text-lg mb-4">
            {error}
          </div>
          <button
            onClick={() => fetchPodcasts()}
            className="px-6 py-2 bg-gradient-to-r from-sky-400 to-indigo-400 hover:from-sky-500 hover:to-indigo-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (podcasts.length === 0) {
    return (
      <div className={className || "flex-1 p-6 ml-64"}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          {variant === 'dashboard' ? 'Recent Videos' : 'My Videos'}
        </h1>
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-white dark:bg-gray-800 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="text-gray-500 dark:text-gray-400 text-lg mb-4">
            No videos uploaded yet
          </div>
          {showUpload && <Link
            to="/app/dashboard"
            className="px-6 py-2 bg-gradient-to-r from-sky-400 to-indigo-400 hover:from-sky-500 hover:to-indigo-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            Upload Your First Video
          </Link>}
        </div>
      </div>
    );
  }

  return (
    <div className={className || "flex-1 p-6 ml-64"}>
      {/* Title and Actions Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
            {variant === 'dashboard' ? 'Recent Videos' : 'My Videos'}
          </h1>
          {variant === 'dashboard' ? (
            <Link
              to="/app/podcasts"
              className="flex items-center px-4 py-2 text-sm font-medium text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300 transition-colors group"
            >
              View All Videos
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <Link
              to="/app/dashboard"
              className="px-4 py-2 bg-gradient-to-r from-sky-400 to-indigo-400 hover:from-sky-500 hover:to-indigo-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              Upload New Video
            </Link>
          )}
        </div>

        {/* Search and Filter Bar */}
        {(showSearch || showSort) && (
          <div className="flex flex-col sm:flex-row gap-4">
            {showSearch && (
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-200"
                />
              </div>
            )}
            {showSort && (
              <div className="flex-shrink-0">
                <button
                  onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
                  className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group"
                >
                  <SortDesc className="h-5 w-5 mr-2 text-gray-400 group-hover:text-sky-400" />
                  Sort: {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Videos Grid */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 auto-rows-auto">
        {filteredAndSortedPodcasts.map((podcast) => (
          <div 
            key={podcast.id}
            className="group relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-xl shadow-lg overflow-hidden border border-transparent hover:border-sky-200 dark:hover:border-sky-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-fit backdrop-blur-sm"
          >
            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-400/0 via-indigo-400/0 to-purple-400/0 group-hover:from-sky-400/5 group-hover:via-indigo-400/5 group-hover:to-purple-400/5 dark:group-hover:from-sky-400/10 dark:group-hover:via-indigo-400/10 dark:group-hover:to-purple-400/10 transition-all duration-300"></div>
            
            <div className="p-6 cursor-pointer relative" onClick={(e) => {
              e.stopPropagation();
              handlePodcastClick(podcast.id);
            }}>
              {/* Title and Actions */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 truncate flex-1 mr-4 group-hover:from-sky-600 group-hover:to-indigo-600 dark:group-hover:from-sky-300 dark:group-hover:to-indigo-300 transition-all duration-300">
                  {podcast.title}
                </h2>
                <div className="flex items-center space-x-1">
                  <button
                    className="p-2 text-red-400 hover:text-red-500 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                    onClick={(e) => handleDeleteClick(e, podcast.id)}
                    title="Delete Video"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
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
                    title={expandedPodcastId === podcast.id ? "Show Less" : "Show More"}
                  >
                    {expandedPodcastId === podcast.id ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center text-sm space-x-4">
                <span className="flex items-center px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
                  {new Date(podcast.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedPodcastId === podcast.id && (
              <div className="border-t border-gray-100 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative z-10">
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
                  
                  {/* Loading State */}
                  {loadingKeyPoints[podcast.id] && (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-400"></div>
                    </div>
                  )}

                  {/* Error State */}
                  {keyPointsError[podcast.id] && (
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className="text-red-500 text-center mb-4">{keyPointsError[podcast.id]}</div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePodcastClick(podcast.id);
                        }}
                        className="px-4 py-2 bg-gradient-to-r from-sky-400 to-indigo-400 hover:from-sky-500 hover:to-indigo-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        Try Again
                      </button>
                    </div>
                  )}

                  {/* Key Points List */}
                  {!loadingKeyPoints[podcast.id] && !keyPointsError[podcast.id] && (
                    <div className="space-y-4">
                      {podcast.key_points.length === 0 ? (
                        <div className="text-gray-500 dark:text-gray-400 text-center py-8">
                          No highlights available for this video
                        </div>
                      ) : (
                        podcast.key_points.map((keyPoint) => (
                          <div 
                            key={keyPoint.id}
                            className="group/card bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 dark:border-gray-700 hover:border-sky-200 dark:hover:border-sky-800 relative"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-gray-900 dark:text-white flex-1 mr-4">{keyPoint.content}</p>
                              <div className="flex items-center gap-2">
                                <button 
                                  className="p-2 text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleShareOnFacebook(podcast, keyPoint);
                                  }}
                                  title="Share on Facebook"
                                >
                                  <Share2 className="h-4 w-4" />
                                </button>
                                <button 
                                  className="p-2 text-sky-400 hover:text-sky-500 dark:hover:text-sky-300 transition-colors rounded-lg hover:bg-sky-50 dark:hover:bg-sky-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
                                  onClick={(e) => handleDownloadClip(e, keyPoint.file_path, keyPoint.id)}
                                  title="Download Clip"
                                  disabled={downloadingClips.includes(keyPoint.id)}
                                >
                                  {downloadingClips.includes(keyPoint.id) ? (
                                    <div className="h-4 w-4 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
                                  ) : (
                                    <Download className="h-4 w-4" />
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
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showDelete && podcastToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Delete Video
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this video? This action cannot be undone.
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