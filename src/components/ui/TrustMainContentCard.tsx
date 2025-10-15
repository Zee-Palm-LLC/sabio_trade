import React from 'react';
import profileImage from '../../assets/profile.png';
import { Card, QuoteCard } from '../index';

interface TrustMainContentCardProps {
    className?: string;
}

const TrustMainContentCard: React.FC<TrustMainContentCardProps> = ({ className = '' }) => {

    return (
        <Card
            className={`w-full max-w-sm ${className}`}
        >
            <div className="text-center p-1">
                <div className="text-center mb-3">
                    <div className="mb-2 inline-block font-bold leading-tight whitespace-nowrap" style={{ color: '#17F871', fontSize: 25 }}>
                        “Opening The 3rd Year”
                    </div>
                    <div className="text-center">
                        <div className="text-white font-medium leading-tight" style={{ fontSize: 14, opacity: 0.7 }}>
                            1 000 000 + people already use
                            <br />
                            Sabio
                        </div>
                    </div>
                </div>
            </div>
            <QuoteCard
                quote="“In trading, it’s not about being right, it’s about making money.”"
                profileImage={profileImage}
                name="Marty Schwartz"
            />
            <div className="text-center mb-6">
                <p className="text-white text-[14px] font-medium mb-2">Rated 4.3 on Trustpilot</p>
                <div className="flex justify-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                            key={star}
                            className={`w-4 h-4 ${star <= 4 ? 'text-yellow-400' : star === 5 ? 'text-yellow-200' : 'text-gray-400'}`}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                    ))}
                </div>
            </div>

        </Card>
    );
};

export default TrustMainContentCard;
