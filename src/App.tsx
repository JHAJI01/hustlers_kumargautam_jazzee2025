import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './i18n';

// Components
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import LandingPage from './components/landing/LandingPage';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import PatientDashboard from './components/dashboard/PatientDashboard';
import DoctorDashboard from './components/dashboard/DoctorDashboard';
import SymptomChecker from './components/symptoms/SymptomChecker';
import AppointmentBooking from './components/appointments/AppointmentBooking';
import ReportUpload from './components/reports/ReportUpload';
import LoadingSpinner from './components/common/LoadingSpinner';

// Services & Types
import { AuthService } from './services/authService';
import { User, Patient, Doctor } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'signup' | 'dashboard'>('landing');
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const currentUser = await AuthService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setCurrentView('dashboard');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSelect = (role: 'doctor' | 'patient') => {
    setCurrentView('login');
  };

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setCurrentView('dashboard');
    setActiveTab('dashboard');
  };

  const handleSignup = (newUser: User) => {
    setUser(newUser);
    setCurrentView('dashboard');
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('landing');
    setActiveTab('dashboard');
  };

  const renderMainContent = () => {
    if (!user) return null;

    switch (activeTab) {
      case 'dashboard':
        return user.role === 'patient' ? (
          <PatientDashboard patient={user as Patient} />
        ) : (
          <DoctorDashboard doctor={user as Doctor} />
        );
      case 'symptoms':
        return user.role === 'patient' ? <SymptomChecker /> : null;
      case 'appointments':
        return <AppointmentBooking />;
      case 'reports':
        return <ReportUpload />;
      case 'patients':
        return user.role === 'doctor' ? (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-white mb-6">Patient Management</h1>
            <p className="text-gray-400">Patient management interface coming soon...</p>
          </div>
        ) : null;
      case 'settings':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-white mb-6">Settings</h1>
            <p className="text-gray-400">Settings interface coming soon...</p>
          </div>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="text-white mt-4">Loading SwasthyaAI...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <AnimatePresence mode="wait">
        {currentView === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LandingPage onRoleSelect={handleRoleSelect} />
          </motion.div>
        )}

        {currentView === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-surface to-dark-bg flex items-center justify-center p-6"
          >
            <div className="w-full max-w-md">
              <LoginForm
                onLogin={handleLogin}
                onSwitchToSignup={() => setCurrentView('signup')}
              />
              <div className="text-center mt-6">
                <button
                  onClick={() => setCurrentView('landing')}
                  className="text-gray-400 hover:text-neon-blue transition-colors"
                >
                  ← Back to home
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {currentView === 'signup' && (
          <motion.div
            key="signup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-surface to-dark-bg flex items-center justify-center p-6"
          >
            <div className="w-full max-w-md">
              <SignupForm
                onSignup={handleSignup}
                onSwitchToLogin={() => setCurrentView('login')}
              />
              <div className="text-center mt-6">
                <button
                  onClick={() => setCurrentView('landing')}
                  className="text-gray-400 hover:text-neon-blue transition-colors"
                >
                  ← Back to home
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {currentView === 'dashboard' && user && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col"
          >
            <Header user={user} onLogout={handleLogout} />
            <div className="flex flex-1">
              <Sidebar
                user={user}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
              <main className="flex-1 overflow-auto">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderMainContent()}
                </motion.div>
              </main>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-neon-blue/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-neon-cyan/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>
    </div>
  );
}

export default App;