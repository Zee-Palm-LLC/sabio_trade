import React from 'react';
import { useNavigate } from 'react-router-dom';
import chartIcon from '../../assets/chart.png';
import avatar from '../../assets/sitting_avatar.png';
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
            className={`w-full max-w-sm min-h-[500px] bg-[#340863] rounded-[12px] border border-[#7D31D87A] shadow-[0_0_12px_0_rgba(125,49,216,0.47)] ${className}`}
        >
            <div className="text-center p-6">
                <h2 className="text-[30px] font-semibold text-white mb-2 leading-tight">What's your Investing Style?</h2>
                <p className="text-[16px] text-gray-300 text-sm mb-0 font-regular leading-[1]">(2 Min Quiz + Free Plan)</p>
                <div className="relative w-full h-36 mb-6 flex items-center justify-center">
                    <img src={chartIcon} alt="Chart" className="w-full h-24 object-cover" />
                    <img
                        src={avatar}
                        alt="Avatar"
                        className="absolute bottom-[-25px] left-1/2 transform -translate-x-1/2 w-30 h-32"
                    />
                </div>
                <p className="text-white text-[16px] mb-6 font-semibold">Do you see yourself more as a saver or an investor?</p>

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
