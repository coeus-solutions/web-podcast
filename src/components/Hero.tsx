import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, SparklesIcon, PlayCircleIcon, ChartBarIcon, ClockIcon } from '@heroicons/react/24/outline';

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string }> = ({ icon, title, value }) => (
  <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
    <div className="flex items-center space-x-4">
      <div className="p-3 bg-emerald-500/10 rounded-xl">
        {icon}
      </div>
      <div>
        <p className="text-emerald-300 font-medium">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  </div>
);

export const Hero: React.FC = () => {
  return (
    <div className="relative min-h-[90vh] overflow-hidden bg-[#0A0F1E]">
      {/* Static gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1E] via-[#162137] to-[#1C3851]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.15),rgba(0,0,0,0.9))]"></div>
        </div>
        
        {/* Static gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.15)_0%,transparent_50%)]" />
      </div>

      {/* Static orbs */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-gradient-to-r from-emerald-500/30 via-teal-500/30 to-cyan-500/30 rounded-full mix-blend-screen opacity-30 blur-[40px]" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-gradient-to-r from-cyan-500/30 via-emerald-500/30 to-teal-500/30 rounded-full mix-blend-screen opacity-30 blur-[40px]" />

      {/* Static grid effect */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(16,185,129,0.03) 1px, transparent 1px),
            linear-gradient(0deg, rgba(16,185,129,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16,185,129,0.02) 0.5px, transparent 0.5px),
            linear-gradient(0deg, rgba(16,185,129,0.02) 0.5px, transparent 0.5px)
          `,
          backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
          transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) scale(2)',
          transformOrigin: 'center center'
        }}
      />

      {/* Content */}
      <div className="relative">
        {/* Heading Container */}
        <div className="relative mt-16 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {/* Heading Section */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300">
                Transform Your Videos
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-emerald-300 to-teal-300 mt-3">
                Into Engaging Content
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-300 sm:mt-5 sm:text-xl">
              <SparklesIcon className="inline-block w-6 h-6 mr-2 text-emerald-400" />
              Harness the power of AI to automatically extract key highlights, create engaging clips, and generate smart summaries from your videos.
            </p>
          </div>
        </div>

        {/* Features Container */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* How it Works section */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-emerald-500/10">
              <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300 mb-4">
                How it Works
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <span className="text-emerald-400 font-semibold">1</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-300">
                      <span className="text-emerald-400 font-semibold">Sign up in seconds</span> - No credit card required
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <span className="text-emerald-400 font-semibold">2</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-300">
                      <span className="text-emerald-400 font-semibold">Upload your video</span> - Support for all major formats
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <span className="text-emerald-400 font-semibold">3</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-300">
                      <span className="text-emerald-400 font-semibold">Let AI work its magic</span> - Get highlights & clips in minutes
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits section */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-emerald-500/10">
              <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300 mb-4">
                Benefits
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <SparklesIcon className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-300">
                      <span className="text-emerald-400 font-semibold">10,000 free tokens</span> on signup - No credit card required
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <ChartBarIcon className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-300">
                      <span className="text-emerald-400 font-semibold">Pay-as-you-go pricing</span> - Only pay for what you use
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <ClockIcon className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-300">
                      <span className="text-emerald-400 font-semibold">Instant access</span> - Start processing videos in minutes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              icon={<ChartBarIcon className="h-6 w-6 text-emerald-400" />}
              title="Active Users"
              value="10,000+"
            />
            <StatCard
              icon={<ClockIcon className="h-6 w-6 text-emerald-400" />}
              title="Hours Saved"
              value="500,000+"
            />
            <StatCard
              icon={<PlayCircleIcon className="h-6 w-6 text-emerald-400" />}
              title="Videos Processed"
              value="1M+"
            />
          </div>

          {/* Get Started section */}
          <div className="mt-8 max-w-md mx-auto rounded-xl p-6 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300 mb-4 text-center">
              Ready to Start?
            </h3>
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full">
                <Link
                  to="/signup"
                  className="w-full flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg hover:shadow-emerald-500/25 group"
                >
                  Get Started Free
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            <p className="text-center text-sm text-gray-300 mt-4">
              No credit card required
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};