import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import StandingAvatar from '../assets/standing_avatar.png';
import { BackButton, BottomShade, ProgressIndicator, QuestionCard } from '../components';
import quizData from '../data/quiz.json';

const QuestionPage: React.FC = () => {
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const availableQuestions = quizData;
    const totalQuestions = 13;
    const currentQuestion = availableQuestions[currentQuestionIndex];
    const questionOptions = currentQuestion.options.map((option: string) => ({
        value: option,
        label: option,
        color: 'var(--color-purple-primary)'
    }));

    const handleBackClick = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        } else {
            navigate(-1);
        }
    };

    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleOptionSelect = (value: string) => {
        console.log('Selected option:', value);
        setSelectedOption(value);

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


    return (
        <div className="min-h-screen text-white relative" style={{ background: 'var(--bg-gradient)' }}>
            <BottomShade />
            <div className="w-[375px] mx-auto min-h-screen flex flex-col relative z-10">
                <div className="flex flex-col items-center pt-8 pb-4">
                    <div className="flex items-center justify-between w-full px-4 mb-3">
                        <BackButton onClick={handleBackClick} />
                        <img src={Logo} alt="SabioTrade" className="h-14" />
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
                <ProgressIndicator
                    current={currentQuestionIndex + 1}
                    total={totalQuestions}
                />
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
        </div>
    );
};

export default QuestionPage;