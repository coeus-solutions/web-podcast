import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Upload } from 'lucide-react';
import { usePodcasts } from '../../hooks/usePodcasts';
import { podcasts } from '../../services/api';
import { ProgressBar } from '../common/ProgressBar';
import { useAuthContext } from '../../contexts/AuthContext';
import { toast } from '../../components/common/Toast';
import { AxiosError } from 'axios';

export const UploadSection: React.FC = () => {
  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadPodcast, loading, error } = usePodcasts();
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval>>();
  const { refreshUser } = useAuthContext();

  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  const simulateProgress = useCallback(() => {
    setUploadProgress(0);
    progressIntervalRef.current = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressIntervalRef.current);
          return 90;
        }
        return prev + 1;
      });
    }, 2000);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      if (file.size <= 100 * 1024 * 1024) { // 100MB
        setSelectedFile(file);
      } else {
        alert('File size exceeds 100MB limit');
      }
    } else {
      alert('Please upload a video file');
    }
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        if (file.size <= 100 * 1024 * 1024) { // 100MB
          setSelectedFile(file);
        } else {
          alert('File size exceeds 100MB limit');
        }
      } else {
        alert('Please upload a video file');
      }
    }
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !title.trim()) {
      alert('Please provide both title and file');
      return;
    }

    setIsUploading(true);
    simulateProgress();
    
    try {
      await uploadPodcast(title, selectedFile);
      setUploadProgress(100);
      toast.success('Video uploaded successfully!');
      
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
        setTitle('');
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 500);
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 402) {
        toast.error("You don't have sufficient tokens");
      } else {
        toast.error('Failed to upload Video. Please try again.');
      }
    } finally {
      // Always refresh user data to get latest token balance
      await refreshUser().catch(console.error);
      
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      setIsUploading(false);
    }
  };

  const getProgressText = (progress: number) => {
    if (progress > 40) return 'Generating clips...';
    if (progress > 10) return 'Extracting highlights...';
    return 'Uploading...';
  };

  return (
    <form onSubmit={handleUpload} className="mt-8">
      <div className="max-w-2xl mx-auto space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Video Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter Video title"
            required
          />
        </div>

        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
            isDragging
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/10'
              : selectedFile
              ? 'border-green-500 bg-green-50 dark:bg-green-900/10'
              : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <Upload className={`mx-auto h-12 w-12 ${selectedFile ? 'text-green-500' : 'text-gray-400'}`} />
          <div className="mt-4">
            <label htmlFor="file-upload" className="cursor-pointer">
              {selectedFile ? (
                <span className="mt-2 block text-sm font-medium text-green-600 dark:text-green-400">
                  {selectedFile.name}
                </span>
              ) : (
                <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
                  Drop your video file here, or
                  <span className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"> browse</span>
                </span>
              )}
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                ref={fileInputRef}
                className="sr-only"
                accept="video/*"
                onChange={handleFileSelect}
                required
              />
            </label>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Video files up to 100MB
            </p>
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <div className="text-center">
          <button
            type="submit"
            disabled={loading || !selectedFile || !title.trim()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
          >
            {loading ? 'Uploading...' : 'Upload Video'}
          </button>
        </div>
      </div>

      {isUploading && (
        <div className="mt-4">
          <ProgressBar progress={uploadProgress} />
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {getProgressText(uploadProgress)} {uploadProgress}%
          </p>
        </div>
      )}
    </form>
  );
};