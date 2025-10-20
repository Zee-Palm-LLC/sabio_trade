import React from "react";
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import ScoreIcon from '../assets/score.svg';
import { PrimaryButton, ScoreBreakdownCard, TraderProfileCard } from "../components";


const YourTraderProfile: React.FC = () => {
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate('/quiz-extra', { state: { fromProfile: true } });
    };

    return (
        <div className="min-h-screen text-white" style={{ background: 'var(--bg-gradient)' }}>
            <div className="w-[375px] mx-auto min-h-screen flex flex-col px-4">
                {/* Header */}
                <div className="flex flex-col items-center pt-8 pb-4">
                    <div className="flex items-center space-x-3 mb-3">
                        <img src={Logo} alt="SabioTrade" className="h-14" />
                    </div>
                </div>

                {/* Trader Profile Card */}
                <div className="mb-4">
                    <TraderProfileCard
                        rating="Very Good"
                        avatarUrl="https://via.placeholder.com/64"
                    />
                </div>
                <div className="flex items-center mb-4">
                    <span className="text-white font-bold text-[24px] leading-[38px] mr-2" style={{ letterSpacing: '-0.2px' }}>
                        Score Breakdown
                    </span>
                    <img src={ScoreIcon} alt="" className="h-8 w-8" />
                </div>


                {/* Score Breakdown Card */}
                <div className="mb-4">
                    <ScoreBreakdownCard />
                </div>

                {/* Spots Left Text */}
                <div className="text-center mb-4">
                    <p className="text-white text-sm">X spots left</p>
                </div>

                {/* Continue Button */}
                <div className="mb-6">
                    <PrimaryButton
                        text="Continue"
                        showIcon={true}
                        onClick={handleContinue}
                    />
                </div>

            </div>
        </div>
    );
};

export default YourTraderProfile;

