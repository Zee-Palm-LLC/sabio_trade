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
    const radius = 150;
    const strokeWidth = 20;
    const normalizedRadius = radius - strokeWidth * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDasharray = `${circumference} ${circumference}`;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <Card
            padding="sm"
            className={`w-full mb-2 max-w-sm bg-[#340863] rounded-[12px] border border-[#7D31D87A] shadow-[0_0_12px_0_rgba(125,49,216,0.47)]`}
            style={{ padding: '16px' }}
        >
            {/* Top Text */}
            <div className="text-center" style={{ marginBottom: '8px', lineHeight: 1.2 }}>
                <h2
                    className="text-white font-[700] text-[20px] leading-[140%] text-center"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontStyle: 'bold', letterSpacing: '0%', margin: 0, padding: 0 }}
                >
                    {topText}
                </h2>
            </div>

            {/* Progress Circle */}
            <div className="flex justify-center items-center" style={{ marginTop: 0, marginBottom: 0, height: `${radius * 2 * 0.75}px`, lineHeight: 0 }}>
                <div className="relative" style={{ transform: 'scale(0.75)', transformOrigin: 'center', width: `${radius * 2}px`, height: `${radius * 2}px`, lineHeight: 0 }}>
                    <svg
                        height={radius * 2}
                        width={radius * 2}
                        className="transform -rotate-90"
                        style={{ display: 'block', verticalAlign: 'top' }}
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
                    <div className="absolute inset-0 flex items-center justify-center" style={{ lineHeight: 1 }}>
                        <span className="text-white font-bold text-5xl" style={{ lineHeight: 1 }}>
                            {progress}%
                        </span>
                    </div>
                </div>
            </div>

            {/* Bottom Text */}
            <div className="text-center" style={{ marginTop: '8px', lineHeight: 1.2 }}>
                <p
                    className="text-white"
                    style={{
                        fontWeight: 400,
                        fontStyle: 'normal',
                        fontSize: '14px',
                        lineHeight: '140%',
                        letterSpacing: '0%',
                        textAlign: 'center',
                        margin: 0,
                        padding: 0
                    }}
                >
                    {bottomText}
                </p>
            </div>
        </Card>
    );
};

export default ProgressCard;
