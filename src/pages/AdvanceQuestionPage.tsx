import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowRight from '../assets/arrow-right.svg';
import Logo from '../assets/logo.png';
import { BackButton, ProgressIndicator } from '../components';
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
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // for multi-select

    const totalQuestions = advancedQuestions.length;
    const currentQuestion: any = advancedQuestions[currentQuestionIndex];

    const isMulti = Boolean(currentQuestion.multi);
    
    // Determine if current question should show Continue button
    // Question 1 (id: 5) has Continue button, Questions 2 & 3 (id: 6, 7) don't. Last (multi) shows button.
    const showContinueButton = currentQuestion.id === 5 || isMulti;

    const handleBackClick = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedOption(null);
            setSelectedOptions([]);
        } else {
            navigate(-1);
        }
    };

    // Helper: map selected label to 1-based option index for a given question
    const getSelectedOptionIndex = (questionIdx: number, value: string): number => {
        const opts: any[] = advancedQuestions[questionIdx].options as any[];
        const labels = opts.map((opt: any) => typeof opt === 'string' ? opt : opt.label);
        const idx = labels.findIndex(l => l === value);
        return idx >= 0 ? idx + 1 : 0; // 1..n or 0 if not found
    };

    const navigateToOptionBased = (finalAnswers: Record<number, string>) => {
        // Build array of 1-based indices in question order
        const optionIndices = advancedQuestions.map((q: any, qIdx: number) => {
            const selected = finalAnswers[q.id];
            return selected ? getSelectedOptionIndex(qIdx, selected) : 0;
        });
        console.log('Navigating to OptionBasedPage with:', { finalAnswers, optionIndices });
        navigate('/option-based', { state: { optionIndices } });
    };

    const handleOptionSelect = (value: string) => {
        if (isMulti) return; // multi handled in toggle below
        setSelectedOption(value);

        // Store the answer keyed by question id
        setAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: value
        }));

        // Auto-advance if no Continue button (questions 2 & 3)
        if (!showContinueButton) {
            setTimeout(() => {
                // After question 3 (id 7, index 2), navigate to OptionBasedPage
                if (currentQuestion.id === 7) {
                    navigateToOptionBased({ ...answers, [currentQuestion.id]: value });
                } else if (currentQuestionIndex < advancedQuestions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                    setSelectedOption(null);
                } else {
                    navigateToOptionBased({ ...answers, [currentQuestion.id]: value });
                }
            }, 250);
        }
    };

    const handleToggleOption = (value: string) => {
        // Toggle for multi-select chips
        setSelectedOptions(prev => {
            const exists = prev.includes(value);
            const next = exists ? prev.filter(v => v !== value) : [...prev, value];
            return next;
        });
    };

    const handleContinueClick = () => {
        if (isMulti) {
            // For multi, concatenate selected options into a comma string
            if (selectedOptions.length === 0) return;
            const value = selectedOptions.join(',');
            if (currentQuestionIndex < advancedQuestions.length - 1) {
                setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedOptions([]);
            } else {
                // Last question (multi-select stocks) - navigate to AnalyzingVid
                navigate('/analyzing-final');
            }
            return;
        }

        if (!selectedOption) return;

        if (currentQuestionIndex < advancedQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
        } else {
            navigateToOptionBased({ ...answers, [currentQuestion.id]: selectedOption });
        }
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
                                {currentQuestionIndex + 1} /
                            </span>
                            <span className="font-bold text-base leading-[18px]" style={{ color: 'rgba(255, 255, 255, var(--opacity-80))' }}>
                                {totalQuestions}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Progress Indicator */}
                <ProgressIndicator
                    current={currentQuestionIndex + 1}
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

                {/* Continue Button */}
                {showContinueButton && (
                    <div className="px-4 pb-6">
                        <button
                            onClick={handleContinueClick}
                            disabled={(!isMulti && !selectedOption) || (isMulti && selectedOptions.length === 0)}
                            className={`w-full font-semibold py-4 px-6 transition-colors duration-200 flex items-center justify-center ${
                                (!isMulti && selectedOption) || (isMulti && selectedOptions.length > 0) ? 'cursor-pointer' : 'cursor-not-allowed'
                            }`}
                            style={{
                                borderRadius: 108,
                                background: ((!isMulti && selectedOption) || (isMulti && selectedOptions.length > 0))
                                    ? 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary-light) 100%)'
                                    : 'var(--color-button-disabled)',
                                color: ((!isMulti && selectedOption) || (isMulti && selectedOptions.length > 0)) ? 'var(--color-text)' : 'var(--color-button-disabled-text)',
                                paddingTop: 12,
                                paddingBottom: 12,
                            }}
                        >
                            <span className="mr-2">Next Step</span>
                            {((!isMulti && selectedOption) || (isMulti && selectedOptions.length > 0)) && <img src={ArrowRight} alt="Arrow Right" className="w-5 h-3" />}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdvanceQuestionPage;

