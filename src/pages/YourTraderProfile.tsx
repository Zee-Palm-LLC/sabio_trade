import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import IncomeIcon from '../assets/income.svg';
import KnowledgeIcon from '../assets/knowledge.svg';
import Logo from '../assets/logo.png';
import MotivationIcon from '../assets/motivation.svg';
import PotentialIcon from '../assets/potiential.svg';
import ScoreIcon from '../assets/score.svg';
import { BackButton, BottomShade, PrimaryButton, ScoreBreakdownCard } from "../components";


const YourTraderProfile: React.FC = () => {
    const navigate = useNavigate();
    
    // Generate scores with appropriate levels
    const generateRandomScores = () => {
        return {
            motivation: 85, // High (85-100)
            potential: 45,  // Low (0-60)
            income: 75,     // Intermediate (60-85)
            knowledge: 90,  // High (85-100)
        };
    };
    
    const [scores] = useState(generateRandomScores);
    
    const handleBackClick = () => {
        navigate(-1);
    };
    
    const handleContinue = () => {
        navigate('/sabio-academy-offer');
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
                    <div className="mb-6">
                        <h1 className="text-white text-2xl font-semibold leading-tight text-left">
                            Your results are in!<br />
                            You're just one step away<br />
                            from unlocking your financial<br />
                            potential.
                        </h1>
                    </div>
                    
                    {/* Score Breakdown Section */}
                    <div className="flex items-center mb-4">
                        <span className="text-white font-bold text-[24px] leading-[38px] mr-2" style={{ letterSpacing: '-0.2px' }}>
                            Score Breakdown
                        </span>
                        <img src={ScoreIcon} alt="" className="h-8 w-8" />
                    </div>

                    {/* Score Breakdown Card */}
                    <div className="mb-6">
                        <ScoreBreakdownCard 
                            scores={[
                                { label: 'Motivation', score: scores.motivation, icon: MotivationIcon },
                                { label: 'Potential', score: scores.potential, icon: PotentialIcon },
                                { label: 'Income', score: scores.income, icon: IncomeIcon },
                                { label: 'Knowledge', score: scores.knowledge, icon: KnowledgeIcon },
                            ]}
                        />
                    </div>
                </div>

                {/* Button */}
                <div className="pb-12 mt-auto">
                    <PrimaryButton
                        text="Unlock your gift !"
                        showIcon={false}
                        onClick={handleContinue}
                    />
                </div>
            </div>
            
            <style>{`
                @keyframes glow-pulse {
                    0%, 100% {
                        box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
                    }
                    50% {
                        box-shadow: 0 0 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.4);
                    }
                }
                
                .animate-glow-pulse {
                    animation: glow-pulse 1.5s ease-in-out infinite;
                }
                
                @keyframes fade-in-out {
                    0% {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fade-in-out {
                    animation: fade-in-out 0.4s ease-out;
                }
            `}</style>
        </div>
    );
};

export default YourTraderProfile;

