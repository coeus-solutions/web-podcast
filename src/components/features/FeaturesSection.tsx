import React, { useState } from 'react';
import { FeaturesList } from './FeaturesList';
import { UserGroupIcon, VideoCameraIcon, ClockIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const stats = [
  { name: 'Active Users', value: '10,000+', icon: UserGroupIcon },
  { name: 'Videos Processed', value: '1M+', icon: VideoCameraIcon },
  { name: 'Hours Saved', value: '500,000+', icon: ClockIcon },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Content Creator',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    quote: 'Vid Highlights has transformed how I create content. It saves me hours of editing time and helps me focus on what matters most - creating great content.',
  },
  {
    name: 'Michael Chen',
    role: 'Educational YouTuber',
    image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    quote: 'The AI-powered highlights feature is a game-changer for my educational videos. My students love the concise summaries!',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Sports Analyst',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    quote: 'Analyzing game footage has never been easier. The automatic highlight detection helps us identify key plays instantly.',
  },
  {
    name: 'David Kim',
    role: 'Marketing Director',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    quote: 'We use Vid Highlights for our marketing campaigns. The ability to quickly extract engaging moments has improved our social media presence dramatically.',
  },
  {
    name: 'Lisa Thompson',
    role: 'Event Organizer',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    quote: 'For event highlights and recap videos, this tool is invaluable. It captures the best moments automatically, saving us countless hours of manual editing.',
  },
];

const faqs = [
  {
    question: 'How does the AI detect important moments?',
    answer: 'Our AI uses advanced computer vision and machine learning algorithms to analyze various aspects of your videos, including action intensity, audio peaks, facial expressions, and scene changes to identify significant moments.',
  },
  {
    question: 'What video formats are supported?',
    answer: 'We support all major video formats including MP4, MOV, AVI, and WMV. Videos can be up to 4K resolution with the Professional plan.',
  },
  {
    question: 'How long does it take to process a video?',
    answer: 'Processing time depends on the video length and quality. Typically, a 10-minute video is processed in 2-3 minutes. Real-time progress tracking is available during processing.',
  },
  {
    question: 'Can I customize the highlight detection criteria?',
    answer: 'Yes! You can set custom parameters for what constitutes a highlight, including minimum clip duration, action intensity threshold, and specific markers to look for.',
  },
  {
    question: 'Is my content secure?',
    answer: 'Absolutely. We use enterprise-grade encryption for all uploaded content, and your videos are processed in isolated environments. We never share or use your content for training our AI.',
  },
  {
    question: 'Do you offer a free trial?',
    answer: 'Yes, we offer a 14-day free trial on our Starter and Professional plans, with no credit card required. You can process up to 5 videos during the trial period.',
  },
];

const pricing = [
  {
    name: 'Starter',
    price: '$9',
    features: [
      '50 videos per month',
      'Basic analytics',
      '720p video quality',
      'Email support',
      '5GB storage',
    ],
    cta: 'Start Free Trial',
  },
  {
    name: 'Professional',
    price: '$29',
    popular: true,
    features: [
      'Unlimited videos',
      'Advanced analytics',
      '4K video quality',
      'Priority support',
      '100GB storage',
      'Custom branding',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'Unlimited everything',
      'Custom AI models',
      'Dedicated support',
      'Custom integrations',
      'Unlimited storage',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
  },
];

export const FeaturesSection: React.FC = () => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative py-16 sm:py-24">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-sky-900/50 to-indigo-900/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.2),transparent),radial-gradient(circle_at_70%_60%,rgba(99,102,241,0.2),transparent)]"></div>
        {/* Futuristic grid overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(transparent 1px, rgba(56, 189, 248, 0.1) 1px), 
                           linear-gradient(90deg, transparent 1px, rgba(56, 189, 248, 0.1) 1px)`,
          backgroundSize: '50px 50px',
          transform: 'perspective(500px) rotateX(60deg)',
          opacity: '0.1'
        }}></div>
      </div>

      {/* Glowing orbs decoration */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-sky-400/20 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-indigo-400/20 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Features Section */}
        <div className="lg:text-center mb-20">
          <h2 className="text-lg text-white font-semibold tracking-wide uppercase animate-pulse">
            Vid Highlights
          </h2>
          <p className="mt-2 text-5xl md:text-6xl lg:text-7xl leading-tight font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-indigo-300">
            AI-Powered Video Analysis
          </p>
          <p className="mt-6 max-w-3xl text-2xl text-white/90 lg:mx-auto">
            Transform your video content with intelligent highlight detection, smart summaries, and automated clip generation.
          </p>
        </div>

        {/* Features Cards */}
        <div className="mt-10 relative backdrop-blur-lg bg-white/10 rounded-2xl p-8 shadow-2xl border border-sky-200/20">
          <FeaturesList />
        </div>

        {/* Stats Section */}
        <div className="mt-24">
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.name} className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-sky-200/20">
                <dt className="flex items-center">
                  <div className="flex-shrink-0">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <p className="ml-3 text-xl font-medium text-white">{stat.name}</p>
                </dt>
                <dd className="mt-3 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-sky-200">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Testimonials Section */}
        <div className="mt-24">
          <h3 className="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-indigo-300 mb-16">
            Success Stories
          </h3>
          <div className="relative">
            <div className="overflow-hidden">
              <div className="relative backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-sky-200/20">
                <div className="flex items-center">
                  <img 
                    className="h-20 w-20 rounded-full ring-2 ring-white/50" 
                    src={testimonials[currentTestimonialIndex].image} 
                    alt={testimonials[currentTestimonialIndex].name} 
                  />
                  <div className="ml-6">
                    <p className="text-2xl font-medium text-white">{testimonials[currentTestimonialIndex].name}</p>
                    <p className="text-lg text-sky-200">{testimonials[currentTestimonialIndex].role}</p>
                  </div>
                </div>
                <p className="mt-8 text-xl text-white/90 italic leading-relaxed">"{testimonials[currentTestimonialIndex].quote}"</p>
                
                {/* Navigation Buttons */}
                <div className="absolute top-1/2 -translate-y-1/2 left-4">
                  <button 
                    onClick={prevTestimonial}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 text-sky-300 hover:text-sky-200"
                  >
                    <ChevronLeftIcon className="h-6 w-6" />
                  </button>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 right-4">
                  <button 
                    onClick={nextTestimonial}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 text-sky-300 hover:text-sky-200"
                  >
                    <ChevronRightIcon className="h-6 w-6" />
                  </button>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center mt-6 space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonialIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentTestimonialIndex 
                          ? 'bg-sky-300 w-4' 
                          : 'bg-sky-300/30 hover:bg-sky-300/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <h3 className="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-indigo-300 mb-16">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="backdrop-blur-lg bg-white/10 rounded-xl border border-sky-200/20 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center"
                >
                  <span className="text-xl font-medium text-white">{faq.question}</span>
                  <ChevronRightIcon 
                    className={`h-6 w-6 text-white transition-transform duration-300 ${
                      expandedFaq === index ? 'transform rotate-90' : ''
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="px-8 pb-6 text-lg text-white/90">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mt-24">
          <h3 className="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-indigo-300 mb-16">
            Simple, Transparent Pricing
          </h3>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {pricing.map((plan) => (
              <div key={plan.name} className={`backdrop-blur-lg rounded-2xl p-8 border ${
                plan.popular 
                  ? 'bg-gradient-to-b from-sky-400/20 to-indigo-400/20 border-white/40' 
                  : 'bg-white/10 border-white/20'
              }`}>
                {plan.popular && (
                  <span className="bg-gradient-to-r from-sky-400 to-indigo-400 text-white px-4 py-1.5 rounded-full text-base font-medium absolute -top-3 right-6">
                    Most Popular
                  </span>
                )}
                <h4 className="text-2xl font-semibold text-white">{plan.name}</h4>
                <p className="mt-4 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-sky-200">
                  {plan.price}
                  {plan.price !== 'Custom' && <span className="text-xl font-normal text-white/80">/month</span>}
                </p>
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center text-lg text-white/90">
                      <svg className="h-6 w-6 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`mt-8 w-full py-4 px-6 rounded-md text-lg font-medium transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-sky-400 to-indigo-400 hover:from-sky-500 hover:to-indigo-500 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};