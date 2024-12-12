import React from 'react';
import { PricingCard } from './PricingCard';
import { PRICING_PLANS } from './constants';

export const PricingPlans: React.FC = () => {
  return (
    <div className="mt-12 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
      {PRICING_PLANS.map((plan) => (
        <PricingCard key={plan.name} plan={plan} />
      ))}
    </div>
  );
};