import React from 'react';

interface QuoteCardProps {
    quote: string;
    profileImage: string;
    name: string;
    role?: string;
    className?: string;
}

const QuoteCard: React.FC<QuoteCardProps> = ({
    quote,
    profileImage,
    name,
    role,
    className = ''
}) => {
    return (
        <div
            className={`rounded-xl p-4 ${className}`}
            style={{
                background: '#031340',
                border: '1px solid rgba(255, 255, 255, 0.16)',
            }}
        >
            {/* Quote Text */}
            <div className="mb-4">
                <p className="text-white text-sm leading-relaxed italic">
                    "{quote}"
                </p>
            </div>

            {/* Profile Section */}
            <div className="flex items-center gap-3">
                <img
                    src={profileImage}
                    alt={name}
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                    <p className="text-white font-semibold text-sm">{name}</p>
                    {role && (
                        <p className="text-white/60 text-xs">{role}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuoteCard;

