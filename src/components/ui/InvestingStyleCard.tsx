import React from 'react';
import { useNavigate } from 'react-router-dom';
import chartIcon from '../../assets/chart.png';
import avatar from '../../assets/image-2.png';
import { Button, Card } from '../index';

interface InvestingStyleCardProps {
    className?: string;
}

const InvestingStyleCard: React.FC<InvestingStyleCardProps> = ({ className = '' }) => {
    const navigate = useNavigate();

    const handleSaverClick = () => {
        navigate('/trust');
    };

    const handleInvestorClick = () => {
        navigate('/trust');
    };

    return (
        <Card
            className={`w-full max-w-sm rounded-[12px] border shadow-[0_0_12px_0_rgba(125,49,216,0.47)] ${className}`}
        >
            <div className="text-center pt-0 pb-2 pl-4 pr-4">
                <h2 className="text-[30px] font-semibold text-white mb-2 leading-tight">What’s your Investor Profile?</h2>
                <p className="text-[16px] text-gray-300 text-sm mb-0 font-regular leading-[1]">(2 Min Quiz + Free Plan)</p>
                <div className="relative w-full h-36 mb-6 flex items-center justify-center">
                    <img src={chartIcon} alt="Chart" className="w-full h-24 object-cover" />
                    <img
                        src={avatar}
                        alt="Avatar"
                        className="absolute bottom-[-25px] left-1/2 transform -translate-x-1/2 w-34 h-[168px]"
                    />
                </div>
                <p className="text-white text-[16px] mb-4 pt-3 font-semibold">Do you see yourself more as a saver or an investor?</p>

                {/* Buttons */}
                <div className="flex space-x-2">
                    <Button variant="primary" size="lg" className="flex-1" onClick={handleSaverClick}>
                        Saver
                    </Button>
                    <Button variant="secondary" size="lg" className="flex-1" onClick={handleInvestorClick}>
                        Investor
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default InvestingStyleCard;
