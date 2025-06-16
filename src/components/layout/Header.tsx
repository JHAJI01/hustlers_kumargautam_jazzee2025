import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Heart, Bell, User, LogOut } from 'lucide-react';
import LanguageToggle from '../common/LanguageToggle';
import { AuthService } from '../../services/authService';
import { User as UserType } from '../../types';

interface HeaderProps {
  user: UserType | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const { t } = useTranslation();

  const handleLogout = async () => {
    await AuthService.logout();
    onLogout();
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-surface/80 backdrop-blur-lg border-b border-dark-border sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <motion.div
              whileHover={{ rotate: 10 }}
              className="flex items-center gap-2"
            >
              <Heart className="w-8 h-8 text-neon-blue" />
              <span className="text-xl font-bold text-white">SwasthyaAI</span>
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            <LanguageToggle />
            
            {user && (
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-gray-400 hover:text-neon-blue transition-colors"
                >
                  <Bell size={20} />
                </motion.button>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">{user.name}</p>
                    <p className="text-xs text-gray-400 capitalize">{user.role}</p>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-br from-neon-blue to-neon-cyan rounded-full flex items-center justify-center">
                    <User size={16} className="text-dark-bg" />
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                >
                  <LogOut size={20} />
                </motion.button>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;