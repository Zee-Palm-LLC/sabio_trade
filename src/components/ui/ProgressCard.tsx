import React from 'react';
import Card from './Card';

interface ProgressCardProps {
    progress?: number;
    topText?: string;
    bottomText?: string;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ 
    progress = 65, 
    topText = "1,000,000+ trading profiles built — your personalized path is next.",
    bottomText = "Creating the personal challenge and trading profile..."
}) => {
    const radius = 80;
    const strokeWidth = 12;
    const normalizedRadius = radius - strokeWidth * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDasharray = `${circumference} ${circumference}`;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <Card
            className={`w-full mb-4 max-w-sm bg-[#340863] rounded-[12px] border border-[#7D31D87A] shadow-[0_0_12px_0_rgba(125,49,216,0.47)] p-6`}
        >
            {/* Top Text */}
            <div className="text-center mb-8">
                <h2 className="text-white font-bold text-lg leading-tight">
                    {topText}
                </h2>
            </div>

            {/* Progress Circle */}
            <div className="flex justify-center items-center mb-8">
                <div className="relative">
                    <svg
                        height={radius * 2}
                        width={radius * 2}
                        className="transform -rotate-90"
                    >
                        {/* Background circle */}
                        <circle
                            stroke="#1A2B50"
                            fill="transparent"
                            strokeWidth={strokeWidth}
                            r={normalizedRadius}
                            cx={radius}
                            cy={radius}
                        />
                        {/* Progress circle */}
                        <circle
                            stroke="url(#progressGradient)"
                            fill="transparent"
                            strokeWidth={strokeWidth}
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            r={normalizedRadius}
                            cx={radius}
                            cy={radius}
                        />
                        {/* Gradient definition */}
                        <defs>
                            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#0FB084" />
                                <stop offset="100%" stopColor="#2FA6B9" />
                            </linearGradient>
                        </defs>
                    </svg>
                    {/* Percentage text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white font-bold text-3xl">
                            {progress}%
                        </span>
                    </div>
                </div>
            </div>

            {/* Bottom Text */}
            <div className="text-center">
                <p className="text-white text-sm">
                    {bottomText}
                </p>
            </div>
        </Card>
    );
};

export default ProgressCard;
