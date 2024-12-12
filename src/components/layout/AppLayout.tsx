import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from '../Navbar';
import { Sidebar } from './Sidebar';
import { FooterSection } from '../footer/FooterSection';
import { LandingPage } from '../../pages/LandingPage';
import { LoginPage } from '../../pages/LoginPage';
import { SignupPage } from '../../pages/SignupPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { PodcastsPage } from '../../pages/PodcastsPage';
import { SettingsPage } from '../../pages/SettingsPage';
import { PricingPage } from '../../pages/PricingPage';
import { DemoPage } from '../../pages/DemoPage';
import { useAuthContext } from '../../contexts/AuthContext';

const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { user } = useAuthContext();
  return user ? element : <Navigate to="/login" replace />;
};

const PublicRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { user } = useAuthContext();
  return user ? <Navigate to="/dashboard" replace /> : element;
};

export const AppLayout: React.FC = () => {
  const { user } = useAuthContext();
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const showFooter = isLandingPage && !user;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {console.log(user)}
      {user && <Sidebar />}
      <div className={user ? 'lg:pl-64' : ''}>
        <main className="flex-1">
          <Routes>
            {/* Public routes - redirect to dashboard if logged in */}
            <Route path="/" element={<PublicRoute element={<LandingPage />} />} />
            <Route path="/login" element={<PublicRoute element={<LoginPage />} />} />
            <Route path="/signup" element={<PublicRoute element={<SignupPage />} />} />
            <Route path="/pricing" element={<PublicRoute element={<PricingPage />} />} />
            <Route path="/demo" element={<PublicRoute element={<DemoPage />} />} />

            {/* Protected routes - require authentication */}
            <Route path="/dashboard" element={<ProtectedRoute element={<DashboardPage />} />} />
            <Route path="/podcasts" element={<ProtectedRoute element={<PodcastsPage />} />} />
            <Route path="/settings" element={<ProtectedRoute element={<SettingsPage />} />} />

            {/* Catch all route - redirect to dashboard if logged in, otherwise to landing page */}
            <Route path="*" element={
              user ? <Navigate to="/dashboard" replace /> : <Navigate to="/" replace />
            } />
          </Routes>
        </main>
      </div>
      {showFooter && <FooterSection />}
    </div>
  );
};