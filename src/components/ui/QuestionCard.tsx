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
    selectedOption?: string | null;
    className?: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
    questionText,
    description,
    options,
    illustration,
    onOptionSelect,
    selectedOption,
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
            <div className="space-y-2 mb-4">
                {options.map((option, index) => {
                    const isSelected = selectedOption === option.value;
                    const getGradientStyle = (colorIndex: number) => {
                        const gradients = [
                            `linear-gradient(135deg, var(--color-purple-light) 0%, var(--color-purple) 100%)`,
                            `linear-gradient(135deg, var(--color-purple-light) 0%, var(--color-purple) 100%)`,
                            `linear-gradient(135deg, var(--color-purple-light) 0%, var(--color-purple) 100%)`,
                            `linear-gradient(135deg, var(--color-purple-light) 0%, var(--color-purple) 100%)` 
                        ];
                        return gradients[colorIndex] || gradients[0];
                    };

                    return (
                        <button
                            key={option.value}
                            onClick={() => onOptionSelect(option.value)}
                            className="w-full py-4 px-6 rounded-xl text-white font-semibold text-lg relative"
                            style={{
                                backgroundColor: isSelected 
                                    ? 'rgba(125, 49, 216, 0.6)' 
                                    : `rgba(52, 8, 99, var(--opacity-46))`,
                                border: isSelected 
                                    ? '2px solid rgba(125, 49, 216, 0.8)' 
                                    : `1px solid rgba(125, 49, 216, var(--opacity-47))`,
                                boxShadow: isSelected 
                                    ? '0 0 12px rgba(125, 49, 216, 0.5)' 
                                    : `0 0 8px rgba(125, 49, 216, var(--opacity-30))`
                            }}
                            onMouseEnter={(e) => {
                                if (!isSelected) {
                                    e.currentTarget.style.background = getGradientStyle(index);
                                    e.currentTarget.style.border = 'none';
                                    e.currentTarget.style.boxShadow = `0 0 12px rgba(125, 49, 216, 0.5)`;
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isSelected) {
                                    e.currentTarget.style.background = `rgba(52, 8, 99, var(--opacity-46))`;
                                    e.currentTarget.style.border = `1px solid rgba(125, 49, 216, var(--opacity-47))`;
                                    e.currentTarget.style.boxShadow = `0 0 8px rgba(125, 49, 216, var(--opacity-30))`;
                                }
                            }}
                        >
                            {option.label}
                            {isSelected && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Quote Text - Only show when "buy-opportunity" is selected */}
            {selectedOption === 'buy-opportunity' && (
                <div className="text-center mb-6">
                    <p className="text-white text-base leading-relaxed italic">
                        "Making money teaches you confidence. Losing some teaches you resilience. Together, they make you wise."
                    </p>
                </div>
            )}

            {/* Illustration */}
            {illustration && (
                <div className="flex justify-end">
                    <img
                        src={illustration}
                        alt="Avatar"
                        className="h-48 object-contain"
                    />
                </div>
            )}
        </div>
    );
};

export default QuestionCard;