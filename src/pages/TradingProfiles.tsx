import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { PrimaryButton, ProgressCard, TestimonialCard } from "../components";


const TradingProfiles: React.FC = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    useEffect(() => {
        const duration = 3000; // 3 seconds to reach 100%
        const intervalTime = 30; // Update every 30ms
        const increment = (100 / duration) * intervalTime;

        const interval = setInterval(() => {
            setProgress(prev => {
                const next = prev + increment;
                if (next >= 100) {
                    clearInterval(interval);
                    setIsButtonEnabled(true);
                    return 100;
                }
                return next;
            });
        }, intervalTime);

        return () => clearInterval(interval);
    }, []);

    const handleContinueClick = () => {
        navigate('/your-trader-profile');
    }
    return (
        <div className="min-h-screen text-white" style={{ background: 'var(--bg-gradient)' }}>
            <div className="w-full max-w-[375px] mx-auto min-h-screen flex flex-col px-4">
                <div className="flex flex-col items-center pt-8 pb-4">
                    <div className="flex items-center space-x-3 mb-3">
                        <img src={Logo} alt="SabioTrade" className=" h-14" />
                    </div>
                </div>
                <ProgressCard
                    progress={progress}
                    topText="1,000,000+ trading profiles built — your personalized path is next."
                    bottomText="Creating the personal challenge and trading profile..."
                />
                <TestimonialCard />
                <div className="pt-10 pb-6">
                    <PrimaryButton
                        onClick={handleContinueClick}
                        text="Next Step"
                        showIcon={true}
                        disabled={!isButtonEnabled}
                    />

                </div>

            </div>
        </div>
    );

}

export default TradingProfiles;