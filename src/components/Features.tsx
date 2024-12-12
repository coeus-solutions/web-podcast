import React from 'react';
import { Mic, Waveform, Share2, FileAudio, Brain, Clock } from 'lucide-react';

const features = [
  {
    name: 'Audio Upload',
    description: 'Upload your podcast episodes in MP3 format with support for files up to 100MB.',
    icon: FileAudio,
  },
  {
    name: 'AI Transcription',
    description: 'Get accurate transcriptions powered by OpenAI Whisper technology.',
    icon: Mic,
  },
  {
    name: 'Key Point Extraction',
    description: 'AI automatically identifies and extracts the most important points from your content.',
    icon: Brain,
  },
  {
    name: 'Timestamp Generation',
    description: 'Every key point comes with precise timestamps for easy navigation.',
    icon: Clock,
  },
  {
    name: 'Audio Clip Creation',
    description: 'Create short, shareable clips from your podcast episodes automatically.',
    icon: Waveform,
  },
  {
    name: 'Social Sharing',
    description: 'Share your clips directly to social media platforms with one click.',
    icon: Share2,
  },
];

export const Features: React.FC = () => {
  return (
    <div className="py-12 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Everything you need for your podcast
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
            Streamline your podcast workflow with our comprehensive suite of AI-powered tools.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">{feature.name}</p>
                <p className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};