import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { AIStockCard, BackButton, BottomShade, NotSureCard, PrimaryButton, RightTimeToSell, RiskAndRewardsCard } from '../components';
import { DNAIconsService } from '../services/dnaIconsService';

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

    const handleBackClick = () => {
        localStorage.removeItem('tradingTopicOption');
        localStorage.removeItem('selectedTopic');
        navigate('/advance-question', { state: { startIndex: 2, clearCurrentAnswer: true }, replace: true });
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
            <div className="w-[375px] mx-auto min-h-screen flex flex-col px-4 relative z-10">
                <div className="flex flex-col items-center justify-between pt-8 pb-2">
                    <div className="flex items-center justify-between w-full mb-3">
                        <BackButton onClick={handleBackClick} />
                        <div className="flex items-center">
                            <img src={Logo} alt="SabioTrade" width={230} height={80} />
                        </div>
                        <div style={{ width: 35 }}></div>
                    </div>
                    
                    {/* Glowing DNA Icons Display */}
                    {(() => {
                        const storedDNAIcons = DNAIconsService.getDNAIcons();
                        if (storedDNAIcons.length > 0) {
                            return (
                                <div className="flex justify-center items-center gap-2 w-full mb-2">
                                    {storedDNAIcons.map((iconData, index) => (
                                        <div
                                            key={`${iconData.questionId}-${index}`}
                                            className="flex items-center justify-center animate-icon-glow"
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                background: 'rgba(255, 255, 255, 0.25)',
                                                border: '2px solid rgba(255, 255, 255, 0.5)',
                                                borderRadius: '50%',
                                                backdropFilter: 'blur(8px)',
                                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                                            }}
                                        >
                                            <span 
                                                className="text-2xl leading-none"
                                                style={{
                                                    filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.5))',
                                                    display: 'inline-block',
                                                }}
                                            >
                                                {iconData.icon}
                                            </span>
                                        </div>
                                    ))}
                                    <style>{`
                                        @keyframes icon-glow {
                                            0%, 100% {
                                                filter: drop-shadow(0 0 8px rgba(23, 248, 113, 0.5)) drop-shadow(0 0 12px rgba(23, 248, 113, 0.3));
                                                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), 0 0 8px rgba(23, 248, 113, 0.3);
                                            }
                                            50% {
                                                filter: drop-shadow(0 0 12px rgba(23, 248, 113, 0.7)) drop-shadow(0 0 16px rgba(23, 248, 113, 0.5));
                                                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), 0 0 12px rgba(23, 248, 113, 0.5);
                                            }
                                        }
                                        .animate-icon-glow {
                                            animation: icon-glow 2s ease-in-out infinite;
                                        }
                                    `}</style>
                                </div>
                            );
                        }
                        return null;
                    })()}
                </div>

                {/* Render card based on first answer (question id 5) */}
                {renderCard()}

                <div className="pt-2 pb-6 mb-20">
                    {/* AI Technology Message - Only show for AIStockCard (selectedOption 2) */}
                    {selectedOption === 2 && (
                        <p className="text-[#17F871] text-[14px] font-semibold text-center mb-3">
                            We got you, covered with guidance on how to utilize the latest AI technology.
                        </p>
                    )}
                    
                    {/* Progress Message with Glowing Icon - For options 1, 3, and 4 */}
                    {selectedOption !== 2 && (() => {
                        const storedDNAIcons = DNAIconsService.getDNAIcons();
                        // For option 4 (NotSureCard), show if any icon exists
                        // For other options, show if question5Icon exists
                        const question5Icon = storedDNAIcons.find(icon => icon.questionId === 5);
                        const iconToShow = question5Icon || (selectedOption === 4 && storedDNAIcons[0] ? storedDNAIcons[0] : null);
                        
                        return iconToShow ? (
                            <>
                                <div className="flex items-center justify-start gap-2 mb-3 pl-5">
                                    <div
                                        className="flex items-center justify-center animate-glow"
                                        style={{
                                            width: '32px',
                                            height: '32px',
                                        }}
                                    >
                                        <span 
                                            className="text-2xl leading-none"
                                            style={{
                                                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))',
                                                display: 'inline-block',
                                            }}
                                        >
                                            {iconToShow.icon}
                                        </span>
                                    </div>
                                    <p className="text-[#17F871] text-[14px] font-semibold">
                                        Great progress! Your instinct's already showing potential.
                                    </p>
                                </div>
                                <style>{`
                                    @keyframes glow {
                                        0%, 100% {
                                            filter: drop-shadow(0 0 8px rgba(23, 248, 113, 0.6)) drop-shadow(0 0 12px rgba(23, 248, 113, 0.4));
                                        }
                                        50% {
                                            filter: drop-shadow(0 0 12px rgba(23, 248, 113, 0.8)) drop-shadow(0 0 16px rgba(23, 248, 113, 0.6));
                                        }
                                    }
                                    .animate-glow {
                                        animation: glow 2s ease-in-out infinite;
                                    }
                                `}</style>
                            </>
                        ) : null;
                    })()}
                    
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
