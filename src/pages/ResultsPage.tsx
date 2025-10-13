import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowRight from '../assets/arrow-right.svg';
import Logo from '../assets/logo.png';
import { BackButton, Card, ResultsCard } from '../components';
import quizData from '../data/quiz.json';

interface AnswerResult {
    questionId: number;
    questionText: string;
    selectedAnswer: string;
    answerLabel: string;
}

const ResultsPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [results, setResults] = useState<AnswerResult[]>([]);

    useEffect(() => {
        // Get answers from location state or localStorage
        const answers = location.state?.answers || JSON.parse(localStorage.getItem('quizAnswers') || '{}');
        
        // Process answers into results format
        const processedResults: AnswerResult[] = [];
        
        quizData.questions.forEach((question) => {
            const answer = answers[question.id];
            if (answer) {
                const selectedOption = question.options.find(option => option.value === answer);
                if (selectedOption) {
                    processedResults.push({
                        questionId: question.id,
                        questionText: question.questionText,
                        selectedAnswer: answer,
                        answerLabel: selectedOption.label
                    });
                }
            }
        });
        
        setResults(processedResults);
    }, [location.state]);

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleContinueClick = () => {
        navigate('/welcome');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 md:bg-gradient-to-br md:from-slate-900 md:via-purple-900 md:to-slate-900 text-white">
            <div className="w-[375px] mx-auto min-h-screen flex flex-col">
                {/* Header */}
                <div className="flex flex-col items-center justify-between pt-8 pb-0">
                    <div className="flex items-center justify-between w-full px-4 mb-3">
                        <div className="flex items-center space-x-2">
                            <img src={Logo} alt="SabioTrade" className="w-8 h-8" />
                            <div>
                                <span className="text-white text-lg font-bold">SabioTrade</span>
                                <p className="text-white/60 text-xs">Ultimate Trading Prop Firm</p>
                            </div>
                        </div>
                        <BackButton onClick={handleBackClick} />
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col items-center justify-center px-4 mb-1 mt-5">
                    <Card className="bg-[#340863] rounded-[12px] border border-[#7D31D87A] shadow-[0_0_12px_0_rgba(125,49,216,0.47)] w-full max-w-sm">
                        <div className="text-center mb-6">
                            <h1 className="text-white text-2xl font-bold mb-4 leading-tight">
                                Your Trading Profile
                            </h1>
                            <p className="text-white/70 text-base leading-relaxed">
                                Based on your answers, here's your personalized trading profile
                            </p>
                        </div>

                        <div className="space-y-3 mb-6">
                            {results.map((result) => (
                                <ResultsCard key={result.questionId} answer={result} />
                            ))}
                        </div>

                        <div className="text-center">
                            <p className="text-white text-[14px] font-medium mb-2">
                                Ready to start your trading journey?
                            </p>
                        </div>
                    </Card>
                </div>

                {/* Continue Button */}
                <div className="px-4 pb-6">
                    <button
                        onClick={handleContinueClick}
                        className="w-full text-white font-semibold py-4 px-6 transition-colors duration-200 flex items-center justify-center"
                        style={{
                            borderRadius: 108,
                            background: 'linear-gradient(135deg, #0FB084 0%, #2FA6B9 100%)',
                            paddingTop: 12,
                            paddingBottom: 12,
                        }}
                    >
                        <span className="mr-2">Continue</span>
                        <img src={ArrowRight} alt="Arrow Right" className="w-5 h-3" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResultsPage;
