import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ 
  message, 
  type = 'info', 
  duration = 5000, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const baseClasses = "fixed top-4 right-4 p-4 rounded-lg shadow-lg transform transition-all duration-300 flex items-center gap-2 max-w-md z-50";
  const typeClasses = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-white",
    info: "bg-blue-500 text-white"
  };

  return createPortal(
    <div 
      className={`${baseClasses} ${typeClasses[type]} ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
      }`}
      role="alert"
    >
      <span className="flex-1">{message}</span>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        className="p-1 hover:opacity-80 transition-opacity"
        aria-label="Close"
      >
        <X size={16} />
      </button>
    </div>,
    document.body
  );
};

// Toast manager to handle multiple toasts
type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

class ToastManager {
  private static instance: ToastManager;
  private toasts: ToastMessage[] = [];
  private listeners: ((toasts: ToastMessage[]) => void)[] = [];

  private constructor() {}

  static getInstance(): ToastManager {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager();
    }
    return ToastManager.instance;
  }

  subscribe(listener: (toasts: ToastMessage[]) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener([...this.toasts]));
  }

  show(message: string, type: ToastType = 'info') {
    const toast = {
      id: Date.now(),
      message,
      type
    };
    this.toasts.push(toast);
    this.notify();

    // Auto remove after 5 seconds
    setTimeout(() => {
      this.remove(toast.id);
    }, 5000);
  }

  remove(id: number) {
    this.toasts = this.toasts.filter(t => t.id !== id);
    this.notify();
  }
}

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const unsubscribe = ToastManager.getInstance().subscribe(setToasts);
    return unsubscribe;
  }, []);

  return (
    <>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => ToastManager.getInstance().remove(toast.id)}
        />
      ))}
    </>
  );
};

export const toast = {
  show: (message: string, type: ToastType = 'info') => {
    ToastManager.getInstance().show(message, type);
  },
  error: (message: string) => ToastManager.getInstance().show(message, 'error'),
  success: (message: string) => ToastManager.getInstance().show(message, 'success'),
  warning: (message: string) => ToastManager.getInstance().show(message, 'warning'),
  info: (message: string) => ToastManager.getInstance().show(message, 'info'),
}; 