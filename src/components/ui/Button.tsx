import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false
}) => {
  const baseClasses = 'font-normal rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-[#0D8559] to-[#031340] border border-[#0D8559] text-white shadow-[0_4px_12px_rgba(13,133,89,0.3),0_0_8px_rgba(13,133,89,0.6)] hover:shadow-[0_6px_16px_rgba(13,133,89,0.4),0_0_12px_rgba(13,133,89,0.8)] hover:opacity-90 focus:ring-green-500',
    secondary: 'bg-gradient-to-r from-[#122F98] to-[#06154D] border border-[#122F98] text-white shadow-[0_4px_12px_rgba(18,47,152,0.3),0_0_8px_rgba(18,47,152,0.6)] hover:shadow-[0_6px_16px_rgba(18,47,152,0.4),0_0_12px_rgba(18,47,152,0.8)] hover:opacity-90 focus:ring-blue-500',
    outline: 'border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white focus:ring-teal-500'
  };
  
  const sizeClasses = {
    sm: 'px-4 h-[41px] text-[14px] font-regular',
    md: 'px-6 h-[41px] text-[15px] font-regular',
    lg: 'px-8 h-[41px] text-[16px] font-regular'
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
