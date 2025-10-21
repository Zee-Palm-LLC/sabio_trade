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
            <div className="w-[375px] mx-auto min-h-screen flex flex-col relative z-10">        <div className="relative w-full mb-3 pt-8 px-4 flex items-center justify-center" style={{ minHeight: 56 }}>
                <div className="flex items-center justify-center w-full">
                    <div className="flex items-center justify-center">
                        <BackButton onClick={handleBackClick} />
                    </div>
                    <div className="flex items-center justify-center mx-auto w-full">
                        <img src={Logo} alt="SabioTrade" className="h-14 mx-auto" />
                    </div>
                </div>
            </div>
                <div className="flex items-center justify-center px-4 mb-5">
                    <TrustMainContentCard />
                </div>

                <div className="flex items-center justify-center px-4 mb-4">
                    <BulletPointsList items={bulletPoints} />
                </div>
                <div className="px-4 pb-6 mb-20">
                    <PrimaryButton text="Continue" onClick={handleContinueClick} />
                </div>
            </div>
        </div>
    );
};

export default TrustPage;
