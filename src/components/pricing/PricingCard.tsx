import React from 'react';
import { Check } from 'lucide-react';
import { PricingPlan } from './types';
import { Link } from 'react-router-dom';

interface PricingCardProps {
  plan: PricingPlan;
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan }) => {
  return (
    <div className={`relative p-8 bg-white dark:bg-gray-800 border rounded-2xl shadow-sm flex flex-col ${
      plan.featured ? 'border-indigo-500 ring-2 ring-indigo-500' : 'border-gray-200 dark:border-gray-700'
    }`}>
      {plan.featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex rounded-full bg-indigo-500 px-4 py-1 text-sm font-semibold text-white">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
        <p className="mt-2 text-base text-gray-500 dark:text-gray-400">{plan.description}</p>
      </div>

      <div className="mt-4 mb-8">
        <span className="text-4xl font-bold text-gray-900 dark:text-white">${plan.price}</span>
        <span className="text-base font-medium text-gray-500 dark:text-gray-400">/month</span>
      </div>

      <ul className="mt-6 space-y-4 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex">
            <Check className="flex-shrink-0 w-5 h-5 text-indigo-500" />
            <span className="ml-3 text-base text-gray-500 dark:text-gray-400">{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        to="/signup"
        className={`mt-8 block w-full py-3 px-6 rounded-md text-center font-medium ${
          plan.featured
            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
            : 'bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-100 hover:bg-indigo-100 dark:hover:bg-indigo-800'
        }`}
      >
        {plan.featured ? 'Start free trial' : 'Get started'}
      </Link>
    </div>
  );
};