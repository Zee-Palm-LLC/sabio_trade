import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { AnalyzingModal, BackButton, BottomShade, PrimaryButton, ProgressIndicator } from '../components';
import AdvancedQuestionCard from '../components/ui/AdvancedQuestionCard';
import advancedQuestions from '../data/advancedQuestions.json';

const AdvanceQuestionPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation() as any;
    const initialIndex = typeof location.state?.startIndex === 'number'
        ? location.state.startIndex
        : (location.state?.startAtLastAdvanced ? advancedQuestions.length - 1 : 0);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(initialIndex);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [showButton, setShowButton] = useState(false);
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [hasUserInteracted, setHasUserInteracted] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState<string>(() => {
        return localStorage.getItem('selectedTopic') || "Risk and rewards";
    });

    const totalQuestions = 13;
    const questionOffset = 4;
    const currentQuestion: any = advancedQuestions[currentQuestionIndex];

    const isMulti = Boolean(currentQuestion.multi);

    const showContinueButton = currentQuestion.id === 5 || isMulti;

    const handleBackClick = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedOption(null);
            setSelectedOptions([]);
            setShowButton(false);
            setIsButtonActive(false);
            setHasUserInteracted(false);
        } else {
            navigate(-1);
        }
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
        navigate('/option-based', { state: { optionIndices } });
    };

    const handleOptionSelect = (value: string) => {
        if (isMulti) return;
        setSelectedOption(value);
        setAnswers(prev => {
            const newAnswers = {
                ...prev,
                [currentQuestion.id]: value
            };
            return newAnswers;
        });

        if (currentQuestion.id === 7) {
            setSelectedTopic(value);
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
            setTimeout(() => {
                if (currentQuestion.id === 7) {
                    const tradingTopic = localStorage.getItem('tradingTopicOption') || '1';
                    navigate('/option-based', { state: { selectedOption: Number(tradingTopic) } });
                } else if (currentQuestionIndex < advancedQuestions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                    setSelectedOption(null);
                } else {
                    const tradingTopic = localStorage.getItem('tradingTopicOption') || '1';
                    navigate('/option-based', { state: { selectedOption: Number(tradingTopic) } });
                }
            }, 250);
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
            const value = selectedOptions.join(',');
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
                            <img src={Logo} alt="SabioTrade" className="h-14" />
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
                
                {/* Spacer for pages without continue button */}
                {!showContinueButton && (
                    <div className="mb-20"></div>
                )}
            </div>

            <AnalyzingModal
                isOpen={showModal}
                onClose={handleCloseModal}
                selectedStocks={selectedOptions}
                selectedTopic={selectedTopic}
            />
        </div>
    );
};

export default AdvanceQuestionPage;

