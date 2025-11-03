import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { BackButton, BottomShade, BulletPointsList, PrimaryButton, TrustMainContentCard } from '../components';



const TrustPage: React.FC = () => {
    const navigate = useNavigate();
    const handleContinueClick = () => {
        navigate('/question', { state: { questionList: 'basic' } });
    };

    const bulletPoints = [
        {
            id: '1',
            text: '10,000+ traders joined Sabio challenges.'
        },
        {
            id: '2',
            text: 'Regulated in the EU (Ireland company no. 680139).'
        },
        {
            id: '3',
            prefixText: 'As seen on ',
            prefixOpacity: 0.6,
            highlightedText: 'Investing.com, Wall Street Journal, TradingNews.'
        },
        {
            id: '4',
            prefixText: 'Winner: ',
            prefixOpacity: 0.6,
            highlightedText: 'Best Prop Firm 2025.'
        },
        {
            id: '5',
            text: 'Instant payout system trusted worldwide.'
        }
    ];

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen text-white relative" style={{ background: 'var(--bg-gradient)' }}>
            <BottomShade />
            <div className="w-[375px] mx-auto min-h-screen flex flex-col relative z-10">
                <div className="flex flex-col items-center pt-4 pb-2">
                    <div className="relative w-full mb-2 px-4 flex items-center justify-center" style={{ minHeight: 56 }}>
                        <div className="absolute left-4">
                            <BackButton onClick={handleBackClick} />
                        </div>    <img src={Logo} alt="SabioTrade" width={230} height={80} />
                    </div>
                </div>

                <div className="flex items-center justify-center px-4 mb-3">
                    <TrustMainContentCard />
                </div>

                <div className="flex items-center justify-center px-4 mb-3">
                    <BulletPointsList items={bulletPoints} />
                </div>

                <div className="px-4 pb-4 mb-10">
                    <PrimaryButton text="Continue" onClick={handleContinueClick} />
                </div>
            </div>
        </div>
    );
};

export default TrustPage;
