import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { podcasts } from '../services/api';
import { Podcast } from '../types/api';

interface PodcastContextType {
  podcasts: Podcast[];
  loading: boolean;
  error: string | null;
  fetchPodcasts: () => Promise<Podcast[]>;
  uploadPodcast: (title: string, file: File, onProgress?: (progress: number) => void) => Promise<Podcast>;
  deletePodcast: (id: number) => Promise<void>;
  getPodcast: (id: number) => Promise<Podcast>;
  shareKeyPoint: (keyPointId: number) => Promise<any>;
}

const PodcastContext = createContext<PodcastContextType | null>(null);

export const usePodcastContext = () => {
  const context = useContext(PodcastContext);
  if (!context) {
    throw new Error('usePodcastContext must be used within a PodcastProvider');
  }
  return context;
};

export const PodcastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [podcastList, setPodcastList] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPodcasts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await podcasts.getAll();
      setPodcastList(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching podcasts');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadPodcast = useCallback(async (
    title: string,
    file: File,
    onProgress?: (progress: number) => void
  ) => {
    setLoading(true);
    setError(null);
    try {
      const newPodcast = await podcasts.upload(title, file, onProgress);
      setPodcastList(prev => [newPodcast, ...prev]);
      return newPodcast;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload podcast');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deletePodcast = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await podcasts.delete(id);
      setPodcastList(prev => prev.filter(podcast => podcast.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while deleting podcast');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getPodcast = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const podcast = await podcasts.getById(id);
      return podcast;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching podcast');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const shareKeyPoint = useCallback(async (keyPointId: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await podcasts.shareKeyPointOnFacebook(keyPointId);
      window.open(response.share_url, '_blank');
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while sharing key point');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    podcasts: podcastList,
    loading,
    error,
    fetchPodcasts,
    uploadPodcast,
    deletePodcast,
    getPodcast,
    shareKeyPoint,
  };

  return (
    <PodcastContext.Provider value={value}>
      {children}
    </PodcastContext.Provider>
  );
}; 