import React from 'react';

interface QuestionOption {
    value: string;
    label: string;
    color: string;
}

interface QuestionCardProps {
    questionText: string;
    description: string;
    options: QuestionOption[];
    illustration?: string;
    onOptionSelect: (value: string) => void;
    className?: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
    questionText,
    description,
    options,
    illustration,
    onOptionSelect,
    className = ''
}) => {
    return (
        <div className={`flex-1 flex flex-col justify-center px-4 mb-1 mt-5 ${className}`}>
            <div className="text-center mb-8">
                <h2 className="text-white text-3xl font-bold mb-0 leading-tight">
                    {questionText}
                </h2>
                <p className="text-white/70 text-base leading-tight">
                    {description}
                </p>
            </div>

            {/* Options */}
            <div className="space-y-4 mb-8">
                {options.map((option, index) => {
                    const getGradientStyle = (colorIndex: number) => {
                        const gradients = [
                            'linear-gradient(135deg, #8844EE 0%, #4B0082 100%)', // First option
                            'linear-gradient(135deg, #4A55E6 0%, #2DB3EC 100%)', // Second option
                            'linear-gradient(135deg, #0FB084 0%, #44CCD1 100%)', // Third option
                            'linear-gradient(135deg, #594FE7 0%, #A58FF7 100%)'  // Fourth option
                        ];
                        return gradients[colorIndex] || gradients[0];
                    };

                    return (
                        <button
                            key={option.value}
                            onClick={() => onOptionSelect(option.value)}
                            className="w-full py-4 px-6 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 relative overflow-hidden group"
                            style={{
                                backgroundColor: 'rgba(52, 8, 99, 0.46)', // 340863 with 46% opacity
                                border: '1px solid rgba(125, 49, 216, 0.47)', // 7D31D8 with 47% opacity
                                boxShadow: '0 0 8px rgba(125, 49, 216, 0.3)', // Subtle glow
                                fontSize: '16px'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = getGradientStyle(index);
                                e.currentTarget.style.border = 'none';
                                e.currentTarget.style.boxShadow = '0 0 12px rgba(125, 49, 216, 0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(52, 8, 99, 0.46)';
                                e.currentTarget.style.border = '1px solid rgba(125, 49, 216, 0.47)';
                                e.currentTarget.style.boxShadow = '0 0 8px rgba(125, 49, 216, 0.3)';
                            }}
                        >
                            {option.label}
                        </button>
                    );
                })}
            </div>

            {/* Illustration */}
            {illustration && (
                <div className="flex justify-end">
                    <img
                        src={illustration}
                        alt="Avatar"
                        className="h-40 object-contain"
                    />
                </div>
            )}
        </div>
    );
};

export default QuestionCard;