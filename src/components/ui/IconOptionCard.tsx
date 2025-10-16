import React from 'react';

export interface IconOption {
    label: string;
    icon?: string; // image path
}

interface IconOptionCardProps {
    options: IconOption[];
    selected: string | null;
    onSelect: (value: string) => void;
    align?: 'left' | 'center';
}

const IconOptionCard: React.FC<IconOptionCardProps> = ({ options, selected, onSelect, align = 'center' }) => {
    return (
        <div className="space-y-3">
            {options.map((opt, idx) => {
                const isSelected = selected === opt.label;
                const hasIcon = !!opt.icon;
                return (
                    <button
                        key={`${opt.label}-${idx}`}
                        onClick={() => onSelect(opt.label)}
                        className={`w-full py-3 px-4 rounded-xl text-white transition-all duration-200 flex items-center gap-3 relative ${align === 'left' ? 'justify-start' : 'justify-center'}`}
                        style={{
                            minHeight: '56px',
                            backgroundColor: isSelected ? 'rgba(125, 49, 216, 0.6)' : 'rgba(52, 8, 99, 0.46)',
                            border: isSelected ? '2px solid rgba(125, 49, 216, 0.8)' : '1px solid rgba(125, 49, 216, 0.47)',
                            boxShadow: isSelected ? '0 0 12px rgba(125, 49, 216, 0.5)' : '0 0 8px rgba(125, 49, 216, 0.30)'
                        }}
                    >
                        {opt.icon && (
                            <img src={opt.icon} alt={opt.label} className="w-6 h-6 object-contain" />
                        )}
                        <span className="font-medium text-[18px] leading-tight text-left">{opt.label}</span>
                        {isSelected && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default IconOptionCard;


