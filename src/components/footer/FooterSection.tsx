import React from 'react';
import { Link } from 'react-router-dom';
import { FooterLinks } from './FooterLinks';
import { FooterSocial } from './FooterSocial';
import { Headphones } from 'lucide-react';

export const FooterSection: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <Headphones className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">PodcastManager</span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-base">
              Transform your podcast content with AI-powered insights, automated transcription, and easy sharing tools.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <FooterLinks />
            <FooterSocial />
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
          <p className="text-base text-gray-400 dark:text-gray-500 text-center">
            © {new Date().getFullYear()} PodcastManager. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};