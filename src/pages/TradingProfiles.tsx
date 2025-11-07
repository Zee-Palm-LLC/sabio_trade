import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { PrimaryButton, ProgressCard, TabImageCarousel } from "../components";


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
        <div className="min-h-screen text-white relative" style={{ background: 'var(--bg-gradient)' }}>
            {/* <BottomShade /> */}
            <div className="w-full max-w-[375px] mx-auto flex flex-col px-4">
                <div className="flex flex-col items-center pt-4 pb-2">
                    <div className="flex items-center space-x-3 mb-1">
                        <img src={Logo} alt="SabioTrade" width={230} height={80} />
                    </div>
                </div>
                <ProgressCard
                    progress={progress}
                    topText="1,000,000+ trading profiles built — your personalized path is next."
                    bottomText="Creating the personal challenge and trading profile..."
                />
                <TabImageCarousel isPhone={true} />
                <div className="mt-6 mb-2 flex justify-center">
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