import React from 'react';
import AmazonIcon from '../../assets/amazon.png';
import AppleIcon from '../../assets/apple.png';
import BoeingIcon from '../../assets/boeing.png';
import GoogleIcon from '../../assets/google.png';
import MicrosoftIcon from '../../assets/microsoft.png';
import NetflixIcon from '../../assets/netflix.png';
import NvidiaIcon from '../../assets/nvidia.png';
import TeslaIcon from '../../assets/tesla.png';

interface OptionWithDescription {
    label: string;
    description?: string;
    subtitle?: string;
}

interface AdvancedQuestionCardProps {
    question: string;
    subtitle?: string;
    options: OptionWithDescription[] | string[];
    selectedOption: string | null;
    selectedOptions?: string[]; // for multi-select
    onOptionSelect: (value: string) => void;
    onToggleOption?: (value: string) => void; // for multi-select
    showContinueButton?: boolean;
    multi?: boolean;
}

const AdvancedQuestionCard: React.FC<AdvancedQuestionCardProps> = ({
    question,
    subtitle,
    options,
    selectedOption,
    selectedOptions = [],
    onOptionSelect,
    onToggleOption,
    showContinueButton = true,
    multi = false
}) => {
    const iconMap: Record<string, string> = {
        'nvidia': NvidiaIcon,
        'boeing': BoeingIcon,
        'netflix': NetflixIcon,
        'apple': AppleIcon,
        'tesla': TeslaIcon,
        'amazon': AmazonIcon,
        'google': GoogleIcon,
        'microsoft': MicrosoftIcon,
    };

    const filteredOptions = React.useMemo(() => {
        if (!showContinueButton || multi || !selectedOption) {
            return options;
        }
        return options.filter(opt => {
            const label = typeof opt === 'string' ? opt : opt.label;
            return label === selectedOption;
        });
    }, [options, selectedOption, showContinueButton, multi]);

    return (
        <div className="flex flex-col px-4 mb-1 mt-5">
            <div className="text-center mb-8">
                <h2 className="text-white text-3xl font-bold mb-2 leading-tight">
                    {question}
                </h2>
                {subtitle && (
                    <p className="text-white/70 text-sm leading-tight mt-3 italic">
                        {subtitle}
                    </p>
                )}
            </div>

            <div className={multi ? "mb-4 flex flex-wrap gap-3 justify-center" : "mb-4"}>
                {filteredOptions.map((option, index) => {
                    const optionLabel = typeof option === 'string' ? option : option.label;
                    const optionDescription = typeof option === 'string' ? '' : (option.description || '');
                    const optionSubtitle = typeof option === 'string' ? '' : (option.subtitle || '');
                    const isSelected = multi ? selectedOptions.includes(optionLabel) : (selectedOption === optionLabel);

                    return (
                        <div
                            key={optionLabel}
                            className={`${!multi && index < filteredOptions.length - 1 ? 'mb-3' : ''} transition-all duration-500 ease-in-out`}
                        >
                            <button
                                onClick={() => (multi ? onToggleOption && onToggleOption(optionLabel) : onOptionSelect(optionLabel))}
                                className={multi ?
                                    `px-3 py-2 rounded-[100px] text-white font-normal text-[15px] transition-all duration-200 flex items-center gap-2 border ${isSelected ? 'ring-2 ring-[#7D31D8]' : ''}`
                                    :
                                    `w-full py-4 px-6 rounded-xl text-white font-semibold text-[16px] transition-all duration-500 relative`
                                }
                                style={multi ? {
                                    background: '#1A0C4E',
                                    border: '1px solid #FFFFFF2E'
                                } : {
                                    backgroundColor: isSelected
                                        ? 'rgba(125, 49, 216, 0.6)'
                                        : 'rgba(52, 8, 99, 0.46)',
                                    border: isSelected
                                        ? '2px solid rgba(125, 49, 216, 0.8)'
                                        : '1px solid rgba(125, 49, 216, 0.47)',
                                    boxShadow: isSelected
                                        ? '0 0 12px rgba(125, 49, 216, 0.5)'
                                        : '0 0 8px rgba(125, 49, 216, 0.30)'
                                }}
                            >
                                {multi && (() => {
                                    const iconSrc = iconMap[optionLabel.toLowerCase()];
                                    if (iconSrc) {
                                        return (
                                            <img src={iconSrc} alt={optionLabel} className="w-4 h-4 object-contain" />
                                        );
                                    }
                                    return (
                                        <div></div>
                                    );
                                })()}
                                <span>{optionLabel}</span>
                                {!multi && isSelected && (
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                )}
                            </button>

                            {!multi && showContinueButton && isSelected && (
                                <div className="mt-4">
                                    {/* Option-specific subtitle */}
                                    {optionSubtitle && optionSubtitle.trim() !== '' && (
                                        <p className="text-white/70 text-sm text-center mb-3 italic">
                                            {optionSubtitle}
                                        </p>
                                    )}

                                    {/* Option-specific description */}
                                    {optionDescription && optionDescription.trim() !== '' && (
                                        <p className="text-white text-base leading-relaxed text-center">
                                            {optionDescription}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AdvancedQuestionCard;

