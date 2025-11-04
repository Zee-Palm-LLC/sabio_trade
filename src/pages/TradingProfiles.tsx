import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { BackButton, BottomShade, PrimaryButton, ProgressCard } from "../components";
import { saveEmail } from '../services/emailService';
import { QuizDataService } from '../services/quizDataService';
import { EmailStorageService } from '../services/emailStorageService';

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

    return (
        <div className="min-h-screen text-white relative" style={{ background: 'var(--bg-gradient)' }}>
            <BottomShade />
            <div className="w-[375px] mx-auto min-h-screen flex flex-col px-4 relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center pt-8 pb-4">
                    <div className="relative w-full px-0 mb-3 flex items-center">
                        <div className="flex-shrink-0">
                            <BackButton onClick={handleBackClick} />
                        </div>
                        <div className="flex-1 flex justify-center">
                            <img src={Logo} alt="SabioTrade" width={230} height={80} />
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col px-0">
                    {/* Title */}
                    <h1 className="text-white text-4xl font-bold mb-6 leading-tight text-left">
                        Calculating results
                    </h1>

                    {/* Description Text */}
                    <div className="space-y-4 mb-6">
                        <p className="text-white/70 text-[15px] leading-relaxed">
                            Right now, we're carefully reviewing your responses to find the perfect Sabio mentor - someone who matches your investing style and can guide you toward your financial goals!
                        </p>
                        <p className="text-white/70 text-[15px] leading-relaxed">
                            Please enter your e-mail (if it wasn't added and we will send you the results).
                        </p>
                    </div>

                    {/* Email Input - Hidden if already submitted in InvestingStyleQuizPage */}
                    {!emailAlreadySubmitted && (
                        <div className="mb-8">
                            <label className="block text-white font-bold text-[15px] mb-2">
                                Enter E-mail (optional)
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
                                    className={`w-full pl-12 pr-4 py-3 rounded-lg placeholder-white/40 focus:outline-none transition-all ${
                                        error ? 'border-red-400' : 'border-transparent'
                                    }`}
                                    style={{
                                        background: 'transparent',
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

                    {/* Progress Circle */}
                    <div className="flex justify-center items-center mb-auto">
                        <ProgressCard 
                            progress={Math.round(progress)}
                            topText=""
                            bottomText=""
                        />
                    </div>
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