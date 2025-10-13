import React from 'react';

interface ProgressIndicatorProps {
    current: number;
    total: number;
    className?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ current, total, className = '' }) => {
    const progressPercentage = (current / total) * 100;

    return (
        <div className={`w-full px-4 ${className}`}>
            <div 
                className="w-full rounded-full overflow-hidden relative"
                style={{ 
                    height: '8px',
                    backgroundColor: `rgba(217, 217, 217, var(--opacity-24))`
                }}
            >
                <div
                    className="h-full transition-all duration-300 ease-out rounded-full absolute top-0 left-0"
                    style={{ 
                        width: `${progressPercentage}%`,
                        backgroundColor: 'var(--color-primary)'
                    }}
                />
            </div>
        </div>
    );
};

export default ProgressIndicator;
