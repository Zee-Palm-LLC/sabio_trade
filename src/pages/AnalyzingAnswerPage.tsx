import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Analyzing from '../assets/analyzing.png';
import ColinImage from '../assets/colin.png';
import Logo from '../assets/logo.png';
import StarIcon from '../assets/yellow_star.svg';
import { BackButton, Card, PrimaryButton, ProgressIndicator } from '../components';

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
                    <div className="relative w-full mb-3 flex items-center" style={{ minHeight: 56 }}>
                        <div className="absolute left-0">
                            <BackButton onClick={handleBackClick} />
                        </div>
                        <div className="flex-1 flex justify-center">
                            <img src={Logo} alt="SabioTrade" className="h-14" />
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
                        className={`w-full max-w-sm`}
                    >
                        <div className="bg-[#031340] rounded-[12px] p-4">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-gray-400 rounded-full mx-auto mb-2 flex items-center justify-center">
                                    <img src={ColinImage} alt="Colin Powell" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex justify-center space-x-1 mb-2">
                                    {[1, 2, 3, 4, 5].map((_, idx) => (
                                        <img key={idx} src={StarIcon} alt="Star" className="w-4 h-4" />
                                    ))}
                                </div>
                                <h3
                                    style={{
                                        fontWeight: 600,
                                        fontStyle: 'italic',
                                        fontSize: 15,
                                        lineHeight: '30px',
                                        letterSpacing: 0,
                                        textAlign: 'center',
                                        verticalAlign: 'middle'
                                    }}
                                    className="text-white mb-1"
                                >
                                    Colin Powell
                                </h3>
                                <p
                                    style={{
                                        fontWeight: 400,
                                        fontStyle: 'normal',
                                        fontSize: 13,
                                        lineHeight: '130%',
                                        letterSpacing: 0,
                                        textAlign: 'center'
                                    }}
                                    className="text-white/80 px-2"
                                >
                                    "There is no secret to success. It is the result of preparation, work, and learning from failure."
                                </p>
                            </div>
                        </div>
                        <div className="mt-6 flex flex-col items-center">
                            <div
                                className="relative w-full rounded-xl overflow-hidden bg-[#29245A] p-0"
                                style={{ maxWidth: 350, height: 180 }}
                            >
                                <img
                                    src={Analyzing}
                                    alt="Testimonial"
                                    className="w-full h-auto object-cover"
                                    style={{ borderRadius: 16 }}
                                />
                                <div className="absolute left-0 bottom-0 w-full px-5 pb-2 pt-4 flex items-end bg-gradient-to-t from-[#23224C] via-[#23224C99] to-transparent rounded-xl">
                                    <span
                                        className="text-white font-bold text-[16px] text-center leading-snug block text-left"
                                        style={{ textShadow: '0 2px 8px rgba(18,19,52,0.38)' }}
                                    >
                                        <span className="mr-1 align-bottom" aria-hidden="true">“</span>
                                        I used to panic at losses, Sabio
                                        taught me resilience.
                                        <span className="ml-1 align-bottom" aria-hidden="true">”</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                    </Card>

                </div>
                <div className="px-4 pb-6">
                    <PrimaryButton
                        text="Next"
                        onClick={handleContinueClick}
                        disabled={progress < 100}
                    />
                </div>
            </div>
        </div >
    );
};
export default AnalyzingAnswerPage;
