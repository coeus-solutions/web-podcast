import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { podcasts } from '../services/api';
import { Podcast } from '../types/api';

export type PodcastContextType = {
  podcasts: Podcast[];
  isFetching: boolean;
  isUploading: boolean;
  error: string | null;
  fetchPodcasts: () => Promise<void>;
  uploadPodcast: (title: string, file: File) => Promise<void>;
  deletePodcast: (id: number) => Promise<void>;
};

const PodcastContext = createContext<PodcastContextType | undefined>(undefined);

export const usePodcastContext = () => {
  const context = useContext(PodcastContext);
  if (!context) {
    throw new Error('usePodcastContext must be used within a PodcastProvider');
  }
  return context;
};

export const PodcastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching podcasts');
      throw err;
    } finally {
      setIsFetching(false);
    }
  }, []);

  const uploadPodcast = useCallback(async (title: string, file: File) => {
    try {
      setIsUploading(true);
      setError(null);
      const newPodcast = await podcasts.upload(title, file);
      setPodcastList(prev => [newPodcast, ...prev]);
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

  const value: PodcastContextType = {
    podcasts: podcastList,
    isFetching,
    isUploading,
    error,
    fetchPodcasts,
    uploadPodcast,
    deletePodcast,
  };

  return (
    <PodcastContext.Provider value={value}>
      {children}
    </PodcastContext.Provider>
  );
}; 