import React from 'react';
import backIcon from '../../assets/back.svg';

interface BackButtonProps {
    className?: string;
    onClick?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ className = '', onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-center ${className}`}
            style={{
                width: 35,
                height: 35,
                borderRadius: 6,
                backgroundColor: '#031340',
                border: '1.1px solid rgba(255,255,255,0.12)',
                transition: 'background-color 0.2s',
            }}
        >
            <img src={backIcon} alt="Back" className="w-4 h-4" />
        </button>
    );
};

export default BackButton;
