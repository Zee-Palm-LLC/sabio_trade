import React from 'react';

interface ResultsCardProps {
    text: string;
    className?: string;
}

const ResultsCard: React.FC<ResultsCardProps> = ({ text, className = '' }) => {
    return (
        <div 
            className={`rounded-xl ${className}`}
            style={{
                backgroundColor: '#031340',
                border: '1px solid #FFFFFF29',
                padding: '12px',
                marginBottom: '12px',
            }}
        >
            <p 
                className="text-white text-center"
                style={{
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '140%',
                    letterSpacing: '0%',
                }}
            >
                {text}
            </p>
        </div>
    );
};

export default ResultsCard;
