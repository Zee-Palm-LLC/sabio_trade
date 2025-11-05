import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { BottomShade, PrimaryButton } from '../components';
import { saveEmail } from '../services/emailService';
import { QuizDataService } from '../services/quizDataService';
import { EmailStorageService } from '../services/emailStorageService';

const InvestingStyleQuizPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleContinueClick = async () => {
        // If email is provided, save it with answers
        if (email.trim()) {
            setLoading(true);
            setError(null);
            
            try {
                const sessionId = QuizDataService.getSessionId();
                const attemptedQuestions = await QuizDataService.collectAnswersForEmail(sessionId);
                
                const result = await saveEmail(email.trim(), attemptedQuestions);
                
                if (!result.success) {
                    setError(result.error || 'Failed to save email');
                    setLoading(false);
                    return;
                }
                
                // Store email in helper service to indicate it was already submitted
                EmailStorageService.setSubmittedEmail(email.trim());
                
                console.log('Email saved successfully from InvestingStyleQuizPage');
            } catch (err: any) {
                console.error('Error saving email:', err);
                setError('Failed to save email. Please try again.');
                setLoading(false);
                return;
            }
            
            setLoading(false);
        }
        
        // Navigate to the next page (quiz page)
        navigate('/trust');
    };

    return (
        <div className="min-h-screen text-white relative" style={{ background: 'var(--bg-gradient)' }}>
            <BottomShade />
            <div className="w-[375px] mx-auto min-h-screen flex flex-col px-4 relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center pt-8 pb-4">
                    <div className="flex items-center justify-center w-full mb-3">
                        <img src={Logo} alt="SabioTrade" width={230} height={80} />
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col px-0 mt-4">
                    {/* Title */}
                    <h1 className="text-white text-3xl font-bold mb-6 leading-tight">
                        Welcome to the Sabio Quiz!
                    </h1>

                    {/* Body Text */}
                    <div className="space-y-4 mb-8">
                        <p className="text-white/70 text-[15px] leading-relaxed">
                            We're excited to help you discover your unique investing styles!
                        </p>
                        <p className="text-white/70 text-[15px] leading-relaxed">
                            Once you finish this short quiz, <span className="font-bold text-white">we'll connect you</span> <span className="font-bold text-white">with the best Sabio mentor to guide you on your investing journey.</span>
                        </p>
                        <p className="text-white/70 text-[15px] leading-relaxed">
                            Please enter your email address below, we'll use it to match you with your mentor and contact you in case there's any technical issue.
                        </p>
                    </div>

                    {/* Email Input */}
                    <div className="mb-auto">
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
                                disabled={loading}
                            />
                        </div>
                        {error && (
                            <p className="text-red-400 text-sm mt-2">{error}</p>
                        )}
                    </div>
                </div>

                {/* Button */}
                <div className="pb-12 mt-auto pt-10">
                    <PrimaryButton
                        onClick={handleContinueClick}
                        text={loading ? 'Processing...' : 'Sounds good, I am in!'}
                        showIcon={false}
                        disabled={loading}
                    />
                </div>
            </div>
        </div>
    );
};

export default InvestingStyleQuizPage;
