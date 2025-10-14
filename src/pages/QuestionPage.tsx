import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowRight from '../assets/arrow-right.svg';
import Logo from '../assets/logo.png';
import StandingAvatar from '../assets/standing_avatar.png';
import { BackButton, ProgressIndicator, QuestionCard } from '../components';
import quizData from '../data/quiz.json';

const QuestionPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});

    // Determine starting question and available questions based on navigation source
    useEffect(() => {
        const fromWelcome = location.state?.fromWelcome;
        const fromTrust = location.state?.fromTrust;

        if (fromWelcome) {
            // Start from question 5 (index 4) when coming from WelcomePage
            setCurrentQuestionIndex(4);
        } else if (fromTrust) {
            // Start from question 1 (index 0) when coming from TrustPage
            setCurrentQuestionIndex(0);
        } else {
            // Default to question 1
            setCurrentQuestionIndex(0);
        }
    }, [location.state]);

    // Determine available questions based on navigation source
    const fromWelcome = location.state?.fromWelcome;
    const fromTrust = location.state?.fromTrust;
    const questionList = location.state?.questionList; // New parameter to specify which list

    let availableQuestions;
    const totalQuestions = quizData.basicQuestions.length + quizData.advancedQuestions.length;

    if (questionList === 'basic' || fromTrust) {
        // Show basic questions (1-4)
        availableQuestions = quizData.basicQuestions;
    } else if (questionList === 'advanced' || fromWelcome) {
        // Show advanced questions (5-9)
        availableQuestions = quizData.advancedQuestions;
    } else {
        // Default: show basic questions
        availableQuestions = quizData.basicQuestions;
    }

    const currentQuestion = availableQuestions[currentQuestionIndex];
    const currentQuestionNumber = currentQuestion?.id || currentQuestionIndex + 1;

    const handleBackClick = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        } else {
            // Go back to the appropriate page based on navigation source
            if (questionList === 'advanced' || fromWelcome) {
                navigate('/welcome');
            } else if (questionList === 'basic' || fromTrust) {
                navigate('/trust');
            } else {
                navigate(-1); // Default fallback
            }
        }
    };

    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleOptionSelect = (value: string) => {
        console.log('Selected option:', value);
        setSelectedOption(value);

        // Store the answer
        setAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: value
        }));

        setTimeout(() => {
            if (currentQuestionIndex < availableQuestions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedOption(null);
            } else {
                navigate('/analyzing', { state: { answers } });
            }
        }, 200);
    };

    const handleContinueClick = () => {
        if (currentQuestionIndex < availableQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
        } else {
            navigate('/analyzing', { state: { answers } });
        }
    };

    return (
        <div className="min-h-screen text-white" style={{ background: 'var(--bg-gradient)' }}>
            <div className="w-[375px] mx-auto min-h-screen flex flex-col">
                <div className="flex flex-col items-center pt-8 pb-4 px-4">
                    <div className="flex items-center justify-between w-full mb-3">
                        <BackButton onClick={handleBackClick} />
                        <div className="flex items-center">
                            <img src={Logo} alt="SabioTrade" className="h-14" />
                        </div>
                        <div className="flex items-center space-x-1">
                            <span className="font-bold text-base leading-[18px]" style={{ color: 'var(--color-primary)' }}>
                                {currentQuestionNumber} /
                            </span>
                            <span className="font-bold text-base leading-[18px]" style={{ color: 'rgba(255, 255, 255, var(--opacity-80))' }}>
                                {totalQuestions}
                            </span>
                        </div>
                    </div>
                </div>
                <ProgressIndicator
                    current={currentQuestionNumber}
                    total={totalQuestions}
                />
                <QuestionCard
                    questionText={currentQuestion.questionText}
                    description={currentQuestion.description}
                    options={currentQuestion.options}
                    illustration={questionList === 'advanced' ? undefined : StandingAvatar}
                    onOptionSelect={handleOptionSelect}
                    selectedOption={selectedOption}
                />

                {/* Continue Button - Only show for advanced questions */}
                {questionList === 'advanced' && (
                    <div className="px-4 pb-6">
                        <button
                            onClick={handleContinueClick}
                            disabled={!selectedOption}
                            className={`w-full font-semibold py-4 px-6 transition-colors duration-200 flex items-center justify-center ${selectedOption ? 'cursor-pointer' : 'cursor-not-allowed'
                                }`}
                            style={{
                                borderRadius: 108,
                                background: selectedOption
                                    ? `linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary-light) 100%)`
                                    : 'var(--color-button-disabled)',
                                color: selectedOption ? 'var(--color-text)' : 'var(--color-button-disabled-text)',
                                paddingTop: 12,
                                paddingBottom: 12,
                            }}
                        >
                            <span className="mr-2">
                                {currentQuestionIndex < availableQuestions.length - 1 ? 'Continue' : 'Finish'}
                            </span>
                            {selectedOption && <img src={ArrowRight} alt="Arrow Right" className="w-5 h-3" />}
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default QuestionPage;