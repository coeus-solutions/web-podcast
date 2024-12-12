import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { useUpload } from '../../hooks/useUpload';

export const UploadSection: React.FC = () => {
  const { uploadPodcast, isUploading } = useUpload();

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const audioFile = files.find(file => file.type === 'audio/mpeg');
    if (audioFile) {
      uploadPodcast(audioFile);
    }
  }, [uploadPodcast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadPodcast(file);
    }
  };

  return (
    <div className="mt-8">
      <div
        className={`
          max-w-2xl mx-auto border-2 border-dashed border-gray-300 dark:border-gray-700 
          rounded-lg p-12 text-center hover:border-gray-400 dark:hover:border-gray-600 
          transition-colors ${isUploading ? 'opacity-50' : ''}
        `}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <div className="mt-4">
          <label htmlFor="file-upload" className="cursor-pointer">
            <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
              {isUploading ? 'Uploading...' : 'Drop your podcast file here, or'}
              <span className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"> browse</span>
            </span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              accept=".mp3"
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </label>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            MP3 up to 100MB
          </p>
        </div>
      </div>
    </div>
  );
};