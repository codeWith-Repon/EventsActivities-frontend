'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HeroTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  gradient?: boolean;
}

const HeroText: React.FC<HeroTextProps> = ({
  children,
  className = '',
  delay = 0,
  gradient = false,
}) => {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] ${
        gradient
          ? 'text-transparent bg-clip-text bg-linear-to-r from-primary to-primary-light'
          : ''
      } ${className}`}
    >
      {children}
    </motion.h1>
  );
};

export default HeroText;
