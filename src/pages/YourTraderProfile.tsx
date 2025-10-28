import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import IncomeIcon from '../assets/income.svg';
import KnowledgeIcon from '../assets/knowledge.svg';
import Logo from '../assets/logo.png';
import MotivationIcon from '../assets/motivation.svg';
import PotentialIcon from '../assets/potiential.svg';
import ScoreIcon from '../assets/score.svg';
import { BottomShade, PrimaryButton, ScoreBreakdownCard, TraderProfileCard } from "../components";
import { DNAIconsService } from '../services/dnaIconsService';


const YourTraderProfile: React.FC = () => {
    const navigate = useNavigate();
    
    // Get stored DNA icons
    const storedDNAIcons = DNAIconsService.getDNAIcons();
    
    // State for rolling feedback
    const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState(0);
    
    // Use stored DNA icons for feedback
    const earnedFeedback = storedDNAIcons.slice(0, 3); // Max 3 icons
    
    // Generate random scores within specified ranges
    const generateRandomScores = () => {
        return {
            overall: Math.floor(Math.random() * 16) + 75, // 75-90%
            motivation: Math.floor(Math.random() * 16) + 80, // 80-95%
            potential: Math.floor(Math.random() * 16) + 85, // 85-100%
            income: Math.floor(Math.random() * 36) + 50, // 50-85%
            knowledge: Math.floor(Math.random() * 31) + 60, // 60-90%
            spotsLeft: Math.floor(Math.random() * 5) + 14 // 14-18
        };
    };
    
    const [scores] = useState(generateRandomScores);
    
    // Auto-rotate feedback every 3 seconds
    useEffect(() => {
        if (earnedFeedback.length > 1) {
            const interval = setInterval(() => {
                setCurrentFeedbackIndex((prev) => (prev + 1) % earnedFeedback.length);
            }, 3000);
            
            return () => clearInterval(interval);
        }
    }, [earnedFeedback.length]);
    
    const handleContinue = () => {
        navigate('/scratch', { state: { fromProfile: true } });
    };

    return (
        <div className="min-h-screen text-white relative" style={{ background: 'var(--bg-gradient)' }}>
            <BottomShade />
            <div className="w-[375px] mx-auto min-h-screen flex flex-col px-4">
                <div className="flex flex-col items-center pt-8 pb-4">
                    <div className="flex items-center space-x-3 mb-3">
                        <img src={Logo} alt="SabioTrade" width={230} height={80} />
                    </div>
                </div>
                <div className="mb-4">
                    <TraderProfileCard
                        rating="Very Good"
                        avatarUrl="https://via.placeholder.com/64"
                    />
                </div>
                
                {/* Rolling Micro-Feedback Lines */}
                {earnedFeedback.length > 0 && (
                    <div className="mb-6">
                        <div className="bg-[#340863] rounded-[12px] border border-[#7D31D87A] shadow-[0_0_12px_0_rgba(125,49,216,0.47)] p-4">
                            <div className="flex items-center space-x-3">
                                {/* Icon with glow animation */}
                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-2xl animate-glow-pulse"
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        border: '2px solid rgba(255,255,255,0.2)',
                                        backdropFilter: 'blur(6px)',
                                    }}
                                >
                                    {earnedFeedback[currentFeedbackIndex]?.icon}
                                </div>
                                
                                {/* Archetype and Quote */}
                                <div className="flex-1">
                                    <div className="text-white font-bold text-sm mb-1">
                                        {earnedFeedback[currentFeedbackIndex]?.archetype}
                                    </div>
                                    <div className="text-white/90 italic text-xs">
                                        "{earnedFeedback[currentFeedbackIndex]?.quote}"
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                <div className="flex items-center mb-4">
                    <span className="text-white font-bold text-[24px] leading-[38px] mr-2" style={{ letterSpacing: '-0.2px' }}>
                        Score Breakdown
                    </span>
                    <img src={ScoreIcon} alt="" className="h-8 w-8" />
                </div>

                {/* Score Breakdown Card */}
                <div className="mb-4">
                    <ScoreBreakdownCard 
                        scores={[
                            { label: 'Motivation', score: scores.motivation, icon: MotivationIcon },
                            { label: 'Potential', score: scores.potential, icon: PotentialIcon },
                            { label: 'Income', score: scores.income, icon: IncomeIcon },
                            { label: 'Knowledge', score: scores.knowledge, icon: KnowledgeIcon },
                        ]}
                    />
                </div>

                {/* Spots Left Text */}
                <div className="text-center mb-4">
                    <p className="text-white text-sm">{scores.spotsLeft} spots left</p>
                </div>

                {/* Continue Button */}
                <div className="mb-20">
                    <PrimaryButton
                        text="Continue"
                        showIcon={true}
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

