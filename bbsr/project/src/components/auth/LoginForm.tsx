import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import FloatingInput from '../common/FloatingInput';
import GlowingButton from '../common/GlowingButton';
import LoadingSpinner from '../common/LoadingSpinner';
import { AuthService } from '../../services/authService';
import { User } from '../../types';

interface LoginFormProps {
  onLogin: (user: User) => void;
  onSwitchToSignup: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onSwitchToSignup }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const user = await AuthService.login(email, password);
      AuthService.setCurrentUser(user);
      onLogin(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (role: 'patient' | 'doctor') => {
    setIsLoading(true);
    try {
      const demoCredentials = {
        patient: { email: 'patient@example.com', password: 'password123' },
        doctor: { email: 'doctor@example.com', password: 'password123' },
      };
      
      const user = await AuthService.login(
        demoCredentials[role].email,
        demoCredentials[role].password
      );
      AuthService.setCurrentUser(user);
      onLogin(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Demo login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="backdrop-blur-lg bg-dark-card/70 border border-dark-border/50 rounded-xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">{t('login')}</h2>
          <p className="text-gray-400">Access your SwasthyaAI account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FloatingInput
            label={t('email')}
            type="email"
            value={email}
            onChange={setEmail}
            icon={Mail}
            required
            error={error && error.includes('email') ? error : undefined}
          />

          <div className="relative">
            <FloatingInput
              label={t('password')}
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={setPassword}
              icon={Lock}
              required
              error={error && error.includes('password') ? error : undefined}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-neon-blue transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
            >
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}

          <GlowingButton
            type="submit"
            disabled={isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading ? <LoadingSpinner size="sm" /> : t('login')}
          </GlowingButton>
        </form>

        <div className="mt-6">
          <div className="flex items-center justify-center">
            <div className="border-t border-dark-border flex-1"></div>
            <span className="px-4 text-gray-400 text-sm">or try demo</span>
            <div className="border-t border-dark-border flex-1"></div>
          </div>
          
          <div className="mt-4 space-y-2">
            <button
              onClick={() => handleDemoLogin('patient')}
              disabled={isLoading}
              className="w-full p-3 bg-dark-surface border border-dark-border text-white rounded-lg hover:border-neon-blue/50 transition-colors"
            >
              Demo Patient Login
            </button>
            <button
              onClick={() => handleDemoLogin('doctor')}
              disabled={isLoading}
              className="w-full p-3 bg-dark-surface border border-dark-border text-white rounded-lg hover:border-neon-blue/50 transition-colors"
            >
              Demo Doctor Login
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onSwitchToSignup}
            className="text-gray-400 hover:text-neon-blue transition-colors"
          >
            {t('noAccount')} <span className="text-neon-blue font-medium">Sign up</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginForm;