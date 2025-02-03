import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import Layout from './Layout';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { PodcastsPage } from '../pages/PodcastsPage';
import { PodcastList } from './podcasts/PodcastList';
import { Settings } from './settings/Settings';
import { LandingPage } from '../pages/LandingPage';
import { PaymentSuccessPage } from '../pages/PaymentSuccessPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuthContext();
  return user ? <>{children}</> : <Navigate to="/" replace />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuthContext();
  return !user ? <>{children}</> : <Navigate to="/app/dashboard" replace />;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
      <Route path="/forgot-password" element={<PublicRoute><ForgotPasswordPage /></PublicRoute>} />
      <Route path="/app" element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route index element={<Navigate to="/app/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="podcasts" element={<PodcastList />} />
        <Route path="settings" element={<Settings />} />
        <Route path="podcasts/:id" element={<PodcastsPage />} />
      </Route>
      <Route path="/payment/success" element={<PrivateRoute><PaymentSuccessPage /></PrivateRoute>} />
    </Routes>
  );
};

export default AppRoutes; 