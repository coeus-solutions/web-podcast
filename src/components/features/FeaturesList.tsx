import React from 'react';
import { 
  SparklesIcon, 
  VideoCameraIcon, 
  ClockIcon,
  ChartBarIcon,
  ShareIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Smart Video Analysis',
    description: 'Our AI analyzes your videos frame by frame to identify key moments and important content.',
    icon: SparklesIcon,
  },
  {
    name: 'Automatic Highlights',
    description: 'Get perfectly timed video clips of the most engaging moments, ready to share.',
    icon: VideoCameraIcon,
  },
  {
    name: 'Real-time Processing',
    description: 'Watch as our AI processes your video in real-time, delivering instant results.',
    icon: ClockIcon,
  },
  {
    name: 'Engagement Analytics',
    description: 'Understand which moments captivate your audience with detailed analytics.',
    icon: ChartBarIcon,
  },
  {
    name: 'One-Click Sharing',
    description: 'Share your highlights directly to social media platforms with a single click.',
    icon: ShareIcon,
  },
  {
    name: 'Cloud Storage',
    description: 'All your videos and highlights are securely stored and easily accessible.',
    icon: CloudArrowUpIcon,
  },
];

export const FeaturesList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => (
        <div
          key={feature.name}
          className="relative group backdrop-blur-sm bg-white/10 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 border border-sky-200/20 hover:border-sky-200/40"
        >
          {/* Hover effect glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-sky-400/10 to-indigo-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-xl -z-10"></div>
          
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <feature.icon className="h-8 w-8 text-sky-300 group-hover:text-sky-200 transition-colors duration-300" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-white group-hover:text-sky-200 transition-colors duration-300">
                {feature.name}
              </h3>
              <p className="mt-2 text-base text-sky-100 group-hover:text-sky-50 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};