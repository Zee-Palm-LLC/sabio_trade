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
  const baseClasses = 'rounded-[12px] shadow-xl';
  
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  return (
    <div 
      className={`${baseClasses} ${paddingClasses[padding]} ${className}`}
      style={{ 
        backgroundColor: 'var(--color-card-bg)',
        border: '1px solid rgba(125, 49, 216, 0.47)',
        ...style 
      }}
    >
      {children}
    </div>
  );
};

export default Card;
