import React from 'react';
import { Twitter, Github, Linkedin, Youtube } from 'lucide-react';

const socialLinks = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/podcastai',
    icon: Twitter,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/podcastai',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/podcastai',
    icon: Linkedin,
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/podcastai',
    icon: Youtube,
  },
];

export const FooterSocial: React.FC = () => {
  return (
    <div className="md:grid md:grid-cols-1 md:gap-8">
      <div>
        <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-300 tracking-wider uppercase">
          Connect with Us
        </h3>
        <div className="mt-4 flex space-x-6">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};