import React, { useCallback, useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import { usePodcasts } from '../../hooks/usePodcasts';

export const UploadSection: React.FC = () => {
  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadPodcast, loading, error } = usePodcasts();

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'audio/mpeg' || file.type === 'audio/mp3')) {
      if (file.size <= 100 * 1024 * 1024) { // 100MB
        setSelectedFile(file);
      } else {
        alert('File size exceeds 100MB limit');
      }
    } else {
      alert('Please upload an MP3 file');
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
      if (file.type === 'audio/mpeg' || file.type === 'audio/mp3') {
        if (file.size <= 100 * 1024 * 1024) { // 100MB
          setSelectedFile(file);
        } else {
          alert('File size exceeds 100MB limit');
        }
      } else {
        alert('Please upload an MP3 file');
      }
    }
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !title.trim()) {
      alert('Please provide both title and file');
      return;
    }

    try {
      await uploadPodcast(title, selectedFile);
      setTitle('');
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      // Error is handled by the podcasts hook
    }
  };

  return (
    <form onSubmit={handleUpload} className="mt-8">
      <div className="max-w-2xl mx-auto space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Podcast Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter podcast title"
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
                  Drop your podcast file here, or
                  <span className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"> browse</span>
                </span>
              )}
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                ref={fileInputRef}
                className="sr-only"
                accept="audio/mpeg,audio/mp3"
                onChange={handleFileSelect}
                required
              />
            </label>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              MP3 up to 100MB
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
            {loading ? 'Uploading...' : 'Upload Podcast'}
          </button>
        </div>
      </div>
    </form>
  );
};