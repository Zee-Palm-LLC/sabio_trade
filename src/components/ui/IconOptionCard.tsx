import React from 'react';

export interface IconOption {
    label: string;
    icon?: string; // image path
}

interface IconOptionCardProps {
    options: IconOption[];
    selected: string | null;
    onSelect: (value: string) => void;
}

const IconOptionCard: React.FC<IconOptionCardProps> = ({ options, selected, onSelect }) => {
    return (
        <div className="space-y-3">
            {options.map((opt, idx) => {
                const isSelected = selected === opt.label;
                const hasIcon = !!opt.icon;
                return (
                    <button
                        key={`${opt.label}-${idx}`}
                        onClick={() => onSelect(opt.label)}
                        className={`w-full py-3 px-4 rounded-xl text-white transition-all duration-200 flex items-center gap-3 ${hasIcon ? 'text-left' : 'text-center justify-center'}`}
                        style={{
                            backgroundColor: isSelected ? 'rgba(125, 49, 216, 0.6)' : 'rgba(52, 8, 99, 0.46)',
                            border: isSelected ? '2px solid rgba(125, 49, 216, 0.8)' : '1px solid rgba(125, 49, 216, 0.47)',
                            boxShadow: isSelected ? '0 0 12px rgba(125, 49, 216, 0.5)' : '0 0 8px rgba(125, 49, 216, 0.30)'
                        }}
                    >
                        {opt.icon && (
                            <img src={opt.icon} alt={opt.label} className="w-6 h-6 object-contain" />
                        )}
                        <span className="font-medium text-[16px]">{opt.label}</span>
                    </button>
                );
            })}
        </div>
    );
};

export default IconOptionCard;


