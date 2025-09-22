import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  hover = true 
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5, scale: 1.02 } : undefined}
      className={`
        backdrop-blur-lg bg-dark-card/70 border border-dark-border/50 
        rounded-xl shadow-lg shadow-black/20 transition-all duration-300
        hover:border-neon-blue/50 hover:shadow-neon-blue/10
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;