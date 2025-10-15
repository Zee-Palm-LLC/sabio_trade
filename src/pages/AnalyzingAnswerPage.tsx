import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Analyzing from '../assets/analyzing.png';
import ArrowRight from '../assets/arrow-right.svg';
import Logo from '../assets/logo.png';
import MuteIcon from '../assets/muted.svg';
import { BackButton, Card, ProgressIndicator } from '../components';

const AnalyzingAnswerPage: React.FC = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate progress animation
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 2;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleContinueClick = () => {
        navigate('/welcome');
    };

    return (
        <div className="min-h-screen text-white" style={{ background: 'var(--bg-gradient)' }}>
            <div className="w-[375px] mx-auto min-h-screen flex flex-col">
                <div className="flex flex-col items-center pt-8 pb-4 px-4">
                    <div className="flex items-center justify-between w-full mb-3">
                        <BackButton onClick={handleBackClick} />
                        <div className="flex items-center">
                            <img src={Logo} alt="SabioTrade" className="h-14" />
                        </div>
                        <div className="flex items-center space-x-1">
                            <span className="text-[#17F871] font-bold text-base leading-[18px]">
                                05 /
                            </span>
                            <span className="text-white/80 font-bold text-base leading-[18px]">
                                18
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center px-4 mb-6">
                    <div className="text-center mb-2">
                        <h1 className="text-white text-2xl font-bold mb-0 leading-tight">
                            Analyzing your answers...
                        </h1>
                        <p className="text-white/70 text-base leading-relaxed mb-6">
                            We're analyzing your answer for the most accurate result...
                        </p>
                        <ProgressIndicator
                            current={progress}
                            total={100}
                            className="mb-0"
                        />
                        <div className='flex justify-end mr-4'>
                            <span className="text-white/70 text-base leading-relaxed mb-6">
                                {progress === 100 ? 'Completed' : `${progress}% in progress...`}
                            </span>
                        </div>
                    </div>

                    <Card
                        className={`w-full max-w-sm bg-[#340863] rounded-[12px] border border-[#7D31D87A] shadow-[0_0_12px_0_rgba(125,49,216,0.47)]`}
                    >
                        <div className="bg-[#031340] rounded-[12px] border border-[#7D31D87A] shadow-[0_0_12px_0_rgba(125,49,216,0.47)] p-4">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-gray-400 rounded-full mx-auto mb-2 flex items-center justify-center">
                                    <span className="text-gray-600 text-2xl font-bold">CP</span>
                                </div>
                                <div className="flex justify-center space-x-1 mb-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg
                                            key={star}
                                            className="w-4 h-4 text-yellow-400"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                    ))}
                                </div>
                                <h3 className="text-white text-lg font-semibold mb-1">Colin Powell</h3>
                                <p className="text-white text-sm leading-relaxed italic">
                                    "There is no secret to success. It is the result of preparation, work, and learning from failure."
                                </p>
                            </div>
                        </div>
                        <div className="mt-6 flex flex-col items-center">
                            <div
                                className="relative w-full rounded-xl overflow-hidden bg-[#29245A] p-0"
                                style={{ maxWidth: 350 }}
                            >
                                <img
                                    src={Analyzing}
                                    alt="Testimonial"
                                    className="w-full h-auto object-cover"
                                    style={{ borderRadius: 16 }}
                                />
                                {/* Audio button */}
                                <button
                                    type="button"
                                    className="absolute top-3 left-3 flex items-center justify-center w-8 h-8 bg-[#23224C]/80 rounded-full shadow focus:outline-none"
                                    aria-label="Play testimonial audio"
                                >
                                    <img src={MuteIcon} alt="Mute" className="w-5 h-5" />
                                </button>
                                <div className="absolute left-0 bottom-0 w-full px-5 pb-2 pt-10 flex items-end bg-gradient-to-t from-[#23224C] via-[#23224C99] to-transparent rounded-xl">
                                    <span className="text-white text-lg font-semibold leading-tight !leading-snug">
                                        <span className="mr-1 text-[18px] align-bottom leading-tight"
                                            aria-hidden="true">“</span>
                                        I used to panic at losses, Sabio taught me resilience.
                                        <span className="ml-1 text-2xl align-bottom" aria-hidden="true">”</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                    </Card>

                </div>
                <div className="px-4 pb-6">
                    <button
                        onClick={handleContinueClick}
                        disabled={progress < 100}
                        className="w-full text-white font-semibold py-4 px-6 transition-all duration-200 flex items-center justify-center"
                        style={{
                            borderRadius: 108,
                            background: progress === 100 
                                ? 'linear-gradient(135deg, #0FB084 0%, #2FA6B9 100%)' 
                                : 'var(--color-button-disabled)',
                            paddingTop: 12,
                            paddingBottom: 12,
                            cursor: progress === 100 ? 'pointer' : 'not-allowed',
                            opacity: progress === 100 ? 1 : 0.6,
                        }}
                    >
                        <span className="mr-2" style={{ color: progress === 100 ? 'white' : 'var(--color-button-disabled-text)' }}>
                            Next
                        </span>
                        <img 
                            src={ArrowRight} 
                            alt="Arrow Right" 
                            className="w-5 h-3" 
                            style={{ opacity: progress === 100 ? 1 : 0.5 }}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AnalyzingAnswerPage;
