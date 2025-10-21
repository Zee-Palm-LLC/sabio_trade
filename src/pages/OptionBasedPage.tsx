import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { AIStockCard, BottomShade, NotSureCard, PrimaryButton, RightTimeToSell, RiskAndRewardsCard } from '../components';

const OptionBasedPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedOption } = (location.state as any) || { selectedOption: 1 };

    console.log('OptionBasedPage - Full location.state:', location.state);
    console.log('OptionBasedPage - selectedOption:', selectedOption);
    console.log('OptionBasedPage - type of selectedOption:', typeof selectedOption);

    const handleContinueClick = () => {
        navigate('/advance-question', { state: { startAtLastAdvanced: true } });
    };

    const renderCard = () => {
        console.log('renderCard - Selected option number:', selectedOption);

        switch (selectedOption) {
            case 1:
                console.log('-> Rendering RightTimeToSell (Option 1)');
                return <RightTimeToSell />;
            case 2:
                console.log('-> Rendering AIStockCard (Option 2)');
                return <AIStockCard />;
            case 3:
                console.log('-> Rendering RiskAndRewardsCard (Option 3)');
                return <RiskAndRewardsCard />;
            case 4:
                console.log('-> Rendering NotSureCard (Option 4)');
                return <NotSureCard />;
            default:
                console.log('-> Rendering default RightTimeToSell');
                return <RightTimeToSell />;
        }
    };

    return (
        <div className="min-h-screen text-white relative" style={{ background: 'var(--bg-gradient)' }}>
            <BottomShade />
            <div className="w-[375px] mx-auto min-h-screen flex flex-col px-4 relative z-10">         <div className="flex flex-col items-center justify-between pt-8 pb-0">
                <div className="flex items-center justify-between w-full mb-3">
                    <div className="flex items-center">
                        <img src={Logo} alt="SabioTrade" className="h-14" />
                    </div>
                    <button
                        onClick={() => navigate(-1)}
                        className={`flex items-center justify-center`}
                        style={{
                            width: 35,
                            height: 35,
                            borderRadius: 6,
                            backgroundColor: '#031340',
                            border: '1.1px solid rgba(255,255,255,0.12)',
                            transition: 'background-color 0.2s',
                        }}>
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

                {/* Render card based on first answer (question id 5) */}
                {renderCard()}

                <div className="pt-10 pb-6 mb-20">
                    <PrimaryButton
                        onClick={handleContinueClick}
                        className=''
                        text="Continue"
                        showIcon={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default OptionBasedPage;
