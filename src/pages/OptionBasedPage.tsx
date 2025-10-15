import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowRight from '../assets/arrow-right.svg';
import Logo from '../assets/logo.png';
import { BuyMoreOptionCard, HoldAndWaitCard, OptimizedBasedCard, SellEverythingCard } from '../components';

const OptionBasedPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { optionIndices = [] } = (location.state as any) || {};
    console.log('OptionBasedPage - optionIndices:', optionIndices);
    const handleContinueClick = () => {
        navigate('/advance-question', { state: { startAtLastAdvanced: true } });
    };
    const renderCard = () => {
        const firstAnswer = optionIndices[0];
        console.log('First answer index:', firstAnswer);

        switch (firstAnswer) {
            case 1:
                return <SellEverythingCard />;
            case 2:
                return <HoldAndWaitCard />;
            case 3:
                return <BuyMoreOptionCard />;
            case 4:
                return <OptimizedBasedCard />;
            default:
                return <SellEverythingCard />;
        }
    };

    return (
        <div className="min-h-screen text-white" style={{ background: 'var(--bg-gradient)' }}>
            <div className="w-[375px] mx-auto min-h-screen flex flex-col px-4">
                <div className="flex flex-col items-center justify-between pt-8 pb-0">
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

                <div className="pt-10 pb-6">
                    <button
                        onClick={handleContinueClick}
                        className="w-full text-white font-semibold py-4 px-6 transition-colors duration-200 flex items-center justify-center"
                        style={{
                            borderRadius: 108,
                            background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary-light) 100%)',
                            paddingTop: 12,
                            paddingBottom: 12,
                        }}
                    >
                        <span className="mr-2">Next Step</span>
                        <img src={ArrowRight} alt="Arrow Right" className="w-5 h-3" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OptionBasedPage;
