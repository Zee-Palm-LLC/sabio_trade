import React from 'react';

interface QuizOption {
    value: string;
    label: string;
    color: string;
}

interface QuizQuestion {
    id: number;
    questionText: string;
    description: string;
    type: string;
    options: QuizOption[];
    illustration: string;
}

interface QuizData {
    quizTitle: string;
    totalQuestions: number;
    basicQuestions: QuizQuestion[];
    advancedQuestions: QuizQuestion[];
}

interface ResultsPageProps {
    quizData?: QuizData;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ quizData }) => {
    if (!quizData) {
        return <div>No quiz data available</div>;
    }

    // Combine basic and advanced questions instead of accessing non-existent 'questions' property
    const allQuestions = [...quizData.basicQuestions, ...quizData.advancedQuestions];

    return (
        <div className="min-h-screen bg-[#0A1628] p-4">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-white text-2xl font-bold mb-6">{quizData.quizTitle}</h1>
                
                {allQuestions.map((question: QuizQuestion) => (
                    <div key={question.id} className="mb-4">
                        <h2 className="text-white text-lg mb-2">{question.questionText}</h2>
                        <div className="space-y-2">
                            {question.options.map((option: QuizOption, index: number) => (
                                <div key={index} className="p-3 bg-[#1A2036] rounded-lg border border-slate-600/30">
                                    <span className="text-white">{option.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResultsPage;

