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
                            className="w-full py-4 px-0 rounded-xl text-white font-semibold text-lg "
                            style={{
                                backgroundColor: `rgba(52, 8, 99, var(--opacity-46))`, // 340863 with 46% opacity
                                border: `1px solid rgba(125, 49, 216, var(--opacity-47))`, // 7D31D8 with 47% opacity
                                boxShadow: `0 0 8px rgba(125, 49, 216, var(--opacity-30))` // Subtle glow
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = getGradientStyle(index);
                                e.currentTarget.style.border = 'none';
                                e.currentTarget.style.boxShadow = `0 0 12px rgba(125, 49, 216, 0.5)`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = `rgba(52, 8, 99, var(--opacity-46))`;
                                e.currentTarget.style.border = `1px solid rgba(125, 49, 216, var(--opacity-47))`;
                                e.currentTarget.style.boxShadow = `0 0 8px rgba(125, 49, 216, var(--opacity-30))`;
                            }}
                        >
                            {option.label}
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