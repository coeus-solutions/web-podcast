import { useState, useCallback } from 'react';

export const useUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadPodcast = useCallback(async (file: File) => {
    setIsUploading(true);
    setError(null);

    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would upload the file to a server here
      console.log('Uploading file:', file.name);
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      return false;
    } finally {
      setIsUploading(false);
    }
  }, []);

  return {
    uploadPodcast,
    isUploading,
    error,
  };
};