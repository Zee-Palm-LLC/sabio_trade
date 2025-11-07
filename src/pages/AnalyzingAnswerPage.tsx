import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ColinImage from '../assets/colin.png';
import Logo from '../assets/logo.png';
import StandingAvatar from '../assets/standing_avatar.png';
import StarIcon from '../assets/yellow_star.svg';
import { BottomShade, Card, PrimaryButton, ProgressIndicator } from '../components';
import { DNAIconsService } from '../services/dnaIconsService';

const AnalyzingAnswerPage: React.FC = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);

    const storedDNAIcons = DNAIconsService.getDNAIcons();
    console.log('AnalyzingAnswerPage - stored DNA icons:', storedDNAIcons);

    const getTraderDNAInfo = () => {
        if (storedDNAIcons.length === 0) {
            return { title: "Analyzing...", quote: "Your trading potential is being analyzed..." };
        }
        const primaryIcon = storedDNAIcons.find(icon => icon.questionId === 3);

        if (!primaryIcon) {
            return { title: "Analyzing...", quote: "Your trading potential is being analyzed..." };
        }

        // Get archetype name (remove "The " prefix if present)
        const archetypeName = primaryIcon.archetype.replace(/^The\s+/i, '').trim();

        // Map archetype to specific quotes from screenshot
        const archetypeQuotes: Record<string, string> = {
            'Strategist': "You're building foundations, not chasing hype.",
            'Risk-Taker': "Quick thinking — you spot moves before others.",
            'Visionary': "Curious minds master the markets.",
            'Confident': "Ownership mindset — you lead your own path.",
            'Explorer': "Freedom fuels your focus — trade on your terms."
        };

        const quote = archetypeQuotes[archetypeName] || primaryIcon.quote || "Your trading potential is being analyzed...";

        return {
            title: primaryIcon.archetype || "Analyzing...",
            quote: quote
        };
    };

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



    const handleContinueClick = () => {
        navigate('/advance-question');
    };

    return (
        <div className="min-h-screen text-white relative" style={{ background: 'var(--bg-gradient)' }}>
            <BottomShade />
            <div className="w-[375px] mx-auto min-h-screen flex flex-col">
                <div className="flex flex-col items-center pt-8 pb-4 px-4">
                    <div className="flex items-center justify-between w-full mb-3">
                        <div className="flex items-center">
                            <img src={Logo} alt="SabioTrade" width={230} height={80} />
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

                <div className="flex flex-col items-center justify-center px-4 mb-4">
                    <div className="text-center mb-2 w-full">
                        <h1 className="text-white text-1xl font-bold mb-0 leading-tight mb-3">
                            Analyzing your initial potential
                        </h1>
                        <ProgressIndicator
                            current={progress}
                            total={100}
                            className="mb-0"
                            activeColor='#25BBA4'
                            inactiveColor='#2C3B39'
                        />
                        <div className='flex justify-end items-center gap-2 mr-4 mt-1'>
                            <span className="text-white/70 text-base leading-relaxed">
                                {progress === 100 ? 'Initial Compatibility' : `${progress}% in progress...`}
                            </span>
                            {progress === 100 && (
                                <svg
                                    className="w-4 h-4 text-[#25BBA4]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            )}
                        </div>
                        {storedDNAIcons.length > 0 && (
                            <div className="flex justify-center mt-2">
                                <div
                                    className="flex items-center justify-center"
                                    style={{
                                        width: '48px',
                                        height: '48px',
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
                                        {storedDNAIcons[0].icon}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    <Card
                        className={`w-full max-w-sm mt-2`}
                    >
                        <div className="bg-[#031340] rounded-[12px] p-4">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-gray-400 rounded-full mx-auto mb-2 flex items-center justify-center">
                                    <img src={ColinImage} alt="Real Trader" className="w-full h-full object-cover" />
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
                        <div className="mt-4 flex flex-col items-center">
                            <img
                                src={StandingAvatar}
                                alt="Testimonial"
                                className="h-48 object-contain"
                            />
                            <div className="mt-4 px-4">
                                {storedDNAIcons.length > 0 && (
                                    <div className="flex items-center justify-center gap-1 mb-3">
                                        <span
                                            className="text-[16px] leading-none"
                                            style={{
                                                filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.5))',
                                                display: 'inline-block',
                                            }}
                                        >
                                            {storedDNAIcons[0].icon}
                                        </span>

                                        <h3
                                            style={{
                                                fontWeight: 600,
                                                fontSize: 16,
                                                lineHeight: '120%',
                                                letterSpacing: 0,
                                            }}
                                            className="text-white"
                                        >
                                            {getTraderDNAInfo().title}
                                        </h3>
                                    </div>
                                )}
                                <p
                                    style={{
                                        fontWeight: 400,
                                        fontStyle: 'normal',
                                        fontSize: 14,
                                        lineHeight: '140%',
                                        letterSpacing: 0,
                                        textAlign: 'center'
                                    }}
                                    className="text-white/90"
                                >
                                    {getTraderDNAInfo().quote}
                                </p>
                            </div>
                        </div>
                    </Card>

                </div>
                <div className="px-4 pb-6 mb-20">
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
