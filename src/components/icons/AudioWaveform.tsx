import React from 'react';

export const AudioWaveform: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 30"
      preserveAspectRatio="none"
      fill="currentColor"
    >
      <path
        d="M0 15 Q 10 5, 20 15 T 40 15 T 60 15 T 80 15 T 100 15"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
        className="text-indigo-500 dark:text-indigo-400"
      />
      {/* Add more waveform paths for visual effect */}
      <path
        d="M0 15 Q 10 10, 20 15 T 40 15 T 60 15 T 80 15 T 100 15"
        stroke="currentColor"
        strokeWidth="0.3"
        fill="none"
        className="text-indigo-400 dark:text-indigo-500"
      />
      <path
        d="M0 15 Q 10 20, 20 15 T 40 15 T 60 15 T 80 15 T 100 15"
        stroke="currentColor"
        strokeWidth="0.2"
        fill="none"
        className="text-indigo-300 dark:text-indigo-600"
      />
    </svg>
  );
};