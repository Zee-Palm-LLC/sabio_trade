import React, { useEffect, useState } from "react";
import IncomeIcon from '../assets/income.svg';
import KnowledgeIcon from '../assets/knowledge.svg';
import Logo from '../assets/logo.png';
import MotivationIcon from '../assets/motivation.svg';
import PotentialIcon from '../assets/potiential.svg';
import ScoreIcon from '../assets/score.svg';
import { BottomShade, PrimaryButton, ScoreBreakdownCard, TraderProfileCard } from "../components";
import { DNAIconsService } from '../services/dnaIconsService';


const YourTraderProfile: React.FC = () => {
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
        // navigate('/scratch', { state: { fromProfile: true } });
        console.log("Application completed");
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
                    <div className="mb-4">
                        <div className="relative bg-gradient-to-tr from-[#340863] via-[#2a094b] to-[#512e88] rounded-[10px] border border-[#A080FF80] shadow-[0_0_24px_0_rgba(160,128,255,0.22)] p-3 transition-all duration-300 hover:shadow-[0_6px_36px_2px_rgba(49,22,114,0.25)]">
                            <div className="flex items-center space-x-2">
                                {/* Icon with enhanced vignette glow (smaller and closer) */}
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-2xl font-bold animate-glow-pulse ring-2 ring-[#9B7EFF]/60 ring-offset-2 shadow-[0_0_18px_4px_rgba(155,126,255,0.15)] bg-gradient-to-tr from-[#3b236e] to-[#6842c3]"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(52,8,99,0.18), rgba(104,66,195,0.24))',
                                        backdropFilter: 'blur(6px)',
                                        border: '2px solid rgba(155,126,255,0.22)',
                                    }}
                                >
                                    {earnedFeedback[currentFeedbackIndex]?.icon}
                                </div>

                                <div className="flex-1">
                                    <div className="text-white font-extrabold text-[15px] leading-tight mb-0.5 tracking-wide drop-shadow">
                                        {earnedFeedback[currentFeedbackIndex]?.archetype}
                                    </div>
                                    <div className="text-[#e0dbff] italic text-xs leading-snug -mt-1">
                                        “{earnedFeedback[currentFeedbackIndex]?.quote}”
                                    </div>
                                </div>
                            </div>
                            {/* Subtle gradient line at bottom for emphasis */}
                            <div className="absolute left-3 right-3 bottom-0 h-[2px] rounded-[1px] bg-gradient-to-r from-[#6842c3cc] via-[#9B7EFF88] to-[#6842c3cc] opacity-60" />
                        </div>
                        {/* Feedback progression dots shifted below the gradient card */}
                        {earnedFeedback.length > 1 && (
                            <div className="flex justify-center gap-1 mt-2">
                                {earnedFeedback.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`rounded-full transition-all duration-300 ${idx === currentFeedbackIndex
                                            ? 'bg-[#c7b3ff] w-3 h-1.5'
                                            : 'bg-[#563088] w-1.5 h-1.5'
                                            }`}
                                    />
                                ))}
                            </div>
                        )}
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

