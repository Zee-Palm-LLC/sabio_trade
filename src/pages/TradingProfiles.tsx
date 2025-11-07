import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import GraphUpIcon from '../assets/graph_up.svg';
import Logo from '../assets/logo.png';
import StudyIcon from '../assets/study.png';
import StudyOutlineIcon from '../assets/study_outline.png';
import { BackButton, BottomShade, Card, PrimaryButton } from "../components";
import { saveEmail } from '../services/emailService';
import { EmailStorageService } from '../services/emailStorageService';
import { QuizDataService } from '../services/quizDataService';

const TradingProfiles: React.FC = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [email, setEmail] = useState('');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [emailAlreadySubmitted, setEmailAlreadySubmitted] = useState(false);

    // Check if email was already submitted in InvestingStyleQuizPage
    useEffect(() => {
        const hasEmail = EmailStorageService.hasEmailBeenSubmitted();
        if (hasEmail) {
            setEmailAlreadySubmitted(true);
            const storedEmail = EmailStorageService.getSubmittedEmail();
            console.log('Email already submitted in InvestingStyleQuizPage, hiding email input. Email:', storedEmail);
        } else {
            console.log('Email not submitted yet, showing email input');
        }
    }, []);

    useEffect(() => {
        const duration = 3000; // 3 seconds to reach 100%
        const intervalTime = 30; // Update every 30ms
        const increment = (100 / duration) * intervalTime;

        const interval = setInterval(() => {
            setProgress(prev => {
                const next = prev + increment;
                if (next >= 100) {
                    clearInterval(interval);
                    setIsButtonEnabled(true);
                    return 100;
                }
                return next;
            });
        }, intervalTime);

        return () => clearInterval(interval);
    }, []);

    const handleContinueClick = async () => {
        // If email is provided, save it with all collected answers
        if (email.trim()) {
            setSaving(true);
            setError(null);

            try {
                const sessionId = QuizDataService.getSessionId();
                const attemptedQuestions = await QuizDataService.collectAnswersForEmail(sessionId);

                const result = await saveEmail(email.trim(), attemptedQuestions);

                if (!result.success) {
                    setError(result.error || 'Failed to save email');
                    setSaving(false);
                    return;
                }

                console.log('Email saved successfully from TradingProfiles');
            } catch (err: any) {
                console.error('Error saving email:', err);
                setError('Failed to save email. Please try again.');
                setSaving(false);
                return;
            }

            setSaving(false);
        }

        navigate('/your-trader-profile');
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    // Create progress circle component
    const ProgressCircle = ({ progress }: { progress: number }) => {
        const containerWidth = 74;
        const containerHeight = 74;
        const strokeWidth = 4;
        const radius = containerWidth / 2;
        const normalizedRadius = radius - strokeWidth / 2;
        const circumference = normalizedRadius * 2 * Math.PI;
        const strokeDashoffset = circumference - (progress / 100) * circumference;
        const centerX = containerWidth / 2;
        const centerY = containerHeight / 2;
        const gap = 3.87;

        return (
            <div
                className="relative flex-shrink-0"
                style={{
                    width: `${containerWidth}px`,
                    height: `${containerHeight}px`,
                    opacity: 1
                }}
            >
                <svg
                    height={containerHeight}
                    width={containerWidth}
                    className="transform -rotate-90"
                    style={{ position: 'absolute', top: 0, left: 0 }}
                >
                    {/* Background circle */}
                    <circle
                        stroke="rgba(255, 255, 255, 0.1)"
                        fill="transparent"
                        strokeWidth={strokeWidth}
                        r={normalizedRadius}
                        cx={centerX}
                        cy={centerY}
                    />
                    {/* Progress circle */}
                    <circle
                        stroke="url(#progressGradient)"
                        fill="transparent"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        r={normalizedRadius}
                        cx={centerX}
                        cy={centerY}
                    />
                    <defs>
                        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#0FB084" />
                            <stop offset="100%" stopColor="#2FA6B9" />
                        </linearGradient>
                    </defs>
                </svg>
                {/* Percentage text with arrow */}
                <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ gap: `${gap}px` }}
                >
                    <span
                        className="text-white font-bold"
                        style={{ fontSize: '12px' }}
                    >
                        {Math.round(progress)}%
                    </span>
                    <img
                        src={GraphUpIcon}
                        alt="Graph Up"
                        className="w-3 h-3"
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen text-white relative" style={{ background: 'var(--bg-gradient)' }}>
            <BottomShade />
            <div className="w-[375px] mx-auto min-h-screen flex flex-col px-4 relative z-10">
                <img
                    src={StudyOutlineIcon}
                    alt="Study Outline"
                    className="absolute pointer-events-none"
                    style={{
                        width: '74px',
                        height: '74px',
                        opacity: 0.32,
                        top: '51px',
                        right: '-12px',
                    }}
                />
                <img
                    src={StudyIcon}
                    alt="Study"
                    className="absolute pointer-events-none"
                    style={{
                        width: '140px',
                        height: '140px',
                        opacity: 0.5,
                        top: '409px',
                        left: '-12px',
                    }}
                />
                {/* Header */}
                <div className="flex items-center justify-between pt-8 pb-4 mb-4">
                    <BackButton onClick={handleBackClick} />
                    <div className="flex-1 flex justify-center">
                        <img src={Logo} alt="SabioTrade" width={230} height={80} />
                    </div>
                </div>

                <div className="flex-1 flex flex-col px-0">
                    <h1 className="text-white text-3xl font-bold mb-4 leading-tight text-left">
                        Calculating results
                    </h1>
                    <Card
                        className="rounded-lg p-0 mb-6"
                        style={{ padding: 10 }}
                    >
                        <div className="flex items-start gap-2">
                            <div className="flex-1">
                                <p
                                    style={{
                                        fontWeight: 400,
                                        fontSize: '12px',
                                        lineHeight: '140%',
                                        color: '#FFFFFFB2',
                                        letterSpacing: 0
                                    }}
                                >
                                    Right now, we're carefully reviewing your responses to find the perfect Sabio mentor - someone who matches your investing style and can guide you toward your financial goals!
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <ProgressCircle progress={progress} />
                            </div>
                        </div>
                    </Card>

                    {/* Email Input - Hidden if already submitted in InvestingStyleQuizPage */}
                    {!emailAlreadySubmitted && (
                        <div className="mb-8">
                            <label className="block text-white font-bold text-[15px] mb-2">
                                Enter E-mail (Recommended)
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setError(null);
                                    }}
                                    placeholder="Enter your email"
                                    className={`w-full pl-12 pr-4 py-3 rounded-lg placeholder-white/40 focus:outline-none transition-all ${error ? 'border-red-400' : 'border-transparent'
                                        }`}
                                    style={{
                                        background: '#031340',
                                        border: `1px solid ${error ? 'rgba(239, 68, 68, 0.5)' : 'rgba(255, 255, 255, 0.3)'}`,
                                        fontSize: '15px',
                                        color: 'rgba(255, 255, 255, 0.9)'
                                    }}
                                    autoComplete="email"
                                    disabled={saving}
                                />
                            </div>
                            {error && (
                                <p className="text-red-400 text-sm mt-2">{error}</p>
                            )}
                        </div>
                    )}

                </div>

                {/* Button */}
                <div className="pb-12 mt-auto">
                    <PrimaryButton
                        onClick={handleContinueClick}
                        text={saving ? 'Saving...' : 'Get the results!'}
                        showIcon={false}
                        disabled={!isButtonEnabled || saving}
                    />
                </div>
            </div>
        </div>
    );
};

export default TradingProfiles;