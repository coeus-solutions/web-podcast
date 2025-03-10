import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PodcastProvider } from './contexts/PodcastContext';
import { ThemeProvider } from './contexts/ThemeContext';
import AppRoutes from './components/AppRoutes';
import { ToastContainer } from './components/common/Toast';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <PodcastProvider>
            <div className="min-h-screen dark:bg-gray-900">
              <AppRoutes />
              <ToastContainer />
            </div>
          </PodcastProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;