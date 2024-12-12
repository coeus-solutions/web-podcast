import React from 'react';
import { FeatureCard } from './FeatureCard';
import { FEATURES } from './constants';

export const FeaturesList: React.FC = () => {
  return (
    <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
      {FEATURES.map((feature) => (
        <FeatureCard
          key={feature.name}
          name={feature.name}
          description={feature.description}
          Icon={feature.icon}
        />
      ))}
    </div>
  );
};