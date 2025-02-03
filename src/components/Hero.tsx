import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { ArrowRightIcon, SparklesIcon, PlayCircleIcon, ChartBarIcon, ClockIcon } from '@heroicons/react/24/outline';

const FloatingParticle: React.FC<{ index: number }> = ({ index }) => {
  const randomDelay = Math.random() * 2;
  const randomDuration = 15 + Math.random() * 15;
  const size = 2 + Math.random() * 4;
  const initialX = Math.random() * 100;
  const initialY = Math.random() * 100;

  return (
    <motion.div
      initial={{ x: `${initialX}%`, y: `${initialY}%`, opacity: 0 }}
      animate={{
        y: [`${initialY}%`, `${initialY - 20}%`, `${initialY}%`],
        opacity: [0, 0.4, 0],
        scale: [1, 1.2, 1]
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        delay: randomDelay,
        ease: "linear"
      }}
      className="absolute rounded-full bg-emerald-300/30"
      style={{ width: size, height: size }}
    />
  );
};

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string }> = ({ icon, title, value }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
  >
    <div className="flex items-center space-x-4">
      <div className="p-3 bg-emerald-500/10 rounded-xl">
        {icon}
      </div>
      <div>
        <p className="text-emerald-300 font-medium">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  </motion.div>
);

export const Hero: React.FC = () => {
  const [particles] = useState(() => Array.from({ length: 50 }, (_, i) => i));
  const gridControls = useAnimation();

  useEffect(() => {
    const animateGrid = async () => {
      while (true) {
        await gridControls.start({
          backgroundPosition: ['0% 0%', '100% 100%'],
          transition: { duration: 20, ease: "linear" }
        });
      }
    };
    animateGrid();
  }, [gridControls]);

  return (
    <div className="relative min-h-[90vh] overflow-hidden bg-[#0A0F1E]">
      {/* Animated gradient background */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1E] via-[#162137] to-[#1C3851]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.15),rgba(0,0,0,0.9))]"></div>
        </div>
        
        {/* Animated gradient overlay */}
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 50% 50%, rgba(16,185,129,0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(6,182,212,0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(52,211,153,0.15) 0%, transparent 50%)'
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
          className="absolute inset-0"
        />
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((index) => (
          <FloatingParticle key={index} index={index} />
        ))}
      </div>

      {/* Glowing orbs with improved animations */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          filter: ['blur(40px)', 'blur(60px)', 'blur(40px)']
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-gradient-to-r from-emerald-500/30 via-teal-500/30 to-cyan-500/30 rounded-full mix-blend-screen"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
          filter: ['blur(40px)', 'blur(60px)', 'blur(40px)']
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
        className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-gradient-to-r from-cyan-500/30 via-emerald-500/30 to-teal-500/30 rounded-full mix-blend-screen"
      />

      {/* Cyberpunk grid effect */}
      <motion.div
        animate={gridControls}
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

      {/* Moving light beams */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 -translate-y-1/2 w-[100px] h-[500px] bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent rotate-[30deg] blur-md"
        />
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
          className="absolute top-1/3 -translate-y-1/2 w-[60px] h-[400px] bg-gradient-to-r from-transparent via-teal-400/20 to-transparent rotate-[30deg] blur-md"
        />
      </div>

      {/* Content */}
      <div className="relative">
        {/* Heading Container */}
        <div className="relative mt-16 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {/* Heading Section */}
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl"
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="block bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300"
              >
                Transform Your Videos
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-emerald-300 to-teal-300 mt-3"
              >
                Into Engaging Content
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 text-lg text-gray-300 sm:mt-5 sm:text-xl"
            >
              <SparklesIcon className="inline-block w-6 h-6 mr-2 text-emerald-400" />
              Harness the power of AI to automatically extract key highlights, create engaging clips, and generate smart summaries from your videos.
            </motion.p>
          </div>
        </div>

        {/* Features Container */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* How it Works section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-emerald-500/10"
            >
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
            </motion.div>

            {/* Benefits section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-emerald-500/10"
            >
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
            </motion.div>
          </div>


          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
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
          </motion.div>

                    {/* Get Started section */}
                    <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-8 max-w-md mx-auto rounded-xl p-6 flex flex-col justify-center"
          >
            <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300 mb-4 text-center">
              Ready to Start?
            </h3>
            <div className="flex-1 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full"
              >
                <Link
                  to="/signup"
                  className="w-full flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 transform transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 group"
                >
                  Get Started Free
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
            <p className="text-center text-sm text-gray-300 mt-4">
              No credit card required
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};