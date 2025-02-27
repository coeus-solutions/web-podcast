import { useState, useCallback } from 'react';
import { podcasts } from '../services/api';
import { Podcast } from '../types/api';

export const usePodcasts = () => {
  const [podcastList, setPodcastList] = useState<Podcast[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPodcasts = useCallback(async () => {
    try {
      setIsFetching(true);
      setError(null);
      const data = await podcasts.getAll();
      setPodcastList(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching podcasts');
      throw err;
    } finally {
      setIsFetching(false);
    }
  }, []);

  const uploadPodcast = useCallback(async (
    title: string, 
    file: File,
    onProgress?: (progress: number) => void
  ) => {
    setIsUploading(true);
    setError(null);
    try {
      const newPodcast = await podcasts.upload(title, file, onProgress);
      setPodcastList(prev => [newPodcast, ...prev]);
      return newPodcast;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload podcast');
      throw err;
    } finally {
      setIsUploading(false);
    }
  }, []);

  const deletePodcast = useCallback(async (id: number) => {
    try {
      setIsFetching(true);
      setError(null);
      await podcasts.delete(id);
      setPodcastList(prev => prev.filter(podcast => podcast.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while deleting podcast');
      throw err;
    } finally {
      setIsFetching(false);
    }
  }, []);

  const getPodcast = useCallback(async (id: number) => {
    try {
      setIsFetching(true);
      setError(null);
      const podcast = await podcasts.getById(id);
      return podcast;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching podcast');
      throw err;
    } finally {
      setIsFetching(false);
    }
  }, []);

  const shareKeyPoint = useCallback(async (keyPointId: number) => {
    try {
      setIsFetching(true);
      setError(null);
      const response = await podcasts.shareKeyPointOnFacebook(keyPointId);
      window.open(response.share_url, '_blank');
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while sharing key point');
      throw err;
    } finally {
      setIsFetching(false);
    }
  }, []);

  return {
    podcasts: podcastList,
    isFetching,
    isUploading,
    error,
    fetchPodcasts,
    uploadPodcast,
    deletePodcast,
    getPodcast,
    shareKeyPoint,
  };
};