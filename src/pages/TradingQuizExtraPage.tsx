import React, { useState, useEffect, useRef } from 'react';
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
import IconSlots from '../components/ui/IconSlots';
import extraQuiz from '../data/extraQuiz.json';
import { DNAIconsService } from '../services/dnaIconsService';
import { AnswerService } from '../services/answerService';
import { defaultFlyOffsets, prepareIconFlight, type FlyOffsets } from '../utils/iconFlight';

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
    const [flyOffsets, setFlyOffsets] = useState<FlyOffsets>(defaultFlyOffsets);
    const iconRef = useRef<HTMLDivElement | null>(null);

    const total = 13;
    const questionOffset = 8;
    const question = mapExtraQuestions[fromProfile ? 4 : current];

    // Get stored DNA icons for display (with forceUpdate dependency)
    const storedDNAIcons = DNAIconsService.getDNAIcons();
    const currentQuestionIcon = storedDNAIcons.find(icon => icon.questionId === question.id);

    // Load persisted answer from AnswerService when question changes
    useEffect(() => {
        const storedAnswer = AnswerService.getAnswer(question.id);
        if (storedAnswer) {
            setSelected(prev => ({ ...prev, [question.id]: storedAnswer }));
        } else {
            // Clear selection if no stored answer for this question
            setSelected(prev => {
                const newSelected = { ...prev };
                delete newSelected[question.id];
                return newSelected;
            });
        }
    }, [question.id]);

    // Subscribe to answer changes to update UI in real-time
    useEffect(() => {
        const updateAnswers = () => {
            const storedAnswer = AnswerService.getAnswer(question.id);
            if (storedAnswer) {
                setSelected(prev => ({ ...prev, [question.id]: storedAnswer }));
            } else {
                // Clear selection if no stored answer for this question
                setSelected(prev => {
                    const newSelected = { ...prev };
                    delete newSelected[question.id];
                    return newSelected;
                });
            }
        };

        // Subscribe to answer changes
        const unsubscribe = AnswerService.subscribeToChanges(() => {
            updateAnswers();
        });

        return () => {
            unsubscribe();
        };
    }, [question.id]);

    const handleBackClick = () => {
        // Clear icon for current question if it has one (when going back)
        if (question.id === 2) {
            const hasIcon = storedDNAIcons.some(icon => icon.questionId === question.id);
            if (hasIcon) {
                console.log('Clearing icon for question', question.id, 'when going back');
                DNAIconsService.clearDNAIconForQuestion(question.id);
            }
        }

        if (fromProfile) {
            navigate(-1);
        } else if (current > 0) {
            // Navigate to previous question
            // Selected answer will be restored from AnswerService via useEffect
            setCurrent(current - 1);
        } else {
            navigate(-1);
        }
    };

    const handleSelect = (value: string) => {
        console.log('TradingQuizExtraPage - handleSelect called');
        console.log('Question ID:', question.id);
        console.log('Selected value:', value);
        
        setSelected(prev => ({ ...prev, [question.id]: value }));
        
        // ✅ Store answer in centralized service with question text
        AnswerService.storeAnswer(question.id, question.title, value);
        
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
            prepareIconFlight({
                questionId: question.id,
                optionValue: value,
                iconRef,
                setOffsets: setFlyOffsets,
            }).then(() => {
                setIsIconAnimating(true);
                setTimeout(() => {
                    console.log('Setting animation to false');
                    setIsIconAnimating(false);
                }, 2000);
            });
        }

        // Different timing based on whether it's question ID 2 (with animation)
        const delayTime = question.id === 2 ? 2300 : 200; // Wait for animation to complete + buffer
        
        setTimeout(() => {
            if (fromProfile) {
                navigate('/scratch');
            } else {
                if (current < mapExtraQuestions.length - 2) {
                    setCurrent(current + 1);
                } else {
                    navigate('/lead');
                }
            }
        }, delayTime);
    };

    return (
        <div className="min-h-screen text-white relative" style={{ background: 'var(--bg-gradient)' }}>
            <BottomShade />
            <div className="w-[375px] mx-auto min-h-screen flex flex-col relative z-10">
                <div className="flex flex-col items-center pt-8 pb-4">
                    <div className="flex items-center justify-between w-full mb-2">
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
                    {/* Icon Slots - Persistent across all questions */}
                    <IconSlots className="mt-1" />
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
                                    ref={iconRef}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-2xl ${
                                        isIconAnimating ? 'animate-fly-from-answer' : 'animate-float'
                                    }`}
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        border: '2px solid rgba(255,255,255,0.2)',
                                        backdropFilter: 'blur(6px)',
                                        zIndex: '30',
                                        '--fly-start-x': `${flyOffsets.startX}px`,
                                        '--fly-start-y': `${flyOffsets.startY}px`,
                                        '--fly-mid-x': `${flyOffsets.midX}px`,
                                        '--fly-mid-y': `${flyOffsets.midY}px`,
                                        '--fly-near-x': `${flyOffsets.nearX}px`,
                                        '--fly-near-y': `${flyOffsets.nearY}px`,
                                    } as React.CSSProperties & Record<string, string>}
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
                        questionId={question.id}
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
                
                @keyframes fly-from-answer {
                    0% {
                        transform: translate(var(--fly-start-x, -160px), var(--fly-start-y, 60px)) scale(0.9);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(0px, 0px) scale(1);
                        opacity: 1;
                    }
                }
                
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                
                .animate-fly-from-answer {
                    animation: fly-from-answer 1.15s cubic-bezier(0.33, 1, 0.68, 1) forwards;
                    animation-delay: 0.1s;
                    animation-fill-mode: both;
                    will-change: transform;
                }
            `}</style>
        </div>
    );
};

export default TradingQuizExtraPage;


