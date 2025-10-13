import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowRight from '../assets/arrow-right.svg';
import BulletPointIcon from '../assets/bullet_point.svg';
import Logo from '../assets/logo.png';
import SittingAvatar from '../assets/sitting_avatar.png';
import { Card } from '../components';

const WelcomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleContinueClick = () => {
        // Navigate to next step or back to quiz
        navigate('/question');
    };

    const handleCloseClick = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
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
                <Card className='bg-[#340863] rounded-[12px] border border-[#7D31D87A] shadow-[0_0_12px_0_rgba(125,49,216,0.47)]'>
                    <div className="text-center px-4 mb-6">
                        <h1 className="text-white text-2xl font-bold mb-4 leading-tight">
                            We got you every step of the way.
                        </h1>
                        <p className="text-white/70 text-base leading-relaxed">
                            We will provide you with the education to react comfortably to any situation. Our challenge is backed by research and crafted to suit your level while encouraging you to use our tools to succeed.
                        </p>
                    </div>
                    <div className="flex-1 flex items-center justify-center px-0 mb-6">
                        <div className="w-full max-w-sm bg-[#1A2036] rounded-[12px] border border-slate-600/30 px-2 pt-4 pb-2 relative flex items-start">
                            <div className="flex-1 space-y-2 mb-0">
                                <div className="flex items-start space-x-3">
                                    <img src={BulletPointIcon} alt="Bullet" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-white text-[15px] font-bold leading-relaxed">
                                            Education
                                        </p>
                                        <p className="text-white/70 text-[15px] font-normal leading-relaxed">
                                            Step-by-step guidance.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <img src={BulletPointIcon} alt="Bullet" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-white text-[15px] font-bold leading-relaxed">
                                            Tools
                                        </p>
                                        <p className="text-white/70 text-[15px] font-normal leading-relaxed">
                                            Smart & easy to use.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <img src={BulletPointIcon} alt="Bullet" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-white text-[15px] font-bold leading-relaxed">
                                            Challenges
                                        </p>
                                        <p className="text-white/70 text-[15px] font-normal leading-relaxed">
                                            Crafted for your level.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-shrink-0 absolute bottom-0 right-0 mb-0 mr-0">
                                <img
                                    src={SittingAvatar}
                                    alt="3D Character"
                                    className="w-20 h-20 object-contain"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="text-center px-4 mb-0">
                        <p className="text-white text-[14px] font-medium mb-2">Rated 4.3 on Trustpilot</p>
                        <div className="flex justify-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                    key={star}
                                    className={`w-4 h-4 ${star <= 4 ? 'text-yellow-400' : star === 5 ? 'text-yellow-200' : 'text-gray-400'}`}
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                            ))}
                        </div>
                    </div>
                </Card>
                <div className="pb-6 justify-center mt-5">
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

export default WelcomePage;
