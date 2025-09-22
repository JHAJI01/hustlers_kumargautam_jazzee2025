import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface FloatingInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  icon?: LucideIcon;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  placeholder?: string;
}

const FloatingInput: React.FC<FloatingInputProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  icon: Icon,
  required = false,
  disabled = false,
  error,
  placeholder,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;
  const isFloating = isFocused || hasValue;

  return (
    <div className="relative">
      <div className="relative">
        {Icon && (
          <Icon
            size={20}
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
              isFocused ? 'text-neon-blue' : 'text-gray-500'
            }`}
          />
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          disabled={disabled}
          placeholder={isFocused ? placeholder : ''}
          className={`w-full h-14 px-4 ${Icon ? 'pl-12' : ''} bg-dark-card border border-dark-border rounded-lg 
            text-white transition-all duration-300 outline-none
            ${isFocused ? 'border-neon-blue shadow-lg shadow-neon-blue/20' : ''}
            ${error ? 'border-red-500' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        />
        <motion.label
          initial={false}
          animate={{
            top: isFloating ? 8 : '50%',
            fontSize: isFloating ? '0.75rem' : '1rem',
            color: error ? '#ef4444' : isFocused ? '#00d4ff' : '#9ca3af',
            transform: isFloating ? 'translateY(0)' : 'translateY(-50%)',
          }}
          transition={{ duration: 0.2 }}
          className={`absolute ${Icon ? 'left-12' : 'left-4'} pointer-events-none font-medium`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </motion.label>
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default FloatingInput;