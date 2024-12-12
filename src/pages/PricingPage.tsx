import React from 'react';
import { PricingPlans } from '../components/pricing/PricingPlans';

export const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Choose the plan that best fits your needs
          </p>
        </div>
        <PricingPlans />
      </div>
    </div>
  );
};