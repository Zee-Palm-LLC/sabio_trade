import React from 'react';
import { useNavigate } from 'react-router-dom';
import AmazonIcon from '../../assets/amazon.png';
import Analyzing from '../../assets/analyzing.png';
import AppleIcon from '../../assets/apple.png';
import ArrowRight from '../../assets/arrow-right.svg';
import BoeingIcon from '../../assets/boeing.png';
import GoogleIcon from '../../assets/google.png';
import MicrosoftIcon from '../../assets/microsoft.png';
import NetflixIcon from '../../assets/netflix.png';
import NvidiaIcon from '../../assets/nvidia.png';
import BulletIcon from '../../assets/star_bullet.png';
import TeslaIcon from '../../assets/tesla.png';
import TopicIcon from '../../assets/topic.png';

interface AnalyzingModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedStocks: string[];
    selectedTopic?: string;
}

const AnalyzingModal: React.FC<AnalyzingModalProps> = ({ isOpen, onClose, selectedStocks, selectedTopic = "Risk and rewards" }) => {
    const navigate = useNavigate();

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
        navigate('/sabio-intro');
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
        >
            <div
                className="relative w-[340px] rounded-2xl p-6 animate-fade-in scrollbar-hide"
                style={{
                    background: 'linear-gradient(180deg, #1A0F51 0%, #0B0729 100%)',
                    maxHeight: '90vh',
                    overflowY: 'auto'
                }}
            >
                {/* Header with Close Button */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex-1 flex">
                        <h2 className="text-white text-[18px] font-medium">
                            Analyzing your answers...
                        </h2>
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

                {/* Topic Section */}
                <div className="mb-0">
                    <div className="flex items-center gap-2 mb-3">
                        <img src={TopicIcon} alt="Risk and Rewards" className="w-6 h-6 object-contain" />
                        <span className="text-white font-normal">Topic: {selectedTopic}</span>
                    </div>

                    {/* Selected Stocks */}
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
                        <div key={index} className="flex items-center gap-3">
                            <img src={BulletIcon} alt="Bullet" className="w-3 h-3 object-contain" />
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
                        <div className="absolute left-0 bottom-0 w-full px-5 pb-2 flex items-center bg-gradient-to-t from-[#23224C] via-[#23224C99] to-transparent rounded-xl" style={{ height: 'auto', minHeight: 0, paddingTop: 0 }}>
                            <span className="text-white text-[10px] font-semibold flex items-center">
                                <span className="mr-1 text-lg align-bottom" aria-hidden="true"></span>
                                I used to panic at losses, Sabio taught me resilience.
                                <span className="ml-1 text-lg align-bottom" aria-hidden="true"></span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Next Step Button */}
                <button
                    onClick={handleNextStep}
                    className="w-full text-white font-semibold py-4 px-6 transition-colors duration-200 flex items-center justify-center"
                    style={{
                        borderRadius: 108,
                        background: 'linear-gradient(135deg, #0FB084 0%, #2FA6B9 100%)',
                    }}
                >
                    <span className="mr-2">Next Step</span>
                    <img src={ArrowRight} alt="Arrow Right" className="w-5 h-3" />
                </button>
            </div>
        </div>
    );
};

export default AnalyzingModal;

