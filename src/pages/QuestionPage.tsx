import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
    
    let availableQuestions;
    let totalQuestions;
    
    if (fromWelcome) {
        // Show questions 5-9 (indices 4-8)
        availableQuestions = quizData.questions.slice(4, 9);
        totalQuestions = 5;
    } else if (fromTrust) {
        // Show questions 1-4 (indices 0-3)
        availableQuestions = quizData.questions.slice(0, 4);
        totalQuestions = 4;
    } else {
        // Default: show all questions
        availableQuestions = quizData.questions;
        totalQuestions = quizData.totalQuestions;
    }
    
    const currentQuestion = availableQuestions[currentQuestionIndex];

    const handleBackClick = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        } else {
            // Go back to the appropriate page based on navigation source
            if (fromWelcome) {
                navigate('/welcome');
            } else if (fromTrust) {
                navigate('/trust');
            } else {
                navigate(-1); // Default fallback
            }
        }
    };

    const handleOptionSelect = (value: string) => {
        console.log('Selected option:', value);

        // Store the answer
        setAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: value
        }));

        // Move to next question after a short delay for better UX
        setTimeout(() => {
            if (currentQuestionIndex < availableQuestions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                // Quiz completed - navigate to analyzing page
                const newAnswers = { ...answers, [currentQuestion.id]: value };
                navigate('/analyzing', { state: { answers: newAnswers } });
            }
        }, 500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 md:bg-gradient-to-br md:from-slate-900 md:via-purple-900 md:to-slate-900 text-white">
            <div className="w-[375px] mx-auto min-h-screen flex flex-col">
                <div className="flex flex-col items-center pt-8 pb-4 px-4">
                    <div className="flex items-center justify-between w-full mb-3">
                        <BackButton onClick={handleBackClick} />
                        <div className="flex items-center">
                            <img src={Logo} alt="SabioTrade" className="h-14" />
                        </div>
                        <div className="flex items-center space-x-1">
                            <span className="text-[#17F871] font-bold text-base leading-[18px]">
                                {currentQuestionIndex + 1} /
                            </span>
                            <span className="text-white/80 font-bold text-base leading-[18px]">
                                {totalQuestions}
                            </span>
                        </div>
                    </div>
                </div>
                <ProgressIndicator
                    current={currentQuestionIndex + 1}
                    total={totalQuestions}
                />
                <QuestionCard
                    questionText={currentQuestion.questionText}
                    description={currentQuestion.description}
                    options={currentQuestion.options}
                    illustration={StandingAvatar}
                    onOptionSelect={handleOptionSelect}
                />

            </div>
        </div>
    );
};

export default QuestionPage;