import React from 'react';
import profileImage from '../../assets/profile.png';
import StarIcon from '../../assets/yellow_star.svg';
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
                <div className="text-center mb-2">
                    <div className="mb-1 inline-block font-bold leading-tight whitespace-nowrap" style={{ color: '#17F871', fontSize: 25 }}>
                        "Opening The 3rd Year"
                    </div>
                    <div className="text-center">
                        <div className="text-white font-[400] leading-tight" style={{ fontSize: 14, opacity: 0.7 }}>
                            "1 000 000 + people already<br /> use Sabio"
                        </div>
                    </div>
                </div>
            </div>
            <QuoteCard
                quote={'"In trading, it\'s not about being right, it\'s about making money."'}
                profileImage={profileImage}
                name="Marty Schwartz"
            />
            <div className="text-center mb-3">
                <p className="text-white text-[14px] font-medium mb-1">Rated 4.3 on Trustpilot</p>
                <div className="flex justify-center space-x-1">
                    {[1, 2, 3, 4, 5].map((_, index) => (
                        <img key={index} src={StarIcon} alt="Star" className="w-4 h-5" />
                    ))}
                </div>
            </div>

        </Card>
    );
};

export default TrustMainContentCard;
