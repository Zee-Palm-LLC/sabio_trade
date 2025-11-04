import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { BackButton, BottomShade } from '../components';

const SabioAcademyOfferPage: React.FC = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleEnrollClick = () => {
        console.log('Enroll clicked');
    };

    return (
        <div className="min-h-screen text-white relative" style={{ background: 'var(--bg-gradient)' }}>
            <BottomShade />
            <div className="w-[375px] mx-auto min-h-screen flex flex-col px-4 relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center pt-8 pb-4">
                    <div className="relative w-full px-0 mb-3 flex items-center">
                        <div className="flex-shrink-0">
                            <BackButton onClick={handleBackClick} />
                        </div>
                        <div className="flex-1 flex justify-center">
                            <img src={Logo} alt="SabioTrade" width={230} height={80} />
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col px-0">
                    {/* Headline */}
                    <div className="mb-6">
                        <h1 className="text-white text-2xl font-bold leading-tight text-left">
                            Join Sabio Academy - but hurry, this limited time offer won't last!
                        </h1>
                    </div>

                    {/* Price Display */}
                    <div className="mb-6 flex justify-center">
                        <div className="p-4 rounded-lg flex items-center justify-center" style={{ 
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            width: 'auto',
                            minWidth: '200px'
                        }}>
                            <div className="flex items-center justify-center space-x-4">
                                <span className="text-gray-300 text-lg relative inline-block">
                                    $480
                                    <span 
                                        className="absolute top-1/2 left-0 right-0"
                                        style={{
                                            transform: 'translateY(-50%) rotate(-12deg)',
                                            transformOrigin: 'center'
                                        }}
                                    >
                                        <div 
                                            className="w-full"
                                            style={{
                                                height: '2px',
                                                background: '#17F871',
                                                transform: 'scaleX(1.3)'
                                            }}
                                        />
                                    </span>
                                </span>
                                <span className="text-[#17F871] text-4xl font-bold">$89</span>
                            </div>
                        </div>
                    </div>

                    {/* Enroll Button */}
                    <div className="mb-8 flex justify-center">
                        <div style={{ width: 'auto', minWidth: '200px' }}>
                            <button
                                onClick={handleEnrollClick}
                                className="relative w-full px-6 py-3 text-white font-semibold text-base flex items-center justify-center overflow-hidden rounded-full transition-all duration-300"
                                style={{
                                    borderRadius: 108,
                                    background: 'linear-gradient(to right, #0FB084, #2FA6B9)',
                                    boxShadow: '0 10px 15px -3px rgba(15, 176, 132, 0.5), 0 4px 6px -2px rgba(15, 176, 132, 0.3)',
                                }}
                            >
                                <span className="relative z-10">Enroll now!</span>
                            </button>
                        </div>
                    </div>

                    {/* Don't miss out section */}
                    <div className="mb-6">
                        <h2 className="text-white text-sm font-semibold mb-4">Don't miss out:</h2>
                        <div className="space-y-3 text-[14px]">
                            {[
                                'Full Investing Course',
                                'Unlimited Course',
                                'Free Practice Account',
                                'Community Access',
                                'Pro Investing Tools'
                            ].map((item, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <div className="flex-shrink-0 w-3 h-3 rounded-full bg-[#17F871] flex items-center justify-center">
                                        <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-white">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Guarantee and CTA */}
                    <div className="space-y-4 mb-auto pb-12">
                        <p className="text-white/80 text-[15px] leading-relaxed">
                            2 week money back guarantee, no strings, no deposits, no risk.
                        </p>
                        <p className="text-white font-semibold text-[15px] leading-relaxed">
                            Smart investors act fast, start learning today and shape your future!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SabioAcademyOfferPage;

