import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  style
}) => {
  const baseClasses = 'rounded-[12px]';
  
  const paddingClasses = {
    sm: 'px-2 py-4',
    md: 'px-2 py-6',
    lg: 'px-2 py-8'
  };
  
  return (
    <div 
      className={`${baseClasses} ${paddingClasses[padding]} ${className}`}
      style={{ 
        background: 'rgba(52, 8, 99, 0.46)',
        border: '1px solid rgba(125, 49, 216, 0.47)',
        boxShadow: '2px 2px 13px 0px rgba(122, 75, 173, 0.66)',
        ...style 
      }}
    >
      {children}
    </div>
  );
};

export default Card;
