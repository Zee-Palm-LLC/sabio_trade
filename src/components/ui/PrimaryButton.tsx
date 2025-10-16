import React from 'react';
import ArrowRight from '../../assets/arrow-right.svg';

interface PrimaryButtonProps {
  text?: string;
  showIcon?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  text = 'Continue',
  showIcon = true,
  onClick,
  disabled = false,
  className = '',
}) => {
  return (
    <div className={`w-full ${className}`}>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          relative
          w-full
          px-6 py-3
          text-white font-semibold text-base
          disabled:cursor-not-allowed
          flex items-center justify-center
          overflow-hidden
          rounded-full
          transition-all duration-300
        `}
        style={{
          borderRadius: 108,
          background: disabled
            ? 'linear-gradient(148.92deg, #31403C -2.62%, #2F4242 142.49%)'
            : 'linear-gradient(to right, #0FB084, #2FA6B9)',
          boxShadow: disabled
            ? 'none'
            : '0 10px 15px -3px rgba(15, 176, 132, 0.5), 0 4px 6px -2px rgba(15, 176, 132, 0.3)',
        }}
        onMouseEnter={(e) => {
          if (!disabled) {
            const reflection = e.currentTarget.querySelector('.reflection-layer') as HTMLElement;
            if (reflection) {
              // Start from left (off-screen)
              reflection.style.backgroundPositionX = '-1000px';
              // Force a reflow
              reflection.offsetHeight;
              // Animate to right (off-screen)
              reflection.style.backgroundPositionX = '1000px';
            }
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled) {
            const reflection = e.currentTarget.querySelector('.reflection-layer') as HTMLElement;
            if (reflection) {
              // Reset to starting position (completely hidden)
              reflection.style.backgroundPositionX = '-200px';
            }
          }
        }}
      >
         {/* Reflection Layer */}
         {!disabled && (
           <div
             className="reflection-layer absolute inset-0 overflow-hidden rounded-full pointer-events-none"
             style={{
               backgroundImage: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)',
               backgroundRepeat: 'no-repeat',
               backgroundSize: '200px 100%',
               backgroundPositionX: '-200px',
               transition: 'background-position-x 800ms ease-out'
             }}
           />
         )}

        <span className="relative mr-2 z-10">{text}</span>
        {showIcon && (
          <img
            src={ArrowRight}
            alt="Arrow Right"
            className="w-5 h-3 relative z-10"
          />
        )}
      </button>

    </div>
  );
};

export default PrimaryButton;
