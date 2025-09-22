import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface GlowingButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  disabled?: boolean;
  className?: string;
}

const GlowingButton: React.FC<GlowingButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  disabled = false,
  className = '',
}) => {
  const baseClasses = 'relative overflow-hidden font-semibold transition-all duration-300 rounded-lg flex items-center justify-center gap-2';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-neon-blue to-neon-cyan text-dark-bg hover:from-neon-cyan hover:to-neon-blue shadow-lg hover:shadow-neon-blue/50',
    secondary: 'bg-dark-card border border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-dark-bg shadow-lg hover:shadow-neon-blue/30',
    outline: 'border-2 border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-dark-bg shadow-lg hover:shadow-neon-blue/30',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {Icon && <Icon size={20} />}
      {children}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000" />
    </motion.button>
  );
};

export default GlowingButton;