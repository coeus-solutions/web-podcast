import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#0A0F1E] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-[#162137] to-[#1C3851]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent),radial-gradient(circle_at_70%_60%,rgba(6,182,212,0.15),transparent)]" />
      </div>

      {/* Glowing orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
          filter: ['blur(40px)', 'blur(60px)', 'blur(40px)']
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 rounded-full mix-blend-screen"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
          filter: ['blur(40px)', 'blur(60px)', 'blur(40px)']
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
        className="absolute -top-24 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-cyan-500/20 via-emerald-500/20 to-teal-500/20 rounded-full mix-blend-screen"
      />

      <div className="relative max-w-7xl mx-auto pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="col-span-1 md:col-span-2"
          >
            <div className="flex items-center mb-6">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-3 shadow-lg"
              >
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </motion.div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300">
                Vid Highlights
              </h3>
            </div>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Transform your videos with AI-powered highlights. Create engaging content faster and smarter with automated video analysis.
            </p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 rounded-xl bg-emerald-500/10 backdrop-blur-sm flex items-center justify-center hover:bg-emerald-500/20 transition-all duration-300 group border border-emerald-500/20"
              >
                <svg className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-emerald-500/10 backdrop-blur-sm flex items-center justify-center hover:bg-emerald-500/20 transition-all duration-300 group border border-emerald-500/20"
              >
                <svg className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-emerald-500/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 rounded-2xl" />
            <div className="relative">
              <h4 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 mb-6">
                Quick Links
              </h4>
              <ul className="space-y-4">
                <motion.li whileHover={{ x: 4 }}>
                  <Link to="/login" 
                        className="text-gray-300 hover:text-emerald-300 transition-colors duration-300 flex items-center group">
                    <svg className="w-5 h-5 mr-3 text-emerald-400 group-hover:text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Sign In
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 4 }}>
                  <Link to="/signup" 
                        className="text-gray-300 hover:text-emerald-300 transition-colors duration-300 flex items-center group">
                    <svg className="w-5 h-5 mr-3 text-emerald-400 group-hover:text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Sign Up
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 4 }}>
                  <a href="#features" 
                     className="text-gray-300 hover:text-emerald-300 transition-colors duration-300 flex items-center group">
                    <svg className="w-5 h-5 mr-3 text-emerald-400 group-hover:text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    Features
                  </a>
                </motion.li>
              </ul>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-emerald-500/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 rounded-2xl" />
            <div className="relative">
              <h4 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 mb-6">
                Contact Us
              </h4>
              <ul className="space-y-4">
                <motion.li whileHover={{ x: 4 }}>
                  <a href="mailto:contact@vidhighlights.com"
                     className="text-gray-300 hover:text-emerald-300 transition-colors duration-300 flex items-center group">
                    <svg className="w-5 h-5 mr-3 text-emerald-400 group-hover:text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Us
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 4 }}>
                  <a href="tel:+1234567890"
                     className="text-gray-300 hover:text-emerald-300 transition-colors duration-300 flex items-center group">
                    <svg className="w-5 h-5 mr-3 text-emerald-400 group-hover:text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Us
                  </a>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pt-8 border-t border-emerald-500/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Vid Highlights. All rights reserved.
            </p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <a href="/privacy" className="text-sm text-gray-400 hover:text-emerald-300 transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="/terms" className="text-sm text-gray-400 hover:text-emerald-300 transition-colors duration-300">
                Terms of Service
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}; 