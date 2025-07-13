import React from 'react';
import { motion } from 'framer-motion';

interface BadgeProps {
  count?: number;
  maxCount?: number;
  dot?: boolean;
  color?: 'red' | 'blue' | 'green' | 'yellow';
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
  animationType?: 'pulse' | 'bounce';
  className?: string;
  children: React.ReactNode;
}

const colorClasses = {
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
};

const sizeClasses = {
  sm: 'w-4 h-4 text-xs',
  md: 'w-5 h-5 text-sm',
  lg: 'w-6 h-6 text-base',
};

const animations = {
  pulse: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
    },
  },
  bounce: {
    y: [0, -5, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
    },
  },
};

export default function Badge({
  count,
  maxCount = 99,
  dot = false,
  color = 'red',
  size = 'md',
  animate = false,
  animationType = 'pulse',
  className = '',
  children,
}: BadgeProps) {
  const displayCount = count !== undefined && count > maxCount ? `${maxCount}+` : count;

  const BadgeContent = () => (
    <div
      className={`absolute -top-2 -right-2 ${sizeClasses[size]} ${
        colorClasses[color]
      } rounded-full flex items-center justify-center ${
        dot ? '' : 'font-bold text-white'
      } shadow-lg ${className}`}
    >
      {!dot && displayCount}
    </div>
  );

  return (
    <div className="relative inline-block">
      {children}
      {animate ? (
        <motion.div animate={animations[animationType]} className='absolute top-0 right-0'>
          <BadgeContent />
        </motion.div>
      ) : (
        <BadgeContent />
      )}
    </div>
  );
}