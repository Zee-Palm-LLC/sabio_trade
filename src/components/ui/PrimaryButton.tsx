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
            >
                {/* Reflection Layer */}
                {!disabled && (
                    <div
                        className="reflection-layer animate-shimmer absolute inset-0 overflow-hidden rounded-full pointer-events-none"
             style={{
               backgroundImage: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)',
               backgroundRepeat: 'no-repeat',
               backgroundSize: '200px 100%',
               backgroundPositionX: '-200px'
             }}
                    />
                )}

                <span className="relative mr-2 z-10">{disabled ? 'Continue…' : text}</span>
                {showIcon && !disabled && (
                    <img
                        src={ArrowRight}
                        alt="Arrow Right"
                        className="w-5 h-3 relative z-10"
                    />
                )}
      </button>

      <style>{`
        @keyframes shimmer {
          0% {
            background-position-x: -500px;
          }
          100% {
            background-position-x: 1000px;
          }
        }

        .animate-shimmer {
          animation: shimmer 1.5s ease-in-out 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default PrimaryButton;
