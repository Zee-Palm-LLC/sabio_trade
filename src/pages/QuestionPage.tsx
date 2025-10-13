import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import StandingAvatar from '../assets/standing_avatar.png';
import { BackButton, ProgressIndicator, QuestionCard } from '../components';
import quizData from '../data/quiz.json';

const QuestionPage: React.FC = () => {
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const currentQuestion = quizData.questions[currentQuestionIndex];

    const handleBackClick = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        } else {
            navigate(-1); // Go back to previous page
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
            if (currentQuestionIndex < quizData.questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                // Quiz completed - navigate to analyzing page
                const newAnswers = { ...answers, [currentQuestion.id]: value };
                navigate('/analyzing', { state: { answers: newAnswers } });
            }
        }, 500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
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
                                {quizData.totalQuestions}
                            </span>
                        </div>
                    </div>
                </div>
                <ProgressIndicator
                    current={currentQuestionIndex + 1}
                    total={quizData.totalQuestions}
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