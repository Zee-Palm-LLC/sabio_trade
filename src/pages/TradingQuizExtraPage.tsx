import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BreakingNewsPng from '../assets/breaking_news.png';
import CleanFocused from '../assets/clean_and_focused.svg';
import ClearRoutine from '../assets/clear_routine.svg';
import DayTradingPng from '../assets/day_trading.png';
import DayTradeLarge from '../assets/dayTradeLarge.png';
import DividendPng from '../assets/dividend.png';
import DividendLarge from '../assets/dividendLarge.png';
import Exploring from '../assets/exploring.svg';
import FastMoves from '../assets/fast_moves.svg';
import IpoPng from '../assets/ipo.png';
import Logo from '../assets/logo.png';
import SteadyPng from '../assets/steady.png';
import SteadyLarge from '../assets/steadyLarge.png';
import { BackButton, BottomShade, ProgressIndicator } from '../components';
import IconOptionCard, { type IconOption } from '../components/ui/IconOptionCard';
import extraQuiz from '../data/extraQuiz.json';
import { DNAIconsService } from '../services/dnaIconsService';

interface ExtraQuestion {
    id: number;
    title: string;
    subtitle?: string;
    options: IconOption[];
}

const mapExtraQuestions: ExtraQuestion[] = (extraQuiz as any).questions.map((q: any) => {
    if (q.id === 1) {
        const iconMap: Record<string, string> = {
            'clear_routine.svg': ClearRoutine,
            'fast_moves.svg': FastMoves,
            'clean_and_focused.svg': CleanFocused,
            'exploring.svg': Exploring,
        };
        return {
            ...q,
            options: q.options.map((o: any) => ({ label: o.label, icon: iconMap[o.icon] }))
        };
    }
    if (q.id === 4) {
        return {
            ...q,
            options: [
                { label: 'Dividend income', icon: (DividendPng) as string },
                { label: 'Day trading', icon: (DayTradingPng) as string },
                { label: 'Steady portfolio growth', icon: (SteadyPng) as string },
                { label: 'IPO investing', icon: (IpoPng) as string },
                { label: 'Breaking news trading', icon: (BreakingNewsPng) as string }
            ]
        };
    }
    return q;
});

const TradingQuizExtraPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const fromProfile = location.state?.fromProfile || false;

    const [current, setCurrent] = useState(fromProfile ? 4 : 0);
    const [selected, setSelected] = useState<Record<number, string>>({});
    const [isIconAnimating, setIsIconAnimating] = useState(false);

    const total = 13;
    const questionOffset = 8;
    const question = mapExtraQuestions[fromProfile ? 4 : current];

    // Get stored DNA icons for display (with forceUpdate dependency)
    const storedDNAIcons = DNAIconsService.getDNAIcons();
    const currentQuestionIcon = storedDNAIcons.find(icon => icon.questionId === question.id);

    const handleBackClick = () => {
        if (fromProfile) {
            navigate(-1);
        } else if (current > 0) {
            // Get the previous question before navigating
            const previousQuestionIndex = current - 1;
            const previousQuestion = mapExtraQuestions[previousQuestionIndex];
            
            // Clear selected option for the previous question when going back
            setSelected(prev => {
                const newSelected = { ...prev };
                if (previousQuestion) {
                    delete newSelected[previousQuestion.id];
                }
                return newSelected;
            });
            
            // Navigate to previous question
            setCurrent(previousQuestionIndex);
        } else {
            navigate(-1);
        }
    };

    const handleSelect = (value: string) => {
        console.log('TradingQuizExtraPage - handleSelect called');
        console.log('Question ID:', question.id);
        console.log('Selected value:', value);
        
        setSelected(prev => ({ ...prev, [question.id]: value }));
        
        // ✅ Store DNA icon if question ID is 2
        if (question.id === 2) {
            console.log('Question ID 2 detected - storing DNA icon');
            DNAIconsService.storeDNAIcon(
                question.id,
                question.title,
                value,
                'tradingQuizExtraPage'
            );
            
            // DNA icon will be automatically picked up on next render
            
            // Debug: Check if icon was stored
            setTimeout(() => {
                const updatedIcons = DNAIconsService.getDNAIcons();
                console.log('Updated DNA icons after storage:', updatedIcons);
                const newIcon = updatedIcons.find(icon => icon.questionId === question.id);
                console.log('New icon found:', newIcon);
            }, 100);
            
            // Trigger animation
            console.log('Setting animation to true');
            setIsIconAnimating(true);
            setTimeout(() => {
                console.log('Setting animation to false');
                setIsIconAnimating(false);
            }, 1000);
        }

        // Different timing based on whether it's question ID 2 (with animation)
        const delayTime = question.id === 2 ? 1300 : 200; // Wait for animation to complete + buffer
        
        setTimeout(() => {
            if (fromProfile) {
                navigate('/scratch');
            } else {
                if (current < mapExtraQuestions.length - 1) {
                    setCurrent(current + 1);
                } else {
                    navigate('/trading-profiles');
                }
            }
        }, delayTime);
    };

    return (
        <div className="min-h-screen text-white relative" style={{ background: 'var(--bg-gradient)' }}>
            <BottomShade />
            <div className="w-[375px] mx-auto min-h-screen flex flex-col relative z-10">
                <div className="flex flex-col items-center pt-8 pb-4">
                    <div className="flex items-center justify-between w-full mb-3">
                        <BackButton onClick={handleBackClick} />
                        <div className="flex items-center">
                            <img src={Logo} alt="SabioTrade" width={230} height={80} />
                        </div>
                        <div className="flex items-center space-x-1">
                            <span className="font-bold text-base leading-[18px]" style={{ color: 'var(--color-primary)' }}>
                                {fromProfile ? 13 : current + 1 + questionOffset} /
                            </span>
                            <span className="font-bold text-base leading-[18px]" style={{ color: 'rgba(255, 255, 255, var(--opacity-80))' }}>
                                {total}
                            </span>
                        </div>
                    </div>

                </div>

                <ProgressIndicator current={fromProfile ? 13 : current + 1 + questionOffset} total={total} />

                {/* Trader DNA Icons - Visible only for question ID 2 and when option is selected */}
                {(() => {
                    console.log('Icon display check:');
                    console.log('Question ID:', question.id);
                    console.log('Current question icon:', currentQuestionIcon);
                    console.log('Is icon animating:', isIconAnimating);
                    console.log('Selected option:', selected[question.id]);
                    console.log('Should show icon:', question.id === 2 && currentQuestionIcon && selected[question.id]);
                    
                    return question.id === 2 && currentQuestionIcon && selected[question.id] && (
                        <div className="relative flex justify-center mt-4 mb-2">
                            <div className="flex space-x-3">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-2xl ${
                                        isIconAnimating ? 'animate-fly-from-top-right' : 'animate-float'
                                    }`}
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        border: '2px solid rgba(255,255,255,0.2)',
                                        backdropFilter: 'blur(6px)',
                                    }}
                                >
                                    {currentQuestionIcon.icon}
                                </div>
                            </div>
                        </div>
                    );
                })()}

                {question.id === 4 && (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <img src={DividendLarge} alt="" className="absolute" style={{ top: '20%', height: '62px', left: '0%' }} />
                        <img src={SteadyLarge} alt="" className="absolute " style={{ top: '18%', right: '0%', width: '31px' }} />
                        <img src={DayTradeLarge} alt="" className="absolute " style={{ top: '29%', right: '10%', width: '31px' }} />
                    </div>
                )}

                <div className="flex flex-col justify-center px-4 mb-20 mt-6">
                    <div className="text-center mb-6">
                        <h2 className="text-white text-2xl font-bold leading-tight">
                            {question.title}
                        </h2>
                        {question.subtitle && (
                            <p className="text-white/70 text-sm mt-2">{question.subtitle}</p>
                        )}
                    </div>
                    <IconOptionCard
                        options={question.options}
                        selected={selected[question.id] || null}
                        onSelect={handleSelect}
                        align={question.id === 1 ? 'left' : 'center'}
                    />
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-5px);
                    }
                }
                
                @keyframes fly-from-top-right {
                    0% {
                        transform: translate(-120px, -120px) scale(0.2);
                        opacity: 0;
                    }
                    20% {
                        transform: translate(-90px, -90px) scale(0.4);
                        opacity: 0.3;
                    }
                    40% {
                        transform: translate(-60px, -60px) scale(0.6);
                        opacity: 0.5;
                    }
                    60% {
                        transform: translate(-30px, -30px) scale(0.8);
                        opacity: 0.7;
                    }
                    80% {
                        transform: translate(-10px, -10px) scale(0.95);
                        opacity: 0.9;
                    }
                    100% {
                        transform: translate(0px, 0px) scale(1);
                        opacity: 1;
                    }
                }
                
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                
                .animate-fly-from-top-right {
                    animation: fly-from-top-right 1.0s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default TradingQuizExtraPage;


