import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home,
  FileAudio,
  Settings,
  LogOut,
  Sparkles,
  Coins
} from 'lucide-react';
import { useAuthContext } from '../../contexts/AuthContext';
import { PurchaseTokenModal } from '../tokens/PurchaseTokenModal';

const navigation = [
  { name: 'Dashboard', href: '/app/dashboard', icon: Home },
  { name: 'My Videos', href: '/app/podcasts', icon: FileAudio },
  { name: 'Settings', href: '/app/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <div className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 border-r border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Logo Section */}
          <div className="flex items-center h-20 flex-shrink-0 px-6 border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-xl shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600 dark:from-sky-400 dark:to-indigo-400">
                  Vid Highlights
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">AI Video Assistant</p>
              </div>
            </div>
          </div>

          {/* Navigation Section */}
          <nav className="flex-1 px-6 py-8 space-y-3">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ease-in-out
                    ${isActive 
                      ? 'bg-gradient-to-r from-sky-500/10 to-indigo-500/10 dark:from-sky-400/10 dark:to-indigo-400/10 text-gray-900 dark:text-white shadow-sm border border-sky-100 dark:border-sky-900' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white dark:hover:from-gray-800/50 dark:hover:to-gray-700/50 hover:text-gray-900 dark:hover:text-white hover:shadow-sm hover:border border-transparent hover:border-gray-100 dark:hover:border-gray-700'
                    }
                  `}
                >
                  <item.icon
                    className={`
                      mr-3 h-5 w-5 transition-all duration-200 ease-in-out
                      ${isActive 
                        ? 'text-sky-600 dark:text-sky-400' 
                        : 'text-gray-400 dark:text-gray-500 group-hover:text-sky-600 dark:group-hover:text-sky-400'
                      }
                    `}
                  />
                  <span className={`
                    transition-all duration-200
                    ${isActive
                      ? 'bg-gradient-to-r from-sky-600 to-indigo-600 dark:from-sky-400 dark:to-indigo-400 bg-clip-text text-transparent'
                      : 'group-hover:bg-gradient-to-r group-hover:from-sky-600 group-hover:to-indigo-600 dark:group-hover:from-sky-400 dark:group-hover:to-indigo-400 group-hover:bg-clip-text group-hover:text-transparent'
                    }
                  `}>
                    {item.name}
                  </span>
                </Link>
              );
            })}

            {/* Purchase Tokens Button */}
            <button
              onClick={() => setIsPurchaseModalOpen(true)}
              className="w-full group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ease-in-out text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-yellow-500/10 hover:to-amber-500/10 dark:hover:from-yellow-400/10 dark:hover:to-amber-400/10 hover:text-gray-900 dark:hover:text-white hover:shadow-sm hover:border border-transparent hover:border-yellow-100 dark:hover:border-yellow-900"
            >
              <Coins className="mr-3 h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-all duration-200" />
              <span className="group-hover:bg-gradient-to-r group-hover:from-yellow-600 group-hover:to-amber-600 dark:group-hover:from-yellow-400 dark:group-hover:to-amber-400 group-hover:bg-clip-text group-hover:text-transparent">
                Purchase Tokens
              </span>
            </button>
          </nav>

          {/* Footer Section */}
          <div className="flex-shrink-0 px-6 py-6 border-t border-gray-200/50 dark:border-gray-700/50">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gradient-to-r hover:from-red-500/10 hover:to-pink-500/10 dark:hover:from-red-400/10 dark:hover:to-pink-400/10 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 ease-in-out group hover:border border border-transparent hover:border-red-100 dark:hover:border-red-900"
            >
              <LogOut className="mr-3 h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-red-500 dark:group-hover:text-red-400 transition-all duration-200" />
              <span className="group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-pink-600 dark:group-hover:from-red-400 dark:group-hover:to-pink-400 group-hover:bg-clip-text group-hover:text-transparent">
                Sign out
              </span>
            </button>
          </div>
        </div>
      </div>

      <PurchaseTokenModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
      />
    </>
  );
};