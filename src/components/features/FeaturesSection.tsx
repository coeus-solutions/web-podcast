import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  SparklesIcon, CursorArrowRaysIcon, ShieldCheckIcon, CloudArrowUpIcon,
  UserPlusIcon, ArrowUpTrayIcon, CpuChipIcon, ChevronLeftIcon, ChevronRightIcon
} from '@heroicons/react/24/outline';

// Import images
import signupImage from '../../assets/images/signup.svg';
import uploadImage from '../../assets/images/upload.svg';
import processingImage from '../../assets/images/processing.svg';

const features = [
  {
    title: "Smart Video Analysis",
    description: "Our AI analyzes every frame to identify key moments, emotions, and actions.",
    icon: SparklesIcon,
  },
  {
    title: "Instant Highlights",
    description: "Automatically generate highlight clips with perfect timing and transitions.",
    icon: CursorArrowRaysIcon,
  },
  {
    title: "Secure Processing",
    description: "Enterprise-grade encryption and isolated processing environments.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Cloud Storage",
    description: "Safely store and organize all your video content in the cloud.",
    icon: CloudArrowUpIcon,
  },
];

const FeatureCard: React.FC<{ icon: React.ElementType; title: string; description: string }> = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="relative backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-emerald-500/10"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 rounded-2xl" />
    <div className="relative">
      <div className="p-3 bg-emerald-500/10 rounded-xl w-fit">
        <Icon className="h-6 w-6 text-emerald-400" />
      </div>
      <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-gray-300">{description}</p>
    </div>
  </motion.div>
);

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
  }
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
    question: 'Is my content secure?',
    answer: 'Absolutely. We use enterprise-grade encryption for all uploaded content, and your videos are processed in isolated environments. We never share or use your content for training our AI.',
  }
];

const StepCard: React.FC<{ 
  title: string; 
  description: string; 
  icon: React.ElementType;
  imageSrc: string;
  index: number;
}> = ({ title, description, icon: Icon, imageSrc, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-emerald-500/10"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 rounded-2xl" />
      <div className="relative">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
            <Icon className="h-6 w-6 text-emerald-400" />
          </div>
          <div className="ml-4">
            <span className="text-emerald-400 font-medium">Step {index + 1}</span>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
          </div>
        </div>
        <div className="aspect-video mb-6 bg-gray-900/50 rounded-xl overflow-hidden">
          <motion.div
            className="w-full h-full"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            />
          </motion.div>
        </div>
        <p className="text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};

const steps = [
  {
    title: "Create an Account",
    description: "Sign up in seconds and get instant access to our AI-powered video analysis tools.",
    icon: UserPlusIcon,
    imageSrc: signupImage,
  },
  {
    title: "Upload Your Video",
    description: "Select and upload any video from your computer. We support all major video formats up to 4K resolution.",
    icon: ArrowUpTrayIcon,
    imageSrc: uploadImage,
  },
  {
    title: "Let AI Work Its Magic",
    description: "Our advanced AI analyzes your video, identifying key moments and generating highlights automatically.",
    icon: CpuChipIcon,
    imageSrc: processingImage,
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
    <div className="relative py-24 bg-[#0A0F1E]">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1E] via-[#162137] to-[#1C3851]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent),radial-gradient(circle_at_70%_60%,rgba(6,182,212,0.15),transparent)]" />
      </div>

      {/* Glowing orbs */}
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300"
          >
            Powerful Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-4 text-xl text-gray-300"
          >
            Everything you need to transform your videos into engaging content
          </motion.p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300"
            >
              How It Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-4 text-xl text-gray-300"
            >
              Get started with Vid Highlights in three simple steps
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <StepCard
                key={step.title}
                title={step.title}
                description={step.description}
                icon={step.icon}
                imageSrc={step.imageSrc}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h3 className="text-3xl sm:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 mb-12">
            What Our Users Say
          </h3>
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-emerald-500/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 rounded-2xl" />
              <div className="relative">
                <div className="flex items-center">
                  <img 
                    className="h-16 w-16 rounded-full ring-2 ring-emerald-500/20" 
                    src={testimonials[currentTestimonialIndex].image} 
                    alt={testimonials[currentTestimonialIndex].name} 
                  />
                  <div className="ml-6">
                    <p className="text-xl font-medium text-white">{testimonials[currentTestimonialIndex].name}</p>
                    <p className="text-emerald-400">{testimonials[currentTestimonialIndex].role}</p>
                  </div>
                </div>
                <p className="mt-6 text-lg text-gray-300 italic">"{testimonials[currentTestimonialIndex].quote}"</p>
                
                {/* Navigation */}
                <div className="flex justify-between items-center mt-8">
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={prevTestimonial}
                    className="p-2 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400"
                  >
                    <ChevronLeftIcon className="h-6 w-6" />
                  </motion.button>
                  
                  <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonialIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentTestimonialIndex 
                            ? 'bg-emerald-400 w-6' 
                            : 'bg-emerald-400/30 hover:bg-emerald-400/50'
                        }`}
                      />
                    ))}
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextTestimonial}
                    className="p-2 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400"
                  >
                    <ChevronRightIcon className="h-6 w-6" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl sm:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 mb-12">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative backdrop-blur-xl bg-white/5 rounded-xl border border-emerald-500/10 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-medium text-white">{faq.question}</h4>
                    <ChevronRightIcon 
                      className={`h-5 w-5 text-emerald-400 transition-transform duration-300 ${
                        expandedFaq === index ? 'transform rotate-90' : ''
                      }`}
                    />
                  </div>
                  {expandedFaq === index && (
                    <p className="mt-4 text-gray-300">{faq.answer}</p>
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};