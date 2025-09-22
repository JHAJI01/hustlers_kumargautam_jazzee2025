import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Heart, Stethoscope, UserCheck, ArrowRight, Shield, Zap, Globe, Play } from 'lucide-react';
import GlowingButton from '../common/GlowingButton';
import LanguageToggle from '../common/LanguageToggle';

interface LandingPageProps {
  onRoleSelect: (role: 'doctor' | 'patient') => void;
  onDemoMode?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onRoleSelect, onDemoMode }) => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Diagnosis',
      description: 'Advanced AI analyzes symptoms and provides intelligent recommendations',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your medical data is encrypted and protected with industry-leading security',
    },
    {
      icon: Globe,
      title: 'Multilingual Support',
      description: 'Available in multiple languages for better accessibility',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-surface to-dark-bg">
      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <Heart className="w-8 h-8 text-neon-blue" />
            <span className="text-2xl font-bold text-white">SwasthyaAI</span>
          </motion.div>
          <div className="flex items-center gap-4">
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              {t('welcome')}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-cyan">
                Healthcare Platform
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Experience the future of healthcare with AI-powered symptom analysis, 
              intelligent doctor matching, and seamless medical consultations.
            </p>
          </motion.div>

          {/* Role Selection */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              {t('chooserole')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Patient Card */}
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onRoleSelect('patient')}
                className="group cursor-pointer"
              >
                <div className="backdrop-blur-lg bg-dark-card/70 border border-dark-border/50 rounded-2xl p-8 text-center hover:border-neon-blue/50 transition-all duration-300 h-full">
                  <div className="w-20 h-20 bg-gradient-to-br from-neon-blue to-neon-cyan rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <UserCheck size={32} className="text-dark-bg" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{t('patient')}</h3>
                  <p className="text-gray-300 mb-6">{t('patientdesc')}</p>
                  <div className="space-y-2 text-sm text-gray-400 mb-6">
                    <p>• AI symptom analysis</p>
                    <p>• Smart doctor matching</p>
                    <p>• Medical record management</p>
                    <p>• Appointment booking</p>
                  </div>
                  <GlowingButton
                    className="w-full group-hover:from-neon-cyan group-hover:to-neon-blue"
                    size="lg"
                    icon={ArrowRight}
                  >
                    Continue as Patient
                  </GlowingButton>
                </div>
              </motion.div>

              {/* Doctor Card */}
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onRoleSelect('doctor')}
                className="group cursor-pointer"
              >
                <div className="backdrop-blur-lg bg-dark-card/70 border border-dark-border/50 rounded-2xl p-8 text-center hover:border-neon-blue/50 transition-all duration-300 h-full">
                  <div className="w-20 h-20 bg-gradient-to-br from-neon-cyan to-neon-blue rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Stethoscope size={32} className="text-dark-bg" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{t('doctor')}</h3>
                  <p className="text-gray-300 mb-6">{t('doctordesc')}</p>
                  <div className="space-y-2 text-sm text-gray-400 mb-6">
                    <p>• Patient management dashboard</p>
                    <p>• AI-assisted diagnostics</p>
                    <p>• Appointment scheduling</p>
                    <p>• Medical record access</p>
                  </div>
                  <GlowingButton
                    variant="outline"
                    className="w-full group-hover:bg-neon-blue group-hover:text-dark-bg"
                    size="lg"
                    icon={ArrowRight}
                  >
                    Continue as Doctor
                  </GlowingButton>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index }}
                  className="backdrop-blur-lg bg-dark-card/50 border border-dark-border/50 rounded-xl p-6 text-center hover:border-neon-blue/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-neon-cyan rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-dark-bg" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </main>

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-neon-blue/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-neon-cyan/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-neon-blue/10 to-neon-cyan/10 rounded-full blur-3xl animate-float"></div>
      </div>
    </div>
  );
};

export default LandingPage;