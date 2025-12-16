import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AmazonIcon from '../../assets/amazon.png';
import Analyzing from '../../assets/7.png';
import AppleIcon from '../../assets/apple.png';
import BoeingIcon from '../../assets/boeing.png';
import GoogleIcon from '../../assets/google.png';
import MicrosoftIcon from '../../assets/microsoft.png';
import NetflixIcon from '../../assets/netflix.png';
import NvidiaIcon from '../../assets/nvidia.png';
import TeslaIcon from '../../assets/tesla.png';
import TopicIcon from '../../assets/topic.png';
import PrimaryButton from './PrimaryButton';

interface AnalyzingModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedStocks: string[];
}

const AnalyzingModal: React.FC<AnalyzingModalProps> = ({ isOpen, onClose, selectedStocks }) => {
    const navigate = useNavigate();
    const [visibleItems, setVisibleItems] = useState<number[]>([]);

    const iconMap: Record<string, string> = {
        'nvidia': NvidiaIcon,
        'tesla': TeslaIcon,
        'apple': AppleIcon,
        'amazon': AmazonIcon,
        'google': GoogleIcon,
        'microsoft': MicrosoftIcon,
        'netflix': NetflixIcon,
        'boeing': BoeingIcon,
    };

    const benefits = [
        'Training & tips',
        'Personal learning plan',
        'Our Whatsapp group',
        'Free AI tools',
        'Bonus resources',
        'Psychological mastery'
    ];

    const handleNextStep = () => {
        onClose();
        navigate('/trading-quiz-extra');
    };

    // Auto-dismiss after 5 seconds
    useEffect(() => {
        if (isOpen) {
            setVisibleItems([]);
            benefits.forEach((_, index) => {
                setTimeout(() => {
                    setVisibleItems((prev: number[]) => [...prev, index]);
                }, index * 200);
            });

            // Auto-dismiss after 5 seconds
            const autoCloseTimer = setTimeout(() => {
                handleNextStep();
            }, 5000);

            return () => {
                clearTimeout(autoCloseTimer);
            };
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center animate-modal-fade-in"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)' }}
        >
            <div
                className="relative w-[340px] rounded-2xl p-4 animate-modal-slide-in"
                style={{
                    background: 'linear-gradient(135deg, #210742 0%, #1A0C4E 100%)',
                    border: '1px solid rgba(125, 49, 216, 0.6)',
                    boxShadow: '0 8px 32px rgba(125, 49, 216, 0.4), 0 0 20px rgba(23, 248, 113, 0.2)',
                    maxHeight: '90vh',
                    overflowY: 'auto'
                }}
            >
                {/* Header - No X button */}
                <div className="text-center mb-3">
                    <h1 className="text-white text-[14px] font-semibold">
                        You're aligning with top performers — impressive calls!
                    </h1>
                </div>
                {/* Building Path Banner */}
                <div className="mb-3 relative flex items-center gap-2">
                    
                    {/* Circular Icon */}
                    <img src={TopicIcon} alt="Topic Icon" className="w-6 h-6 object-contain flex-shrink-0 ml-2" />

                    {/* Text */}
                    <span className="text-white text-[12px] font-medium">
                        Building the right path for you... Hold on
                    </span>
                </div>

                {/* Selected Stocks - Tight Grid */}
                <div className="mb-3">
                    <div className="grid grid-cols-3 gap-1.5">
                        {selectedStocks.map((stock) => {
                            const iconSrc = iconMap[stock.toLowerCase()];
                            return (
                                <div
                                    key={stock}
                                    className="px-2 py-1.5 rounded-lg flex flex-row items-center justify-start gap-1.5 transition-all duration-300 hover:scale-105"
                                    style={{
                                        background: 'rgba(26, 12, 78, 0.8)',
                                        border: '1px solid rgba(255, 255, 255, 0.15)',
                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                                    }}
                                >
                                    {iconSrc && (
                                        <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                                            <img src={iconSrc} alt={stock} className="w-3.5 h-3.5 object-contain" />
                                        </div>
                                    )}
                                    <span className="text-white font-semibold text-[11px] truncate whitespace-nowrap">{stock}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Benefits List - Consistent Padding */}
                <div className="mb-3 space-y-1.5">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className={`flex items-center gap-2 px-1 transition-all duration-300 ${visibleItems.includes(index)
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 -translate-x-2'
                                }`}
                        >
                            <div className="w-3 h-3 flex items-center justify-center flex-shrink-0">
                                {visibleItems.includes(index) && (
                                    <svg
                                        className="w-3 h-3 text-[#17F871] animate-checkmark"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        style={{
                                            filter: 'drop-shadow(0 0 4px rgba(23, 248, 113, 0.6))',
                                        }}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={3}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                )}
                            </div>
                            <span className="text-white text-[13px]">{benefit}</span>
                        </div>
                    ))}
                </div>

                {/* Centered Character Image + Quote */}
                <div className="mb-3 flex flex-col items-center">
                    <div className="relative w-full rounded-xl overflow-hidden" style={{ height: 120 }}>
                        <img
                            src={Analyzing}
                            alt="Testimonial"
                            className="w-full h-full object-cover rounded-xl transition-transform duration-500 hover:scale-105"
                            style={{
                                filter: 'brightness(0.9)',
                            }}
                        />
                        <div
                            className="absolute left-0 top-0 w-full h-full rounded-xl"
                            style={{
                                background: 'linear-gradient(to bottom, rgba(33, 7, 66, 0.3), rgba(33, 7, 66, 0.6))',
                            }}
                        />
                        <div
                            className="absolute left-0 bottom-0 w-full px-3 pb-2 flex items-center justify-center rounded-xl"
                            style={{
                                background: 'linear-gradient(to top, rgba(35, 34, 76, 0.9), rgba(35, 34, 76, 0.5) 60%, transparent 100%)',
                                zIndex: 10,
                            }}
                        >
                            <span
                                className="text-white text-[10px] font-medium text-center px-2"
                                style={{
                                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                                }}
                            >
                                "I used to panic at losses, Sabio taught me resilience."
                            </span>
                        </div>
                    </div>
                </div>

                {/* Next Step Button */}
                <PrimaryButton
                    onClick={handleNextStep}
                    text="Next Step"
                    showIcon={true}
                    className="w-full"
                />
            </div>

            <style>{`
                @keyframes modal-fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes modal-slide-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                @keyframes checkmark {
                    0% {
                        transform: scale(0);
                        opacity: 0;
                    }
                    50% {
                        transform: scale(1.2);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                
                .animate-modal-fade-in {
                    animation: modal-fade-in 0.3s ease-out;
                }

                .animate-modal-slide-in {
                    animation: modal-slide-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
                
                .animate-checkmark {
                    animation: checkmark 0.4s ease-out;
                }
            `}</style>
        </div>
    );
};

export default AnalyzingModal;
