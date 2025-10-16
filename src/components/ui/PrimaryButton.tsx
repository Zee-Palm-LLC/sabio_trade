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
    const [isClicked, setIsClicked] = React.useState(false);
    const [shouldBounce, setShouldBounce] = React.useState(false);

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
                    onClick={() => {
                        setIsClicked(true);
                        setTimeout(() => setIsClicked(false), 200);
                        onClick?.();
                    }}
                    disabled={disabled}
                    onMouseEnter={() => {
                        if (!disabled) {
                            setIsHovered(true);
                            setShouldBounce(true);
                            setTimeout(() => setShouldBounce(false), 800); // Reset after animation completes
                        }
                    }}
                    onMouseLeave={() => setIsHovered(false)}
                    className={`
                        relative
                        w-full
                        px-6 py-4
                        text-white font-semibold text-base
                        transition-transform duration-300 ease-out
                        disabled:cursor-not-allowed
                        z-10
                        flex items-center justify-center
                        ${shouldBounce ? 'animate-bounce-hover' : ''}
                        ${isClicked ? 'animate-click-bounce' : ''}
                    `}
                    style={{ 
                        borderRadius: 108, 
                        paddingTop: 12, 
                        paddingBottom: 12,
                        background: disabled 
                            ? 'linear-gradient(148.92deg, #31403C -2.62%, #2F4242 142.49%)'
                            : 'linear-gradient(to right, #0FB084, #2FA6B9)',
                        boxShadow: disabled 
                            ? 'none' 
                            : '0 10px 15px -3px rgba(15, 176, 132, 0.5), 0 4px 6px -2px rgba(15, 176, 132, 0.3)'
                    }}
                >
                    <span className="relative z-10 mr-2">{text}</span>
                    {showIcon && <img src={ArrowRight} alt="Arrow Right" className="w-5 h-3 relative z-10" />}
                </button>
            </div>

            <style>{`
                @keyframes pulse-ring {
                    0% {
                        transform: scale(0.95);
                        opacity: 0.8;
                    }
                    50% {
                        transform: scale(1.08);
                        opacity: 0.3;
                    }
                    100% {
                        transform: scale(1.2);
                        opacity: 0;
                    }
                }

                @keyframes pulse-ring-delayed {
                    0% {
                        transform: scale(0.95);
                        opacity: 0.6;
                    }
                    50% {
                        transform: scale(1.12);
                        opacity: 0.2;
                    }
                    100% {
                        transform: scale(1.25);
                        opacity: 0;
                    }
                }

                @keyframes bounce-hover {
                    0% {
                        transform: translateY(0) scale(1);
                    }
                    30% {
                        transform: translateY(-12px) scale(1.02);
                    }
                    70% {
                        transform: translateY(-8px) scale(1.01);
                    }
                    100% {
                        transform: translateY(0) scale(1);
                    }
                }

                @keyframes click-bounce {
                    0% {
                        transform: translateY(0) scale(1);
                    }
                    50% {
                        transform: translateY(-4px) scale(1.05);
                    }
                    100% {
                        transform: translateY(0) scale(1);
                    }
                }

                .animate-pulse-ring {
                    animation: pulse-ring 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }

                .animate-pulse-ring-delayed {
                    animation: pulse-ring-delayed 1s cubic-bezier(0.4, 0, 0.6, 1) 0.2s infinite;
                }

                .animate-bounce-hover {
                    animation: bounce-hover 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }

                .animate-click-bounce {
                    animation: click-bounce 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
            `}</style>
        </div>
    );
};

export default PrimaryButton;

