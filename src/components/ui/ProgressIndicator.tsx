import React from 'react';

interface ProgressIndicatorProps {
    current: number;
    total: number;
    className?: string;
    inactiveColor?: string;
    activeColor?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
    current, 
    total, 
    className = '',
    inactiveColor = 'rgba(217, 217, 217, 0.24)',
    activeColor = '#17F871'
}) => {
    const progressPercentage = (current / total) * 100;

    return (
        <div className={`w-full px-4 ${className}`}>
            <div 
                className="w-full rounded-full overflow-hidden relative"
                style={{ 
                    height: '8px',
                    backgroundColor: inactiveColor
                }}
            >
                <div
                    className="h-full transition-all duration-300 ease-out rounded-full absolute top-0 left-0"
                    style={{ 
                        width: `${progressPercentage}%`,
                        backgroundColor: activeColor
                    }}
                />
            </div>
        </div>
    );
};

export default ProgressIndicator;
