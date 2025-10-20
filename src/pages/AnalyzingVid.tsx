import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnalyzingImage from '../assets/analyzing.png';
import ArrowRight from '../assets/arrow-right.svg';
import Logo from '../assets/logo.png';
import StarBullets from '../assets/star_bullet.png';
import { BottomShade, Card } from '../components';

const AnalyzingVid: React.FC = () => {
    const navigate = useNavigate();

    const handleContinueClick = () => {
        navigate('/sabio-intro', { state: { questionList: 'advanced' } });
    };

    const handleCloseClick = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen text-white relative" style={{ background: 'var(--bg-gradient)' }}>
            <BottomShade />
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
                    <div className="text-center px-0 mb-6">
                        <h1 className="text-white text-2xl font-bold mb-4 leading-tight">
                            Analyzing your answers...
                        </h1>
                    </div>

                    <div className="flex items-center justify-center mb-6">
                        <div className="flex items-center space-x-3 px-4 py-3 rounded-full" style={{ backgroundColor: 'var(--color-card-bg)', border: '1px solid var(--color-card-border)' }}>
                            <div className="w-6 h-6 flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                                </svg>
                            </div>
                            <span className="text-white text-lg font-semibold">Topic: Risk and Rewards</span>
                        </div>
                    </div>

                    <div className="flex justify-center space-x-3 mb-6">
                        <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500">
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">N</span>
                            </div>
                            <span className="text-green-400 font-semibold">Nvidia</span>
                        </div>
                        <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-500">
                            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">T</span>
                            </div>
                            <span className="text-red-400 font-semibold">Tesla</span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="space-y-3">
                            {[
                                'Training & tips',
                                'Personal learning plan',
                                'Our Whatsapp group',
                                'Free AI tools',
                                'Bonus resources',
                                'Psychological mastery'
                            ].map((item, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <img src={StarBullets} alt="Star bullet" className="w-2 h-2 flex-shrink-0" />
                                    <span className="text-white text-[15px]">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative w-full rounded-xl overflow-hidden bg-[#29245A] mb-6" style={{ height: '180px' }}>
                        <img
                            src={AnalyzingImage}
                            alt="Video Thumbnail"
                            className="w-full h-full object-cover"
                        />
                        <button className="absolute top-3 left-3 flex items-center justify-center w-8 h-8 bg-[#23224C]/80 rounded-full shadow">
                            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="12" fill="#fff" fillOpacity="0.25" />
                                <path d="M9 8l6 4-6 4V8z" fill="#fff" />
                            </svg>
                        </button>
                        <div className="absolute left-0 bottom-0 w-full px-5 pb-2 pt-10 flex items-end bg-gradient-to-t from-[#23224C] via-[#23224C99] to-transparent rounded-xl">
                            <span className="text-white text-lg leading-tight">
                                "I used to panic at losses, Sabio taught me resilience."
                            </span>
                        </div>
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                            <span className="text-white/50 text-xs">307 x 180</span>
                        </div>
                    </div>

                    <div className="w-full">
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
                            <span className="mr-2">Next Step</span>
                            <img src={ArrowRight} alt="Arrow Right" className="w-5 h-3" />
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AnalyzingVid;
