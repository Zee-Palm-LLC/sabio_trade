import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import StandingAvatar from '../assets/standing_avatar.png';
import { BackButton, BottomShade, ProgressIndicator, QuestionCard } from '../components';
import IconSlots from '../components/ui/IconSlots';
import quizData from '../data/quiz.json';
import { DNAIconsService } from '../services/dnaIconsService';
import { AnswerService } from '../services/answerService';

const QuestionPage: React.FC = () => {
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isIconAnimating, setIsIconAnimating] = useState(false);

    const availableQuestions = quizData;
    const totalQuestions = 13;
    const currentQuestion = availableQuestions[currentQuestionIndex];

    // Get stored DNA icons for display
    const storedDNAIcons = DNAIconsService.getDNAIcons();
    const currentQuestionIcon = storedDNAIcons.find(icon => icon.questionId === currentQuestion.id);

    const questionOptions = currentQuestion.options.map((option: string) => ({
        value: option,
        label: option,
        color: 'var(--color-purple-primary)',
    }));

    // Load persisted answer from AnswerService when question changes
    useEffect(() => {
        const storedAnswer = AnswerService.getAnswer(currentQuestion.id);
        if (storedAnswer) {
            setSelectedOption(storedAnswer);
        } else {
            // Clear selection if no stored answer for this question
            setSelectedOption(null);
        }
    }, [currentQuestion.id]);

    // Subscribe to answer changes to update UI in real-time
    useEffect(() => {
        const updateAnswers = () => {
            const storedAnswer = AnswerService.getAnswer(currentQuestion.id);
            if (storedAnswer) {
                setSelectedOption(storedAnswer);
            } else {
                // Clear selection if no stored answer for this question
                setSelectedOption(null);
            }
        };

        // Subscribe to answer changes
        const unsubscribe = AnswerService.subscribeToChanges(() => {
            updateAnswers();
        });

        return () => {
            unsubscribe();
        };
    }, [currentQuestion.id]);

    const handleBackClick = () => {
        if (currentQuestionIndex > 0) {
            // Navigate to previous question
            // Selected answer will be restored from AnswerService via useEffect
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        } else {
            navigate(-1);
        }
    };

    const handleOptionSelect = (value: string) => {
        console.log('Selected option:', value);
        setSelectedOption(value);

        setAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: value,
        }));

        // ✅ Store answer in centralized service with question text
        AnswerService.storeAnswer(currentQuestion.id, currentQuestion.question, value);

        // ✅ Store DNA icon if question ID is 3
        if (currentQuestion.id === 3) {
            DNAIconsService.storeDNAIcon(
                currentQuestion.id,
                currentQuestion.question,
                value,
                'questionPage'
            );
            
            // Trigger animation
            setIsIconAnimating(true);
            setTimeout(() => {
                setIsIconAnimating(false);
            }, 1000);
        }

        // Different timing based on whether it's question ID 3 (with animation)
        const delayTime = currentQuestion.id === 3 ? 1300 : 400; // Wait for animation to complete + buffer
        
        setTimeout(() => {
            if (currentQuestionIndex < availableQuestions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedOption(null);
            } else {
                console.log('Navigating to analyzing with:', { answers });
                navigate('/analyzing', { state: { answers } });
            }
        }, delayTime);
    };

    return (
        <div
            className="min-h-screen text-white relative"
            style={{ background: 'var(--bg-gradient)' }}
        >
            <BottomShade />
            <div className="w-[375px] mx-auto min-h-screen flex flex-col relative z-10">
                {/* HEADER */}
                <div className="flex flex-col items-center pt-8 pb-4">
                    <div className="flex items-center justify-between w-full px-4 mb-2">
                        <BackButton onClick={handleBackClick} />
                        <img src={Logo} alt="SabioTrade" width={230} height={80} />
                        <div className="flex items-center space-x-1">
                            <span
                                className="font-bold text-base leading-[18px]"
                                style={{ color: 'var(--color-primary)' }}
                            >
                                {currentQuestionIndex + 1} /
                            </span>
                            <span
                                className="font-bold text-base leading-[18px]"
                                style={{
                                    color: 'rgba(255, 255, 255, var(--opacity-80))',
                                }}
                            >
                                {totalQuestions}
                            </span>
                        </div>
                    </div>
                    {/* Icon Slots - Persistent across all questions */}
                    <IconSlots className="mt-1" />
                </div>

                {/* PROGRESS BAR */}
                <ProgressIndicator
                    current={currentQuestionIndex + 1}
                    total={totalQuestions}
                />

                {/* Trader DNA Icons - Visible only for question ID 3 and when option is selected */}
                {currentQuestion.id === 3 && currentQuestionIcon && selectedOption && (
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
                )}

                {/* QUESTION CARD */}
                <div className="mb-20">
                    <QuestionCard
                        questionText={currentQuestion.question}
                        description={currentQuestion.description}
                        options={questionOptions}
                        illustration={StandingAvatar}
                        onOptionSelect={handleOptionSelect}
                        selectedOption={selectedOption}
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

export default QuestionPage;
