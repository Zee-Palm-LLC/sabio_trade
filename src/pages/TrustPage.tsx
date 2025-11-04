import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { BackButton, BottomShade, PrimaryButton } from '../components';

const TrustPage: React.FC = () => {
    const navigate = useNavigate();
    const handleContinueClick = () => {
        navigate('/question', { state: { questionList: 'basic' } });
    };

    const handleBackClick = () => {
        navigate(-1);
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
                    {/* Title */}
                    <h1 className="text-white text-3xl font-bold mb-6 leading-tight">
                        Why Sabio Academy?
                    </h1>

                    {/* Body Text */}
                    <div className="space-y-4 mb-6">
                        <p className="text-white/70 text-[15px] leading-relaxed">
                            Sabio academy offers amazing investing and wealth management courses with <span className="font-bold text-white">unlimited 1-on-1 mentorship</span> to help you grow faster and smarter.
                        </p>
                        <p className="text-white/70 text-[15px] leading-relaxed">
                            Our platform is European-based and <span className="font-bold text-white">fully regulated, trusted by a global community of 10,000+ traders.</span>
                        </p>
                    </div>

                    {/* Bullet Points */}
                    <div className="space-y-4 mb-6">
                        {/* Trophy Icon - Winner */}
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {/* Trophy base - wide rectangular base */}
                                    <rect x="4" y="19" width="16" height="3" rx="1" fill="#FFD700"/>
                                    {/* Trophy stem */}
                                    <rect x="11" y="15" width="2" height="4" fill="#FFD700"/>
                                    {/* Trophy cup - main bowl */}
                                    <path d="M8 8V15C8 15.5523 8.44772 16 9 16H15C15.5523 16 16 15.5523 16 15V8H8Z" fill="#FFD700"/>
                                    {/* Left handle */}
                                    <path d="M6 10C5.44772 10 5 10.4477 5 11V13C5 13.5523 5.44772 14 6 14C6.55228 14 7 13.5523 7 13V11C7 10.4477 6.55228 10 6 10Z" fill="#FFD700"/>
                                    {/* Right handle */}
                                    <path d="M18 10C17.4477 10 17 10.4477 17 11V13C17 13.5523 17.4477 14 18 14C18.5523 14 19 13.5523 19 13V11C19 10.4477 18.5523 10 18 10Z" fill="#FFD700"/>
                                    {/* Trophy top rim */}
                                    <path d="M7 8H17C17.5523 8 18 8.44772 18 9C18 9.55228 17.5523 10 17 10H7C6.44772 10 6 9.55228 6 9C6 8.44772 6.44772 8 7 8Z" fill="#FFA500"/>
                                </svg>
                            </div>
                            <span className="text-white text-[15px] leading-relaxed">
                                Winner – Best Prop Firm 2025
                            </span>
                        </div>

                        {/* Green Square Icon - Instant Payout */}
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="5" y="5" width="14" height="14" rx="1" fill="#17F871"/>
                                </svg>
                            </div>
                            <span className="text-white text-[15px] leading-relaxed">
                                Instant payout system trusted worldwide
                            </span>
                        </div>

                        {/* Document Icon - Company No */}
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {/* Document body */}
                                    <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" fill="#2FA6B9"/>
                                    {/* Folded corner */}
                                    <path d="M14 2V8H20L14 2Z" fill="#1E7A8C"/>
                                    {/* Lightning bolt / Z symbol */}
                                    <path d="M11 8L9 12H12L11 16L15 8H12L11 8Z" fill="white" opacity="0.9"/>
                                </svg>
                            </div>
                            <span className="text-white text-[15px] leading-relaxed">
                                Company No. 680139
                            </span>
                        </div>
                    </div>

                    {/* Call to Action Text */}
                    <p className="text-white text-[15px] leading-relaxed mb-auto">
                        Start your journey with Sabio today - where education meets real investing success.
                    </p>
                </div>

                {/* Button */}
                <div className="pb-12 mt-auto">
                    <PrimaryButton
                        onClick={handleContinueClick}
                        text="Let's start the quiz"
                        showIcon={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default TrustPage;
