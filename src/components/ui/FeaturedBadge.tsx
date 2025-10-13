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
            className={`flex items-center px-3 py-2 bg-[#340863] rounded-lg border border-blue-400/20 text-white text-xs font-medium whitespace-nowrap shadow-lg ${className}`}
        >
            <div
                className="w-6 h-6 rounded-md flex items-center justify-center mr-3 flex-shrink-0"
                style={{ backgroundColor: 'rgba(245, 246, 251, 0.1)' }}
            >
                {icon}
            </div>
            <span className="text-white">{text}</span>
        </div>
    )
}

export default FeaturedBadge;