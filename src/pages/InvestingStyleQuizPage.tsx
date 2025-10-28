import React from 'react';
import Logo from '../assets/logo.png';
import { BottomShade, FeaturedBadge, InvestingStyleCard } from '../components';

const InvestingStyleQuizPage: React.FC = () => {
    return (
        <div className="min-h-screen text-white relative" style={{ background: 'var(--bg-gradient)' }}>
            <BottomShade />
            <div className="w-[375px] mx-auto min-h-screen flex flex-col relative z-10">
                <div className="flex flex-col items-center pt-8 pb-4">
                    <div className="flex items-center space-x-3 mb-3">
                        <img src={Logo} alt="SabioTrade" width={230} height={80} />
                    </div>
                    <div className="flex space-x-3 w-full px-4">
                        <FeaturedBadge
                            className="flex-1"
                            icon={
                                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            }
                            text="Secure & Trusted"
                        />
                        <FeaturedBadge
                            className="flex-1"
                            icon={
                                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                            }
                            text="1M+ Learners"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-center px-4 mb-3">
                    <InvestingStyleCard />
                </div>

                {/* Footer Section */}
                <div className="text-center text-black text-xs px-4 pb-6 mb-20">
                    <p className="mb-1 text-white text-opacity-30">CODEVIL IT ENGINEERING LIMITED 2021-2025</p>
                    <p className="mb-1 text-white text-opacity-30">registered with company number 680139 at 2c,</p>
                    <p className="mb-1 text-white text-opacity-30">Grangegorman Lower, Smithfield, Dublin, Ireland,</p>
                    <p className="mb-4 text-white text-opacity-30">D07a433</p>
                    <div className="flex justify-center items-center space-x-2">
                        <span className="text-white">•</span>
                        <a href="https://sabiotrade.com/terms" className="underline text-white hover:text-white transition-colors">Terms & Conditions</a>
                        <span className="text-white">•</span>
                        <a href="https://sabiotrade.com/privacy" className="underline text-white hover:text-white transition-colors">Privacy Policy</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestingStyleQuizPage;
