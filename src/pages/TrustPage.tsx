import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowRight from '../assets/arrow-right.svg';
import Logo from '../assets/logo.png';
import { BackButton, BulletPointsList, TrustMainContentCard } from '../components';



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
            highlightedText: 'Investing.com, DailyForex, TradingNews.'
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
        <div className="min-h-screen text-white" style={{ background: 'var(--bg-gradient)' }}>
            <div className="w-[375px] mx-auto min-h-screen flex flex-col">
                <div className="relative w-full mb-3 pt-8 px-4 flex items-center justify-center" style={{ minHeight: 56 }}>
                    <div className="flex items-center justify-center w-full">
                        <div className="flex items-center justify-center">
                            <BackButton onClick={handleBackClick} />
                        </div>
                        <div className="flex items-center justify-center mx-auto w-full">
                            <img src={Logo} alt="SabioTrade" className="h-14 mx-auto" />
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-center px-4 mb-5">
                    <TrustMainContentCard />
                </div>

                <div className="flex-1 flex items-center justify-center px-4 mb-4">
                    <BulletPointsList items={bulletPoints} />
                </div>
                <div className="px-4 pb-6">
                    <button
                        onClick={handleContinueClick}
                        className="w-full text-white font-semibold py-4 px-6 transition-colors duration-200 flex items-center justify-center"
                        style={{
                            borderRadius: 108,
                            background: 'linear-gradient(135deg, #0FB084 0%, #2FA6B9 100%)',
                            paddingTop: 12,
                            paddingBottom: 12,
                        }}
                    >
                        <span className="mr-2">Continue</span>
                        <img src={ArrowRight} alt="Arrow Right" className="w-5 h-3" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TrustPage;
