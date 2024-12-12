import React from 'react';
import { Hero } from '../components/Hero';
import { FeaturesSection } from '../components/features/FeaturesSection';
import { Footer } from '../components/Footer';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <main className="flex-grow">
        <Hero />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};