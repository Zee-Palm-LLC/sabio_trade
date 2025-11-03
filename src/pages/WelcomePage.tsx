import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChallengesIcon from '../assets/challenges.png';
import EducationIcon from '../assets/education.png';
import Logo from '../assets/logo.png';
import SittingAvatar from '../assets/sitting_avatar.png';
import ToolsIcon from '../assets/tools.png';
import { BottomShade, Card, PrimaryButton, TestimonialCard } from '../components';

const WelcomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleContinueClick = () => {
        navigate('/quiz-extra');
    };

    const handleCloseClick = () => {
        navigate(-2);
    };

    return (
        <div className="min-h-screen text-white relative" style={{ background: 'var(--bg-gradient)' }}>
            <BottomShade />
            <div className="w-[375px] mx-auto min-h-screen flex flex-col px-4 relative z-10">        <div className="flex flex-col items-center justify-between pt-8 pb-0">
                <div className="flex items-center justify-between w-full mb-3">
                    <div className="flex items-center">
                        <img src={Logo} alt="SabioTrade" width={230} height={80} />
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
                    <div className="text-center px-0 mb-6">
                        <h1 className="text-white text-2xl font-bold mb-4 leading-tight">
                            We got you every step of the way.
                        </h1>
                        <p className="text-white/70 text-[14px] leading-snug">
                            We will provide you with the education to react comfortably to any situation. Our challenge is backed by research and crafted to suit your level while encouraging you to use our tools to succeed.
                        </p>
                    </div>
                    <div className="flex-1 flex items-center justify-center px-0 mb-6">
                        <div
                            className="w-full max-w-sm rounded-[12px] px-4 pt-4 pb-2 relative flex items-start bg-[#031340]"
                            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                        >
                            <div className="flex-1 space-y-2 mb-0">
                                <div className="flex items-center space-x-3">
                                    <img src={EducationIcon} alt="Bullet" className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-white text-[15px] font-bold leading-relaxed">
                                            Education
                                        </p>
                                        <p className="text-white/70 text-[15px] font-normal leading-relaxed">
                                            Step-by-step guidance.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <img src={ToolsIcon} alt="Bullet" className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-white text-[15px] font-bold leading-relaxed">
                                            Tools
                                        </p>
                                        <p className="text-white/70 text-[15px] font-normal leading-relaxed">
                                            Smart & easy to use.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <img src={ChallengesIcon} alt="Bullet" className="w-5 h-5 mt-0.5 flex-shrink-0" />
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
                                    className="w-22 h-24 object-contain"
                                />
                            </div>
                        </div>
                    </div>
                    <TestimonialCard />
                </Card>

                <div className="pb-6 mb-20 justify-center mt-5">
                    <PrimaryButton
                        onClick={handleContinueClick}
                        text="Continue"
                        showIcon={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
