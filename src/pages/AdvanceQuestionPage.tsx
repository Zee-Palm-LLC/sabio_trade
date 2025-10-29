import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { AnalyzingModal, BackButton, BottomShade, PrimaryButton, ProgressIndicator } from '../components';
import AdvancedQuestionCard from '../components/ui/AdvancedQuestionCard';
import advancedQuestions from '../data/advancedQuestions.json';
import { DNAIconsService } from '../services/dnaIconsService';

const AdvanceQuestionPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation() as any;
    const initialIndex = typeof location.state?.startIndex === 'number'
        ? location.state.startIndex
        : (location.state?.startAtLastAdvanced ? advancedQuestions.length - 1 : 0);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(initialIndex);
    const [answers, setAnswers] = useState<Record<number, string>>(() => {
        if (location.state?.clearCurrentAnswer && initialIndex < advancedQuestions.length) {
            return {};
        }
        return {};
    });
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [showButton, setShowButton] = useState(false);
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [hasUserInteracted, setHasUserInteracted] = useState(false);
    const [showValidationMessage, setShowValidationMessage] = useState(false);
    const [isIconAnimating, setIsIconAnimating] = useState(false);

    const totalQuestions = 13;
    const questionOffset = 4;
    const currentQuestion: any = advancedQuestions[currentQuestionIndex];

    // Get stored DNA icons for display
    const storedDNAIcons = DNAIconsService.getDNAIcons();
    const currentQuestionIcon = storedDNAIcons.find(icon => icon.questionId === currentQuestion.id);

    useEffect(() => {
        if (location.state?.clearCurrentAnswer && currentQuestionIndex === 2) {
            localStorage.removeItem('tradingTopicOption');
            localStorage.removeItem('selectedTopic');
            setAnswers(prev => {
                const newAnswers = { ...prev };
                delete newAnswers[7];
                return newAnswers;
            });
            window.history.replaceState(
                { ...location.state, clearCurrentAnswer: false },
                ''
            );
        }
    }, [location.state?.clearCurrentAnswer, currentQuestionIndex, location.state]);

    const isMulti = Boolean(currentQuestion.multi);

    const showContinueButton = currentQuestion.id === 5 || isMulti;

    const handleBackClick = () => {
        console.log('handleBackClick called for question id:', currentQuestion.id);

        // FIRST PRIORITY: Clear any selected option before navigation
        if (selectedOption || selectedOptions.length > 0) {
            console.log('Clearing selected options');
            setSelectedOption(null);
            setSelectedOptions([]);
            setShowButton(false);
            setIsButtonActive(false);
            setHasUserInteracted(false);
            return;
        }

        // SECOND: Special handling for question 5
        if (currentQuestion.id === 5) {
            const lastAttemptedQuestionId = localStorage.getItem('lastAttemptedQuestion');
            console.log('lastAttemptedQuestionId:', lastAttemptedQuestionId);

            // Clear only this specific key
            localStorage.removeItem('lastAttemptedQuestion');

            if (lastAttemptedQuestionId === '7') {
                console.log('Navigating -1 because last attempted was question 7');
                navigate(-1);
                return;
            } else {
                console.log('Navigating -1 from question 5');
                navigate(-1);
                return;
            }
        }

        // THIRD: Normal back navigation between questions
        if (currentQuestionIndex > 0) {
            console.log('Going to previous question');
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedOption(null);
            setSelectedOptions([]);
            setShowButton(false);
            setIsButtonActive(false);
            setHasUserInteracted(false);
            return;
        }

        // LAST: At first question, navigate back in browser history
        console.log('At first question, navigating back');
        navigate(-1);
        return;
    };

    const getSelectedOptionIndex = (questionIdx: number, value: string): number => {
        const opts: any[] = advancedQuestions[questionIdx].options as any[];
        const labels = opts.map((opt: any) => typeof opt === 'string' ? opt : opt.label);
        const idx = labels.findIndex(l => l === value);
        const result = idx >= 0 ? idx + 1 : 0;
        return result;
    };

    const navigateToOptionBased = (finalAnswers: Record<number, string>) => {
        const optionIndices = advancedQuestions.map((q: any, qIdx: number) => {
            const selected = finalAnswers[q.id];
            return selected ? getSelectedOptionIndex(qIdx, selected) : 0;
        });
        navigate('/option-based', { 
            state: { 
                optionIndices
            }
        });
    };

    const handleOptionSelect = (value: string) => {
        if (isMulti) return;

        // Store the current question ID as the last attempted question
        localStorage.setItem('lastAttemptedQuestion', String(currentQuestion.id));

        setSelectedOption(value);
        setAnswers(prev => {
            const newAnswers = {
                ...prev,
                [currentQuestion.id]: value
            };
            return newAnswers;
        });

        // ✅ Store DNA icon if question ID is 5
        if (currentQuestion.id === 5) {
            DNAIconsService.storeDNAIcon(
                currentQuestion.id,
                currentQuestion.question,
                value,
                'advanceQuestionPage'
            );
            
            // Trigger animation
            setIsIconAnimating(true);
            setTimeout(() => {
                setIsIconAnimating(false);
            }, 1000);
        }

        if (currentQuestion.id === 7) {
            localStorage.setItem('selectedTopic', value);

            const originalQuestion = advancedQuestions.find((q: any) => q.id === 7);
            if (originalQuestion) {
                const optionIndex = originalQuestion.options.findIndex((opt: any) => {
                    const label = typeof opt === 'string' ? opt : opt.label;
                    return label === value;
                }) + 1;
                localStorage.setItem('tradingTopicOption', String(optionIndex));
            }
        }

        if (!showContinueButton) {
            // Different timing based on whether it's question ID 5 (with animation)
            const delayTime = currentQuestion.id === 5 ? 1300 : 250; // Wait for animation to complete + buffer

            setTimeout(() => {
                if (currentQuestion.id === 7) {
                    const tradingTopic = localStorage.getItem('tradingTopicOption') || '1';
                    navigate('/option-based', {
                        state: { 
                            selectedOption: Number(tradingTopic)
                        },
                        replace: true  // Replace history to prevent multiple back clicks
                    });
                } else if (currentQuestionIndex < advancedQuestions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                    setSelectedOption(null);
                } else {
                    const tradingTopic = localStorage.getItem('tradingTopicOption') || '1';
                    navigate('/option-based', { 
                        state: { 
                            selectedOption: Number(tradingTopic)
                        }
                    });
                }
            }, delayTime);
        } else {
            setShowButton(true);
            setIsButtonActive(false);
            setTimeout(() => {
                setIsButtonActive(true);
            }, 1000);
        }
    };

    const handleToggleOption = (value: string) => {
        if (!hasUserInteracted) {
            setHasUserInteracted(true);
        }

        setSelectedOptions(prev => {
            const exists = prev.includes(value);
            let next: string[];

            if (value.toLowerCase() === 'none') {
                if (!exists) {
                    next = ['None'];
                } else {
                    next = [];
                }
            } else {
                if (exists) {
                    next = prev.filter(v => v !== value);
                } else {
                    next = [...prev.filter(v => v.toLowerCase() !== 'none'), value];
                }
            }

            if (next.length > 0) {
                setIsButtonActive(false);
                setTimeout(() => {
                    setIsButtonActive(true);
                }, 1000);
            } else {
                setIsButtonActive(false);
            }

            return next;
        });
    };

    const handleContinueClick = () => {
        if (!isButtonActive) return;

        if (isMulti) {
            if (selectedOptions.length === 0) return;
            localStorage.setItem('lastAttemptedQuestion', String(currentQuestion.id));
            const value = selectedOptions.join(',');
            if (currentQuestion.id === 8) {
                setShowValidationMessage(true);
                setTimeout(() => {
                    setShowValidationMessage(false);
                    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
                    setShowModal(true);
                }, 2000);
                return;
            }
            if (currentQuestionIndex < advancedQuestions.length - 1) {
                setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedOptions([]);
                setShowButton(false);
                setIsButtonActive(false);
                setHasUserInteracted(false);
            } else {
                setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
                setShowModal(true);
            }
            return;
        }

        if (!selectedOption) return;
        localStorage.setItem('lastAttemptedQuestion', String(currentQuestion.id));
        if (currentQuestionIndex < advancedQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setShowButton(false);
            setIsButtonActive(false);
            setHasUserInteracted(false);
        } else {
            navigateToOptionBased({ ...answers, [currentQuestion.id]: selectedOption });
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };


    return (
        <div className="min-h-screen text-white relative" style={{ background: 'var(--bg-gradient)' }}>
            <BottomShade />
            <div className="w-[375px] mx-auto min-h-screen flex flex-col relative z-10">
                <div className="flex flex-col items-center pt-8 pb-4 px-4">
                    <div className="flex items-center justify-between w-full mb-3">
                        <BackButton onClick={handleBackClick} />
                        <div className="flex items-center">
                            <img src={Logo} alt="SabioTrade" width={230} height={80} />
                        </div>
                        <div className="flex items-center space-x-1">
                            <span className="font-bold text-base leading-[18px]" style={{ color: 'var(--color-primary)' }}>
                                {currentQuestionIndex + 1 + questionOffset} /
                            </span>
                            <span className="font-bold text-base leading-[18px]" style={{ color: 'rgba(255, 255, 255, var(--opacity-80))' }}>
                                {totalQuestions}
                            </span>
                        </div>
                    </div>
                </div>

                <ProgressIndicator
                    current={currentQuestionIndex + 1 + questionOffset}
                    total={totalQuestions}
                />

                {/* Trader DNA Icons - Visible only for question ID 5 and when option is selected */}
                {currentQuestion.id === 5 && currentQuestionIcon && selectedOption && (
                    <div className="relative flex justify-center mt-4 mb-2">
                        <div className="flex space-x-3">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-2xl ${isIconAnimating ? 'animate-fly-from-top-right' : 'animate-float'
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

                <AdvancedQuestionCard
                    question={currentQuestion.question}
                    subtitle={currentQuestion.subtitle}
                    options={currentQuestion.options}
                    selectedOption={selectedOption}
                    selectedOptions={selectedOptions}
                    onOptionSelect={handleOptionSelect}
                    onToggleOption={handleToggleOption}
                    showContinueButton={showContinueButton}
                    multi={isMulti}
                />

                {/* Validation Message */}
                {showValidationMessage && (
                    <div className="flex justify-center items-center px-4 py-6 animate-fade-in-out">
                        <p className="text-white text-[15px] font-normal text-center leading-relaxed">
                            Interesting… most consistent traders answered this way too.
                        </p>
                    </div>
                )}

                {showContinueButton && (isMulti || showButton) && (
                    <div className="px-4 pb-6 mb-20 animate-fade-in">
                        <PrimaryButton
                            onClick={handleContinueClick}
                            text={currentQuestion.id === 5 ? 'Continue' : 'Next Step'}
                            showIcon={true}
                            disabled={isMulti ? (selectedOptions.length === 0 || !isButtonActive) : !isButtonActive}
                        />
                    </div>
                )}

                {!showContinueButton && (
                    <div className="mb-20"></div>
                )}
            </div>

            <AnalyzingModal
                isOpen={showModal}
                onClose={handleCloseModal}
                selectedStocks={selectedOptions}
            />

            <style>{`
                @keyframes fade-in-out {
                    0% {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    20% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    80% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                }
                
                .animate-fade-in-out {
                    animation: fade-in-out 2.3s ease-in-out forwards;
                }

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

export default AdvanceQuestionPage;

