import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { BackButton, BottomShade, PrimaryButton, TestimonialCard } from '../components';

const WelcomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleSubmitClick = () => {
        navigate('/quiz-extra');
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
                        <div className="flex-shrink-0" style={{ width: 35, height: 35 }}></div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col px-0">
                    {/* Title - Left Aligned */}
                    <div className="mb-8">
                        <h1 className="text-white text-4xl font-bold leading-tight text-left">
                            You're doing<br />
                            amazing, thanks for<br />
                            sharing your answers!
                        </h1>
                    </div>

                    {/* Body Text - Left Aligned */}
                    <div className="space-y-4 mb-6">
                        <p className="text-white/70 text-[15px] leading-relaxed">
                            Did you know that Sabio academy empowers investors like you with expert-led courses and unlimited mentorship to help you reach your financial goals faster?
                        </p>
                        <p className="text-white text-[15px] leading-relaxed font-semibold">
                            You're just 2 steps away from unlocking your full potential - and claiming your exclusive Sabio gift - no deposits, no strings attached!
                        </p>
                    </div>

                    {/* Carousel */}
                    <div className="mb-auto">
                        <TestimonialCard />
                    </div>
                </div>

                {/* Button */}
                <div className="pb-12 mt-auto">
                    <PrimaryButton
                        onClick={handleSubmitClick}
                        text="Submit now !"
                        showIcon={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
