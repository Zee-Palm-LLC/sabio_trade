import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { AnalyzingModal, BackButton, PrimaryButton, ProgressIndicator } from '../components';
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
    const [selectedTopic, setSelectedTopic] = useState<string>(() => {
        // Initialize from localStorage if available, otherwise use default
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
        } else {
            navigate(-1);
        }
    };

    // Helper: map selected label to 1-based option index for a given question
    const getSelectedOptionIndex = (questionIdx: number, value: string): number => {
        const opts: any[] = advancedQuestions[questionIdx].options as any[];
        const labels = opts.map((opt: any) => typeof opt === 'string' ? opt : opt.label);
        console.log(`DEBUG getSelectedOptionIndex - Question ${questionIdx}:`, {
            value: value,
            availableLabels: labels,
            matching: labels.findIndex(l => l === value)
        });
        const idx = labels.findIndex(l => l === value);
        const result = idx >= 0 ? idx + 1 : 0;
        console.log(`DEBUG - Selected value "${value}" maps to index ${result}`);
        return result;
    };

    const navigateToOptionBased = (finalAnswers: Record<number, string>) => {
        // Build array of 1-based indices in question order
        const optionIndices = advancedQuestions.map((q: any, qIdx: number) => {
            const selected = finalAnswers[q.id];
            return selected ? getSelectedOptionIndex(qIdx, selected) : 0;
        });
        console.log('DEBUG - Final Answers:', finalAnswers);
        console.log('DEBUG - Option Indices being passed:', optionIndices);
        console.log('DEBUG - First question answer index:', optionIndices[0]);
        navigate('/option-based', { state: { optionIndices } });
    };

    const handleOptionSelect = (value: string) => {
        if (isMulti) return; // multi handled in toggle below
        setSelectedOption(value);

        // Store the answer keyed by question id
        setAnswers(prev => {
            const newAnswers = {
                ...prev,
                [currentQuestion.id]: value
            };
            console.log('DEBUG - Storing answer for question', currentQuestion.id, ':', value);
            console.log('DEBUG - Updated answers:', newAnswers);
            return newAnswers;
        });

        // If this is question 7 (Which trading topic interests you the most?), store the option index for routing
        if (currentQuestion.id === 7) {
            // Set the selected topic for the modal and store in localStorage
            console.log('DEBUG - Setting selectedTopic to:', value);
            setSelectedTopic(value);
            localStorage.setItem('selectedTopic', value);

            // IMPORTANT: Always search in the ORIGINAL options array from advancedQuestions
            // Don't rely on the displayed order (which might be reordered by AdvancedQuestionCard)
            const originalQuestion = advancedQuestions.find((q: any) => q.id === 7);
            if (originalQuestion) {
                const optionIndex = originalQuestion.options.findIndex((opt: any) => {
                    const label = typeof opt === 'string' ? opt : opt.label;
                    return label === value;
                }) + 1; // Convert to 1-based index

                console.log('Question 7 - Option selected:', value);
                console.log('Question 7 - Option index:', optionIndex);
                console.log('Question 7 - Original options:', originalQuestion.options.map((o: any) => typeof o === 'string' ? o : o.label));

                // Store it in localStorage
                localStorage.setItem('tradingTopicOption', String(optionIndex));
            }
        }

        // Auto-advance if no Continue button (questions 2 & 3)
        if (!showContinueButton) {
            setTimeout(() => {
                // After question 3 (id 7, index 2), navigate to OptionBasedPage
                if (currentQuestion.id === 7) {
                    const tradingTopic = localStorage.getItem('tradingTopicOption') || '1';
                    console.log('Navigating to OptionBased - tradingTopic from localStorage:', tradingTopic);
                    console.log('Navigating to OptionBasaed - Number(tradingTopic):', Number(tradingTopic));
                    navigate('/option-based', { state: { selectedOption: Number(tradingTopic) } });
                } else if (currentQuestionIndex < advancedQuestions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                    setSelectedOption(null);
                } else {
                    const tradingTopic = localStorage.getItem('tradingTopicOption') || '1';
                    console.log('Navigating to OptionBased - tradingTopic from localStorage:', tradingTopic);
                    console.log('Navigating to OptionBased - Number(tradingTopic):', Number(tradingTopic));
                    navigate('/option-based', { state: { selectedOption: Number(tradingTopic) } });
                }
            }, 250);
        } else {
            // For questions with continue button: show button immediately (inactive), then activate after 1s
            setShowButton(true);
            setIsButtonActive(false);
            setTimeout(() => {
                setIsButtonActive(true);
            }, 1000);
        }
    };

    const handleToggleOption = (value: string) => {
        // Toggle for multi-select chips
        setSelectedOptions(prev => {
            const exists = prev.includes(value);
            const next = exists ? prev.filter(v => v !== value) : [...prev, value];

            // Show button when at least one option is selected
            if (next.length > 0 && !showButton) {
                setShowButton(true);
                setIsButtonActive(false);
                setTimeout(() => {
                    setIsButtonActive(true);
                }, 1000);
            } else if (next.length === 0) {
                setShowButton(false);
                setIsButtonActive(false);
            }

            return next;
        });
    };

    const handleContinueClick = () => {
        if (!isButtonActive) return; // Don't allow click if button is not active

        if (isMulti) {
            // For multi, concatenate selected options into a comma string
            if (selectedOptions.length === 0) return;
            const value = selectedOptions.join(',');
            if (currentQuestionIndex < advancedQuestions.length - 1) {
                setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedOptions([]);
                setShowButton(false);
                setIsButtonActive(false);
            } else {
                // Last question (multi-select stocks) - store answer and show modal
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
        } else {
            navigateToOptionBased({ ...answers, [currentQuestion.id]: selectedOption });
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };


    return (
        <div className="min-h-screen text-white" style={{ background: 'var(--bg-gradient)' }}>
            <div className="w-[375px] mx-auto min-h-screen flex flex-col">
                {/* Header */}
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

                {/* Progress Indicator */}
                <ProgressIndicator
                    current={currentQuestionIndex + 1 + questionOffset}
                    total={totalQuestions}
                />

                {/* Question Card */}
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

                {/* Continue Button - Only show when showButton is true */}
                {showContinueButton && showButton && (
                    <div className="px-4 pb-6 animate-fade-in">
                        <PrimaryButton
                            onClick={handleContinueClick}
                            text={currentQuestion.id === 5 ? 'Continue' : 'Next Step'}
                            showIcon={true}
                            disabled={!isButtonActive}
                        />
                    </div>
                )}
            </div>

            {/* Analyzing Modal */}
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

