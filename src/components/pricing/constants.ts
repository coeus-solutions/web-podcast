import { PricingPlan } from './types';

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Hobby',
    description: 'Perfect for podcasters just getting started',
    price: 0,
    featured: false,
    features: [
      'Up to 2 hours of audio processing',
      'Basic transcription',
      'Key point extraction',
      '5 shareable clips per month',
      'Email support',
    ],
  },
  {
    name: 'Pro',
    description: 'For professional podcasters and content creators',
    price: 29,
    featured: true,
    features: [
      'Up to 20 hours of audio processing',
      'Advanced transcription with timestamps',
      'AI-powered key point extraction',
      'Unlimited shareable clips',
      'Priority email & chat support',
      'Analytics dashboard',
    ],
  },
  {
    name: 'Enterprise',
    description: 'Custom solutions for large organizations',
    price: 99,
    featured: false,
    features: [
      'Unlimited audio processing',
      'Custom AI model training',
      'Advanced analytics & reporting',
      'API access',
      'Dedicated account manager',
      'Custom integrations',
      'SLA guarantee',
    ],
  },
];