import React from 'react';

interface AnswerResult {
    questionId: number;
    questionText: string;
    selectedAnswer: string;
    answerLabel: string;
}

interface ResultsCardProps {
    answer: AnswerResult;
    className?: string;
}

const ResultsCard: React.FC<ResultsCardProps> = ({ answer, className = '' }) => {
    return (
        <div className={`bg-[#1A2036] rounded-[12px] border border-slate-600/30 p-4 mb-4 ${className}`}>
            <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-[#17F871] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-black text-sm font-bold">{answer.questionId}</span>
                </div>
                <div className="flex-1">
                    <h3 className="text-white text-[15px] font-bold leading-relaxed mb-2">
                        {answer.questionText}
                    </h3>
                    <p className="text-[#17F871] text-[14px] font-semibold">
                        {answer.answerLabel}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResultsCard;
