import React, { useState } from 'react';
import amdIcon from '../assets/amd.svg';
import Logo from '../assets/logo.png';
import BulletPointIcon from '../assets/star_bullet.png';
import ArrowUpIcon from '../assets/up.svg';
import { BottomShade, Card, MediaLogosCard, PrimaryButton, SabioTradeFeatures, ScratchTicket } from '../components';

const ScratchPage: React.FC = () => {
    const [showReserveButton, setShowReserveButton] = useState(false);
    const [showFeatures, setShowFeatures] = useState(false);

    const handleScratchComplete = () => {
        console.log("🎉 Scratch card completed!");
        setShowReserveButton(true);
    };

    const handleReserveClick = () => {
        console.log("🎉 Reserve button clicked!");
        setShowFeatures(true);
    };

    const handleContinueClick = () => {
        console.log("🎉 Continue button clicked!");
        // Add your next step logic here
    };

    return (
        <div className="min-h-screen text-white relative" style={{ background: 'var(--bg-gradient)' }}>
            <BottomShade />
            <div className="w-[375px] mx-auto min-h-screen flex flex-col px-4">
                <div className="flex flex-col items-center pt-8 pb-4">
                    <div className="flex items-center space-x-3 mb-3">
                        <img src={Logo} alt="SabioTrade" className=" h-14" />
                    </div>
                </div>
                <Card
                    className={`w-full max-w-sm bg-[#340863] rounded-[12px] border border-[#7D31D87A] shadow-[0_0_12px_0_rgba(125,49,216,0.47)]`}
                >
                    <h2 className="text-white font-semibold text-lg leading-tight text-center">
                        Lock in your early access savings
                    </h2>
                    <div className="text-center mb-4">
                        <p className="text-green-400 text-sm font-medium mb-3">
                            Your offer expires in 2 days
                        </p>
                        <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                            <div className="bg-green-400 h-2 rounded-full" style={{ width: '68%' }}></div>
                        </div>
                    </div>
                    <div className="w-full max-w-sm bg-[#031340] rounded-[12px] border border-slate-600/30 px-4 pt-4 pb-4">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                                <div
                                    className="w-8 h-8 flex items-center justify-center rounded-[5px] relative overflow-hidden"
                                    style={{
                                        background: 'linear-gradient(to bottom, #232e63 0%, #121840 100%)',
                                        boxShadow:
                                            'inset 0 2px 2px rgba(255,255,255,0.25), inset 0 -2px 4px rgba(0,0,0,0.3), inset 0 -4px 12px rgba(23, 248, 113, 0.10)',
                                        backdropFilter: 'blur(4px)',
                                        WebkitBackdropFilter: 'blur(4px)',
                                    }}
                                >

                                    <img src={amdIcon} alt="AMD" className="w-4 h-4 relative z-10" />
                                </div>




                                <span className="text-[18px] font-bold" style={{ color: 'var(--color-primary)' }}>+2.5%</span>
                                <img src={ArrowUpIcon} alt="Arrow Up" className="w-4 h-4" />
                            </div>
                            <span className="text-white/70 text-sm">2 days ago</span>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                                <img
                                    src={BulletPointIcon}
                                    alt="Bullet"
                                    className="w-3 h-3 mt-0.5 flex-shrink-0"
                                />   <p
                                    className="text-white/50"
                                    style={{
                                        fontWeight: 500,
                                        fontStyle: 'normal',
                                        fontSize: '12px',
                                        lineHeight: '140%',
                                        letterSpacing: '0%',
                                    }}
                                >
                                    Partnership announcements with major tech players sparked investor confidence.
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <img
                                    src={BulletPointIcon}
                                    alt="Bullet"
                                    className="w-3 h-3 mt-0.5 flex-shrink-0"
                                />
                                <p
                                    className="text-white/50"
                                    style={{
                                        fontWeight: 500,
                                        fontStyle: 'normal',
                                        fontSize: '12px',
                                        lineHeight: '140%',
                                        letterSpacing: '0%',
                                    }}
                                >
                                    Rise as analysts upgraded the stock strong quarterly results.
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>
                <span className="text-white text-[17px] font-bold block text-center mt-6">
                    In two weeks, you’ll spot these moves yourself
                </span>
                <ScratchTicket onScratchComplete={handleScratchComplete} />

                {/* Condition 2: Reserve Button with Pricing (after scratching) */}
                {showReserveButton && !showFeatures && (
                    <div className="w-full mt-0 mb-11">
                        <div className="text-center mb-6">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <span className="text-white/60 text-xl line-through">$229</span>
                                <span className="text-[#17F871] text-4xl font-bold">$89</span>
                            </div>
                            <p className="text-white/70 text-sm">
                                Price for next 2 days
                            </p>
                        </div>

                        <PrimaryButton
                            onClick={handleReserveClick}
                            text="Reserve my spot"
                            showIcon={false}
                            className='mb-4'
                        />
                    </div>
                )}

                {/* Condition 3: All Content After Reserve Button Click */}
                {showFeatures && (
                    <div className="mt-6 space-y-4 mb-11">
                        <SabioTradeFeatures />
                        <MediaLogosCard />

                        {/* Continue Button */}
                        <div className="w-full mt-4 mb-4">
                            <PrimaryButton
                                onClick={handleContinueClick}
                                text="Continue"
                                showIcon={true}
                            />
                        </div>

                        {/* Privacy and Terms Links */}
                        <div className="flex justify-center items-center space-x-2">
                            <span className="text-white">•</span>
                            <a href="https://sabiotrade.com/terms" className="underline text-white hover:text-white transition-colors">Terms & Conditions</a>
                            <span className="text-white">•</span>
                            <a href="https://sabiotrade.com/privacy" className="underline text-white hover:text-white transition-colors">Privacy Policy</a>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ScratchPage;