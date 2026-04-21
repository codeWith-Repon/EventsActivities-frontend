import React from 'react';

interface HeroTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  gradient?: boolean;
}

const HeroText: React.FC<HeroTextProps> = ({
  children,
  className = '',
  gradient = false,
}) => {
  return (
    <h1
      className={`text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] ${
        gradient
          ? 'text-transparent bg-clip-text bg-linear-to-r from-primary to-primary-light'
          : ''
      } ${className}`}
    >
      {children}
    </h1>
  );
};

export default HeroText;
