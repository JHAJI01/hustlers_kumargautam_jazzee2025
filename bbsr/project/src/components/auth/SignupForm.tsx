import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Phone, Eye, EyeOff, UserCheck, Stethoscope } from 'lucide-react';
import FloatingInput from '../common/FloatingInput';
import GlowingButton from '../common/GlowingButton';
import LoadingSpinner from '../common/LoadingSpinner';
import { AuthService } from '../../services/authService';
import { User as UserType } from '../../types';

interface SignupFormProps {
  onSignup: (user: UserType) => void;
  onSwitchToLogin: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignup, onSwitchToLogin }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'patient' as 'patient' | 'doctor',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.phone && !/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const user = await AuthService.signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phone: formData.phone || undefined,
      });
      
      AuthService.setCurrentUser(user);
      onSignup(user);
    } catch (err) {
      setErrors({ general: err instanceof Error ? err.message : 'Signup failed' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
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
          <h2 className="text-3xl font-bold text-white mb-2">{t('signup')}</h2>
          <p className="text-gray-400">Create your SwasthyaAI account</p>
        </div>

        {/* Role Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-white mb-3">
            I am a:
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleInputChange('role', 'patient')}
              className={`p-4 rounded-lg border transition-all duration-300 ${
                formData.role === 'patient'
                  ? 'bg-neon-blue/10 border-neon-blue text-neon-blue'
                  : 'bg-dark-surface border-dark-border text-white hover:border-neon-blue/50'
              }`}
            >
              <UserCheck className="w-6 h-6 mx-auto mb-2" />
              <p className="font-medium">Patient</p>
              <p className="text-xs opacity-70">Seeking medical care</p>
            </button>
            <button
              type="button"
              onClick={() => handleInputChange('role', 'doctor')}
              className={`p-4 rounded-lg border transition-all duration-300 ${
                formData.role === 'doctor'
                  ? 'bg-neon-blue/10 border-neon-blue text-neon-blue'
                  : 'bg-dark-surface border-dark-border text-white hover:border-neon-blue/50'
              }`}
            >
              <Stethoscope className="w-6 h-6 mx-auto mb-2" />
              <p className="font-medium">Doctor</p>
              <p className="text-xs opacity-70">Healthcare provider</p>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FloatingInput
            label={t('name')}
            type="text"
            value={formData.name}
            onChange={(value) => handleInputChange('name', value)}
            icon={User}
            required
            error={errors.name}
          />

          <FloatingInput
            label={t('email')}
            type="email"
            value={formData.email}
            onChange={(value) => handleInputChange('email', value)}
            icon={Mail}
            required
            error={errors.email}
          />

          <FloatingInput
            label={t('phone')}
            type="tel"
            value={formData.phone}
            onChange={(value) => handleInputChange('phone', value)}
            icon={Phone}
            error={errors.phone}
            placeholder="+1 (555) 123-4567"
          />

          <div className="relative">
            <FloatingInput
              label={t('password')}
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(value) => handleInputChange('password', value)}
              icon={Lock}
              required
              error={errors.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-neon-blue transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="relative">
            <FloatingInput
              label={t('confirmpassword')}
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(value) => handleInputChange('confirmPassword', value)}
              icon={Lock}
              required
              error={errors.confirmPassword}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-neon-blue transition-colors"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {formData.role === 'doctor' && (
            <div className="p-4 bg-orange-400/10 border border-orange-400/30 rounded-lg">
              <p className="text-orange-400 text-sm">
                <strong>Note:</strong> Doctor accounts require manual verification. 
                You'll receive an email once your credentials are verified.
              </p>
            </div>
          )}

          {errors.general && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
            >
              <p className="text-red-400 text-sm">{errors.general}</p>
            </motion.div>
          )}

          <GlowingButton
            type="submit"
            disabled={isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading ? <LoadingSpinner size="sm" /> : t('signup')}
          </GlowingButton>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={onSwitchToLogin}
            className="text-gray-400 hover:text-neon-blue transition-colors"
          >
            {t('alreadyaccount')} <span className="text-neon-blue font-medium">Login</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SignupForm;