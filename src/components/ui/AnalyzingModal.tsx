import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AmazonIcon from '../../assets/amazon.png';
import Analyzing from '../../assets/analyzing.png';
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
    selectedTopic?: string;
}

const AnalyzingModal: React.FC<AnalyzingModalProps> = ({ isOpen, onClose, selectedStocks, selectedTopic = "Risk and rewards" }) => {
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

    useEffect(() => {
        if (isOpen) {
            setVisibleItems([]);
            benefits.forEach((_, index) => {
                setTimeout(() => {
                    setVisibleItems((prev: number[]) => [...prev, index]);
                }, index * 300);
            });
        }
    }, [isOpen]);

    const handleNextStep = () => {
        onClose();
        navigate('/trading-quiz-extra');
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
        >
            <div
                className="relative w-[340px] rounded-2xl p-6 animate-fade-in scrollbar-hide"
                style={{
                    background: '#210742',
                    border: '1px solid rgba(125, 49, 216, 0.47)',
                    boxShadow: '2px 2px 13px 0px rgba(122, 75, 173, 0.6)',
                    maxHeight: '90vh',
                    overflowY: 'auto'
                }}
            >
                {/* Header with Close Button */}
                <div className="flex items-center justify-between mb-2">
                    <div className="flex-1 flex">
                        <h1 className="text-white text-[14px] font-bold">
                        You’re aligning with top performers — impressive calls!
                        </h1>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors flex-shrink-0"
                        aria-label="Close"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="mb-0">
                    <div className="flex items-center gap-2 mb-3">
                        <img src={TopicIcon} alt="Risk and Rewards" className="w-6 h-6 object-contain" />
                        <span className="text-white font-normal text-[12px]">Building the right path for you… Hold on</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                        {selectedStocks.map((stock) => {
                            const iconSrc = iconMap[stock.toLowerCase()];
                            return (
                                <div
                                    key={stock}
                                    className="px-3 py-1.5 rounded-full flex items-center gap-2"
                                    style={{
                                        background: '#1A0C4E',
                                        border: '1px solid #FFFFFF2E'
                                    }}
                                >
                                    {iconSrc && (
                                        <img src={iconSrc} alt={stock} className="w-4 h-4 object-contain" />
                                    )}
                                    <span className="text-white font-semibold text-sm">{stock}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Benefits List */}
                <div className="mb-6 space-y-2">
                    {benefits.map((benefit, index) => (
                        <div 
                            key={index} 
                            className={`flex items-center gap-3 transition-all duration-500 ${
                                visibleItems.includes(index) 
                                    ? 'opacity-100 translate-y-0' 
                                    : 'opacity-0 translate-y-2'
                            }`}
                        >
                            <div className="w-3 h-3 flex items-center justify-center">
                                {visibleItems.includes(index) && (
                                    <svg 
                                        className="w-3 h-3 text-green-400 animate-checkmark" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
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
                            <span className="text-white text-[14px]">{benefit}</span>
                        </div>
                    ))}
                </div>

                {/* Testimonial Image */}
                <div className="mb-6">
                    <div className="relative w-full rounded-xl overflow-hidden" style={{ height: 150 }}>
                        <img
                            src={Analyzing}
                            alt="Testimonial"
                            className="w-full h-full object-cover"
                            style={{ borderRadius: 16, height: 180 }}
                        />
                        <div
                            className="absolute left-0 top-0 w-full h-full"
                            style={{
                                background: 'rgba(24, 21, 49, 0.5)',
                            }}
                        />
                        <div
                            className="absolute left-0 bottom-0 w-full px-2 pb-2 flex items-center rounded-xl"
                            style={{
                                height: 'auto',
                                minHeight: 0,
                                paddingTop: 0,
                                background: 'linear-gradient(to top, #23224C, rgba(35,34,76,0.6) 40%, transparent 100%)',
                                zIndex: 10,
                            }}
                        >
                            <span
                                className="text-white text-[10px] font-semibold flex items-center w-full whitespace-nowrap overflow-hidden text-ellipsis justify-center"
                                style={{
                                    paddingLeft: 0,
                                    paddingRight: 0,
                                }}
                            >
                                <span className="mr-1 text-lg align-bottom" aria-hidden="true"></span>
                                "I used to panic at losses, Sabio taught me resilience."
                                <span className="ml-1 text-lg align-bottom" aria-hidden="true"></span>
                            </span>
                        </div>
                    </div>
                </div>
                <PrimaryButton
                    onClick={handleNextStep}
                    text="Next Step"
                    showIcon={true}
                />
            </div>

            <style>{`
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
                
                .animate-checkmark {
                    animation: checkmark 0.4s ease-out;
                }
            `}</style>
        </div>
    );
};

export default AnalyzingModal;

