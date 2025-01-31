import React from 'react';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-400/30 via-indigo-400/30 to-purple-400/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),rgba(0,0,0,0.9))]"></div>
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-sky-400/30 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-400/30 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Grid overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(transparent 1px, rgba(56, 189, 248, 0.1) 1px), 
                         linear-gradient(90deg, transparent 1px, rgba(56, 189, 248, 0.1) 1px)`,
        backgroundSize: '50px 50px',
        transform: 'perspective(1000px) rotateX(60deg) translateY(-100px)',
        opacity: '0.2'
      }}></div>

      {/* Moving light beam effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-30">
          <div className="absolute left-0 top-1/2 w-[100px] h-[500px] bg-gradient-to-r from-transparent via-sky-300 to-transparent rotate-[30deg] transform translate-x-[-100%] animate-[beam_4s_ease-in-out_infinite]"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-sky-300 via-blue-300 to-indigo-400">
                  Discover the Best
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-sky-300">
                  Moments in Your Videos
                </span>
              </h1>
              <p className="mt-3 text-base text-sky-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-auto backdrop-blur-sm bg-white/10 p-4 rounded-lg border border-sky-200/20">
                Upload your videos and let our AI automatically extract key highlights, create engaging clips, and generate smart summaries. Perfect for content creators, educators, and video enthusiasts.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    to="/signup"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-sky-400 to-indigo-400 hover:from-sky-500 hover:to-indigo-500 md:py-4 md:text-lg md:px-10 transition-all duration-300 hover:shadow-lg hover:shadow-sky-400/30"
                  >
                    Start Creating Highlights
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    to="/demo"
                    className="w-full flex items-center justify-center px-8 py-3 border border-sky-200/20 text-base font-medium rounded-md text-sky-100 bg-white/10 backdrop-blur-sm hover:bg-white/20 md:py-4 md:text-lg md:px-10 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-400/20"
                  >
                    See it in Action
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Style for the beam animation */}
      <style>
        {`
          @keyframes beam {
            0% { transform: translate-x-[-100%] rotate(30deg); }
            100% { transform: translate-x-[1000%] rotate(30deg); }
          }
        `}
      </style>
    </div>
  );
};