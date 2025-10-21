import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnimationVideo from '../assets/animation.mp4';
import Logo from '../assets/logo.png';
import SabioIntroImage from '../assets/sabio-intro-fig.png';
import { BottomShade, Card, PrimaryButton } from '../components';

const SabioIntroPage: React.FC = () => {
    const navigate = useNavigate();

    const handleContinueClick = () => {
        navigate('/trading-quiz-extra', { state: { questionList: 'advanced' } });
    };

    const handleCloseClick = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate(-1);
        }
    };

    return (
        <div className="min-h-screen text-white relative" style={{ background: 'var(--bg-gradient)' }}>
            <BottomShade />
            <div className="w-[375px] mx-auto min-h-screen flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-6 pb-4">
                    <img src={Logo} alt="SabioTrade" className="h-10" />
                    <button
                        onClick={handleCloseClick}
                        className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                        aria-label="Close"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Main Content */}
                <div className="flex-1 px-4 pb-6 flex flex-col">
                    <Card className="w-full max-w-sm mx-auto">

                        {/* Video Section */}
                        <div
                            className="w-full rounded-xl px-3 py-3 mb-4 flex items-center gap-3"
                            style={{
                                backgroundColor: '#031340',
                                border: '1px solid rgba(125, 49, 216, 0.47)',
                            }}
                        >
                            <div className="w-[35%] flex-shrink-0 rounded-lg overflow-hidden">
                                <video
                                    className="w-full h-auto object-cover"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    poster={SabioIntroImage}
                                >
                                    <source src="/path-to-your-video.mp4" type="video/mp4" />
                                    <img src={SabioIntroImage} alt="Trading" className="w-full h-auto" />
                                </video>
                            </div>

                            <div className="flex-1">
                                <p className="text-[#17F871] text-[14px] font-semibold leading-tight">
                                    You're 1 step away from the start of your trading experience
                                </p>
                            </div>
                        </div>

                        {/* Description Text */}
                        <div className="mb-4">
                            <p className="text-white/70 text-[13px] leading-relaxed text-center">
                                Here at Sabio Academy, we do things differently. Forget classic trading where you're just left to figure it out. We believe in preparation and training first.
                            </p>
                        </div>

                        {/* Main Message Section with Video Background */}
                        <div
                            className="w-full rounded-xl mb-4 relative overflow-hidden"
                            style={{
                                border: '1px solid rgba(125, 49, 216, 0.47)',
                                height: '160px',
                            }}
                        >
                            {/* Background Video */}
                            <video
                                className="absolute inset-0 w-full h-full object-cover"
                                autoPlay
                                loop
                                muted
                                playsInline
                            >
                                <source src={AnimationVideo} type="video/mp4" />
                            </video>

                            {/* Black Opacity Overlay */}
                            <div className="absolute inset-0 bg-black/40"></div>

                            {/* Centered Text Content */}
                            <div className="relative z-10 flex items-center justify-center min-h-[200px] px-4 py-6">
                                <div className="text-center">
                                    <p className="text-white/80 text-[13px] font-normal">
                                        Our job is to teach you how to trade with our money
                                    </p>
                                    <h2 className="text-white text-[22px] font-bold leading-tight mb-2">
                                        You're so close!
                                    </h2>

                                </div>
                            </div>
                        </div>

                        {/* Bottom Description */}
                        <div className="mb-0">
                            <p className="text-white/70 text-[13px] leading-relaxed text-center">
                                Every day, we're crafting articles, market reviews, and practical trading guides, plus hands-on lessons to help you master everything from reading charts to profitable trading strategies.
                            </p>
                        </div>
                    </Card>

                    {/* Continue Button - Outside Card */}
                    <div className="px-4 mt-6 mb-20">
                        <PrimaryButton
                            onClick={handleContinueClick}
                            text="Continue"
                            showIcon={true}
                        />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SabioIntroPage;
