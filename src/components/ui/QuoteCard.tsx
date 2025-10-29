import React from 'react';
import QuoteIcon from '../../assets/quote.svg';

interface QuoteCardProps {
    quote: string;
    profileImage: string;
    name: string;
    role?: string;
    className?: string;
    bottomMargin?: string;

}

const QuoteCard: React.FC<QuoteCardProps> = ({
    quote,
    profileImage,
    name,
    bottomMargin = 'mb-6'
}) => {
    return (
        <div className={`bg-[#031340] rounded-[12px] p-4 ${bottomMargin} border border-slate-600/30`}>
            <div className="flex justify-center">
                <img src={QuoteIcon} alt="Quote" className="w-8 h-6 mb-2" />
            </div>
            <p className="text-white  text-[17px] leading-relaxed mb-2">
                <span className="block text-center">
                    {quote}
                </span>
            </p>
            <div className="flex items-center justify-center">
                <div className="w-8 h-6 rounded-full flex items-center justify-center mr-3 overflow-hidden">
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="object-cover w-6 h-6 rounded-full"
                    />
                </div>
                <span
                    className="text-white"
                    style={{
                        fontWeight: 400,
                        fontStyle: 'italic',
                        fontSize: '15px',
                        lineHeight: '100%',
                        letterSpacing: '0%',
                        color: 'rgba(255,255,255,0.7)',
                    }}
                >
                    {name}
                </span>
            </div>
        </div>
    );
};

export default QuoteCard;

