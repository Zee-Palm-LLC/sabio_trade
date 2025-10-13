import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowRight from '../assets/arrow-right.svg';
import BulletPointIcon from '../assets/bullet_point.svg';
import Logo from '../assets/logo.png';
import StandingAvatar from '../assets/standing_avatar.png';

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
            <div className="w-[375px] mx-auto min-h-screen flex flex-col">
                {/* Header Section */}
                <div className="flex flex-col items-center pt-8 pb-4">
                    <div className="flex items-center justify-between w-full px-4 mb-3">
                        <div></div> {/* Empty space for balance */}
                        <div className="flex items-center">
                            <img src={Logo} alt="SabioTrade" className="h-14" />
                        </div>
                        <button
                            onClick={handleCloseClick}
                            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                        >
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex space-x-3 w-full px-4">
                        {/* Empty badges section to maintain layout structure */}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex items-center justify-center px-4 mb-1">
                    <div className="w-full max-w-sm bg-[#340863] rounded-[12px] border border-[#7D31D87A] shadow-[0_0_12px_0_rgba(125,49,216,0.47)] p-6">
                        {/* Title */}
                        <h1 className="text-white text-2xl font-bold text-center mb-4 leading-tight">
                            We got you every step of the way.
                        </h1>

                        {/* Description */}
                        <p className="text-white/70 text-base leading-relaxed mb-8 text-center">
                            We will provide you with the education to react comfortably to any situation. Our challenge is backed by research and crafted to suit your level while encouraging you to use our tools to succeed.
                        </p>

                        {/* Features List */}
                        <div className="space-y-4 mb-8">
                            <div className="flex items-start space-x-3">
                                <img src={BulletPointIcon} alt="Bullet" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-white text-[15px] font-normal leading-relaxed">
                                        <span className="font-semibold">Education:</span> Step-by-step guidance.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <img src={BulletPointIcon} alt="Bullet" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-white text-[15px] font-normal leading-relaxed">
                                        <span className="font-semibold">Tools:</span> Smart & easy to use.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <img src={BulletPointIcon} alt="Bullet" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-white text-[15px] font-normal leading-relaxed">
                                        <span className="font-semibold">Challenges:</span> Crafted for your level.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 3D Character */}
                        <div className="flex justify-end mb-6">
                            <img
                                src={StandingAvatar}
                                alt="3D Character"
                                className="w-24 h-24 object-contain"
                            />
                        </div>

                        {/* Trustpilot Rating */}
                        <div className="text-center">
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
                    </div>
                </div>

                {/* Continue Button */}
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

export default WelcomePage;
