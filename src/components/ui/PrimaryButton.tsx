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
    className = ''
}) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <div className={`w-full ${className}`}>
            <div className="relative w-full group">
                {/* Pulse Rings - Only on Hover */}
                {isHovered && !disabled && (
                    <>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0FB084] to-[#2FA6B9] opacity-75 animate-pulse-ring" style={{ borderRadius: 108 }}></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0FB084] to-[#2FA6B9] opacity-50 animate-pulse-ring-delayed" style={{ borderRadius: 108 }}></div>
                    </>
                )}
                
                {/* Main Button */}
                <button
                    onClick={onClick}
                    disabled={disabled}
                    onMouseEnter={() => !disabled && setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={`
                        relative
                        w-full
                        px-6 py-4
                        bg-gradient-to-r from-[#0FB084] to-[#2FA6B9]
                        text-white font-semibold text-base
                        transition-transform duration-200
                        hover:scale-105
                        active:scale-95
                        disabled:opacity-50 disabled:cursor-not-allowed
                        shadow-lg shadow-[#0FB084]/50
                        z-10
                        flex items-center justify-center
                    `}
                    style={{ borderRadius: 108, paddingTop: 12, paddingBottom: 12 }}
                >
                    <span className="relative z-10 mr-2">{text}</span>
                    {showIcon && <img src={ArrowRight} alt="Arrow Right" className="w-5 h-3 relative z-10" />}
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

