import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-sky-400/10 via-indigo-400/5 to-purple-400/10 dark:from-sky-400/5 dark:via-indigo-400/3 dark:to-purple-400/5 blur-2xl transform rotate-12 opacity-30"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-sky-400/10 via-indigo-400/5 to-purple-400/10 dark:from-sky-400/5 dark:via-indigo-400/3 dark:to-purple-400/5 blur-2xl transform -rotate-12 opacity-30"></div>
      </div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </div>
    </div>
  );
}; 