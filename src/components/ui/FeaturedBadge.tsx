import React from 'react';

interface FeaturedBadgeProps {
    icon?: React.ReactNode;
    text: string;
    className?: string;
}

const FeaturedBadge: React.FC<FeaturedBadgeProps> = ({
    icon,
    text,
    className = ''
}) => {
    return (
        <div
            className={`flex items-center px-3 py-2 rounded-lg text-white text-xs font-medium whitespace-nowrap shadow-lg ${className}`}
            style={{
                background: 'rgba(32, 47, 103, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
            }}
        >
            <div
                className="w-6 h-6 rounded-md flex items-center justify-center mr-3 flex-shrink-0"
                style={{ backgroundColor: 'rgba(32, 47, 103, 0.8)' }}
            >
                {icon}
            </div>
            <span className="text-white">{text}</span>
        </div>
    )
}

export default FeaturedBadge;