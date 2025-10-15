import React from 'react';

interface PrimaryButtonProps {
    text?: string;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    text = 'PULSE',
    onClick,
    disabled = false,
    className = ''
}) => {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div className="relative inline-flex group">
                {/* Continuous Pulse Rings */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0FB084] to-[#2FA6B9] opacity-75 animate-pulse-ring"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0FB084] to-[#2FA6B9] opacity-50 animate-pulse-ring-delayed"></div>
                
                {/* Main Button */}
                <button
                    onClick={onClick}
                    disabled={disabled}
                    className={`
                        relative
                        px-8 py-4
                        bg-gradient-to-r from-[#0FB084] to-[#2FA6B9]
                        text-white font-bold text-lg
                        rounded-full
                        transition-transform duration-200
                        hover:scale-105
                        active:scale-95
                        disabled:opacity-50 disabled:cursor-not-allowed
                        shadow-lg shadow-[#0FB084]/50
                        z-10
                    `}
                >
                    <span className="relative z-10">{text}</span>
                </button>
            </div>

            <style>{`
                @keyframes pulse-ring {
                    0% {
                        transform: scale(0.95);
                        opacity: 0.75;
                    }
                    50% {
                        transform: scale(1.05);
                        opacity: 0.4;
                    }
                    100% {
                        transform: scale(1.15);
                        opacity: 0;
                    }
                }

                @keyframes pulse-ring-delayed {
                    0% {
                        transform: scale(0.95);
                        opacity: 0.5;
                    }
                    50% {
                        transform: scale(1.1);
                        opacity: 0.3;
                    }
                    100% {
                        transform: scale(1.2);
                        opacity: 0;
                    }
                }

                .animate-pulse-ring {
                    animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }

                .animate-pulse-ring-delayed {
                    animation: pulse-ring-delayed 2s cubic-bezier(0.4, 0, 0.6, 1) 0.5s infinite;
                }
            `}</style>
        </div>
    );
};

export default PrimaryButton;

