import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'info';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  icon,
  variant = 'default',
  className = ''
}) => {
  const baseClasses = 'flex items-center px-4 py-2 rounded-full text-sm font-medium';
  
  const variantClasses = {
    default: 'bg-navy-800 border border-teal-600 text-white',
    success: 'bg-green-900 border border-green-600 text-green-100',
    warning: 'bg-yellow-900 border border-yellow-600 text-yellow-100',
    info: 'bg-blue-900 border border-blue-600 text-blue-100'
  };
  
  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </div>
  );
};

export default Badge;
