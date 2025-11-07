import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HiAvatar from '../assets/hi_avatar.png';
import Logo from '../assets/logo.png';
import { BottomShade, Card, PrimaryButton } from '../components';
import { saveEmail } from '../services/emailService';
import { EmailStorageService } from '../services/emailStorageService';
import { QuizDataService } from '../services/quizDataService';

const InvestingStyleQuizPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // const handleCloseClick = () => {
    //     navigate(-1);
    // };

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

        navigate('/trust');
    };

    return (
        <div className="min-h-screen text-white relative" style={{ background: 'var(--bg-gradient)' }}>
            <BottomShade />
            <div className="w-[375px] mx-auto min-h-screen flex flex-col px-4 relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between pt-8 pb-4">
                    <div className="flex items-center">
                        <img src={Logo} alt="SabioTrade" width={230} height={80} />
                    </div>
                    {/* <button
                        onClick={handleCloseClick}
                        className="flex items-center justify-center"
                        style={{
                            width: 35,
                            height: 35,
                            borderRadius: 6,
                            backgroundColor: '#031340',
                            border: '1.1px solid rgba(255,255,255,0.12)',
                            transition: 'background-color 0.2s',
                        }}
                        aria-label="Close"
                    >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button> */}
                </div>

                <div className="flex-1 flex flex-col px-0 mt-4 relative">
                    {/* Welcome Section */}
                    <div className="flex items-start gap-4 mb-6">
                        <div className="flex-1">
                            <h1
                                className="text-white mb-2"
                                style={{
                                    fontWeight: 700,
                                    fontStyle: 'bold',
                                    fontSize: '30px',
                                    lineHeight: '140%',
                                }}
                            >
                                Welcome to the Sabio Quiz!
                            </h1>
                            <p className="text-white/70 text-[15px] leading-relaxed">
                                We're excited to help you discover your unique investing styles!
                            </p>
                        </div>
                        <div className="flex-shrink-0" style={{ width: '100px' }}></div>
                    </div>
                    <div
                        className="relative"
                        style={{
                            alignSelf: 'flex-end',
                            marginTop: '-147px',
                            marginBottom: '-10px',
                            zIndex: 1
                        }}
                    >
                        <img
                            src={HiAvatar}
                            alt="Avatar"
                            style={{
                                width: '120px',
                                height: '147px',
                                objectFit: 'contain'
                            }}
                        />
                    </div>

                    {/* Information Box */}
                    <Card
                        className="rounded-lg p-4 mb-6 relative"
                        style={{
                            zIndex: 2,
                            background: '#1A0A4D',
                        }}
                    >
                        <p
                            className="text-white/70 mb-3"
                            style={{
                                fontWeight: 400,
                                fontStyle: 'normal',
                                fontSize: '13px',
                                marginBottom: '0.75rem'
                            }}
                        >
                            Once you finish this short quiz, we'll connect you with the best Sabio mentor to guide you on your investing journey.
                        </p>
                        <p
                            className="text-white/70"
                            style={{
                                fontWeight: 400,
                                fontSize: '13px',
                            }}
                        >
                            Please enter your email address below, we'll use it to match you with your mentor and contact you in case there's any technical issue.
                        </p>
                    </Card>

                    {/* Email Input */}
                    <div className="mb-auto">
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
