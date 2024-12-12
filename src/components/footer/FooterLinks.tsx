import React from 'react';
import { Link } from 'react-router-dom';

const navigation = {
  product: [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Demo', href: '/demo' },
    { name: 'Documentation', href: '/docs' },
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'API Status', href: '/status' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy', href: '/privacy' },
  ],
};

export const FooterLinks: React.FC = () => {
  return (
    <div className="md:grid md:grid-cols-2 md:gap-8">
      <div>
        <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-300 tracking-wider uppercase">
          Product
        </h3>
        <ul className="mt-4 space-y-4">
          {navigation.product.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-12 md:mt-0">
        <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-300 tracking-wider uppercase">
          Support
        </h3>
        <ul className="mt-4 space-y-4">
          {navigation.support.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};