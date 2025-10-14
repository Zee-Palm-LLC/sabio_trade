import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowRight from '../assets/arrow-right.svg';
import Logo from '../assets/logo.png';
import SabioIntroImage from '../assets/sabio-intro-fig.png';
import { Card } from '../components';

const SabioIntroPage: React.FC = () => {
    const navigate = useNavigate();

    const handleContinueClick = () => {
        navigate('/question', { state: { questionList: 'advanced' } });
    };

    const handleCloseClick = () => {
        navigate('/');
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
                            onClick={handleCloseClick}
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
                
                <Card className='bg-[#340863] rounded-[12px] border border-[#7D31D87A] shadow-[0_0_20px_0_rgba(125,49,216,0.5)]'>
                    <div
                        className="w-full rounded-[12px] px-2 pt-0 pb-0 mb-3 flex items-center gap-2"
                        style={{
                            backgroundColor: 'var(--color-card-bg)',
                            border: '1px solid var(--color-card-border)',
                        }}
                    >
                        <div className="w-[40%] flex-shrink-0">
                            <img
                            src={SabioIntroImage}
                            alt="Avatar"
                            className="w-full h-auto object-contain"
                            />
                        </div>

                        <div className="w-[60%] pt-2 pb-2">
                            <p className="text-green-400 text-[16px] font-semibold leading-tight">
                            You're 1 step away from the start of your trading experience
                            </p>
                        </div>
                    </div>


                    <div className="text-center px-0 mb-6">
                        <p className="text-white/70 text-[14px] leading-tight">
                            Here at Sabio, we do things differently. Forget classic trading where you’re just left to figure it out. We believe in preparation and training first.
                        </p>
                    </div>

                    <div className="w-full rounded-[12px] px-4 py-6 mb-6 relative overflow-hidden" style={{ backgroundColor: 'var(--color-card-bg)', border: '1px solid var(--color-card-border)' }}>
                        <div className="absolute inset-0">
                            <img src={SabioIntroImage} alt="Chart Background" className="w-full h-full object-cover opacity-20" />
                            <div className="absolute inset-0 bg-black/40"></div>
                        </div>
                        
                        <div className="relative z-10 text-center">
                            <h2 className="text-white text-xl font-bold mb-2 leading-tight">
                                You're 1 step away to, you're so close!
                            </h2>
                            <p className="text-white/80 text-[14px] font-medium">
                                Our job is to teach you how to trade with our money
                            </p>
                        </div>
                    </div>

                    <div className="text-center px-0 mb-6">
                        <p className="text-white/70 text-[14px] leading-tight">
                            Every day, we're crafting articles, market reviews, and practical trading guides, plus hands-on lessons to help you master everything from reading charts to profitable trading strategies.
                        </p>
                    </div>

                </Card>

                <div className="pb-6 justify-center mt-5">
                    <button
                        onClick={handleContinueClick}
                        className="w-full text-white font-semibold py-4 px-6 transition-colors duration-200 flex items-center justify-center mt-4"
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

export default SabioIntroPage;
