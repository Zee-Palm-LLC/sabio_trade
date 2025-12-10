import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShieldIcon from '../../assets/sheild_filled.svg';
import StandingAvatar from '../../assets/image-3.png';
import { DNAIconsService } from '../../services/dnaIconsService';
import { AnswerService } from '../../services/answerService';
import { saveEmail } from '../../services/emailService';

interface EmailCaptureCardProps {
    // No props needed - DNA icons are retrieved from service
}

const EmailCaptureCard: React.FC<EmailCaptureCardProps> = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [warning, setWarning] = useState<string | null>(null);
    const [forceUpdate, setForceUpdate] = useState(0); // Force re-render when DNA icons change
    const navigate = useNavigate();
    
    // Get stored DNA icons (with forceUpdate dependency)
    const storedDNAIcons = DNAIconsService.getDNAIcons();
    
    // Only get the 3 specific icons from the quiz pages (question IDs 3, 5, and 2)
    const quizQuestionIds = [3, 5, 2]; // QuestionPage, AdvanceQuestionPage, TradingQuizExtraPage
    const quizIcons = quizQuestionIds.map(questionId => {
        const iconData = storedDNAIcons.find(icon => icon.questionId === questionId);
        return iconData ? iconData.icon : null;
    }).filter(icon => icon !== null); // Remove null values
    
    const displayIcons = quizIcons;
    
    // Debug logging
    console.log('EmailCaptureCard - Stored DNA icons:', storedDNAIcons);
    console.log('EmailCaptureCard - Quiz question IDs:', quizQuestionIds);
    console.log('EmailCaptureCard - Quiz icons found:', quizIcons);
    console.log('EmailCaptureCard - Display icons:', displayIcons);
    console.log('EmailCaptureCard - Force update count:', forceUpdate);

    // Listen for DNA icon changes
    useEffect(() => {
        const unsubscribe = DNAIconsService.subscribeToChanges(() => {
            console.log('EmailCaptureCard - DNA icons changed, forcing update');
            setForceUpdate(prev => prev + 1);
        });

        return unsubscribe;
    }, []);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        setWarning(null);

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            setLoading(false);
            return;
        }

        try {
            // Collect all answers from AnswerService using question text as keys
            // This ensures we get ALL answers even if question IDs conflict between quiz files
            const allAnswersByQuestionText = AnswerService.getAllAnswersByQuestionText();
            const allAnswersById = AnswerService.getAllAnswers();
            
            // Collect all DNA icons from DNAIconsService
            const allDNAIcons = DNAIconsService.getDNAIcons();
            
            // Transform answers to the format expected by saveEmail
            // Format: Record<string, { answer: string; icon?: string }>
            // Key is question text (not question ID) to avoid conflicts
            const attemptedQuestions: Record<string, { answer: string; icon?: string }> = {};
            
            // Build attemptedQuestions using question text as keys
            // Use answersByQuestionText to get all unique questions (handles ID conflicts)
            Object.entries(allAnswersByQuestionText).forEach(([questionText, answerObj]) => {
                // Find the corresponding answer data to get questionId for icon lookup
                const answerData = Object.values(allAnswersById).find(data => data.questionText === questionText);
                
                // Find corresponding DNA icon for this question by questionId
                const dnaIcon = answerData 
                    ? allDNAIcons.find(icon => icon.questionId === answerData.questionId)
                    : null;
                
                // Use question text as the key (this avoids ID conflicts and makes questions the keys)
                attemptedQuestions[questionText] = {
                    answer: answerObj.answer,
                    ...(dnaIcon && { icon: dnaIcon.icon })
                };
            });
            
            console.log('Collected attemptedQuestions:', attemptedQuestions);
            console.log('All answers by question text:', allAnswersByQuestionText);
            console.log('All answers by ID:', allAnswersById);
            console.log('All DNA icons:', allDNAIcons);
            console.log('Total questions captured:', Object.keys(attemptedQuestions).length);
            
            const result = await saveEmail(email, attemptedQuestions);
            if (result.success) {
                console.log('Email saved successfully:', result);
                if (result.message === 'Email already registered') {
                    setWarning('This email is already registered!');
                } else {
                    setSuccess('Email registered successfully!');
                    navigate('/trading-profiles');
                }
            } else {
                const errorMessage = typeof result.error === 'string' 
                    ? result.error 
                    : 'Failed to register email. Please try again.';
                setError(errorMessage);
            }
        } catch (err: any) {
            const errorMessage = err?.message || 'An error occurred. Please check your connection and try again.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full relative pt-2 min-h-[220px] overflow-hidden">
            {/* Content */}
            <div className="relative z-10 pb-6 pt-4 px-4">
                <h2 className="text-white font-bold text-[20px] leading-tight mb-6 text-center">
                    Enter your email to unlock your <br /> results + get a tailored plan.
                </h2>

                {/* DNA Icons Triangle Formation */}
                {displayIcons.length > 0 && (
                    <div className="flex flex-col items-center mb-6">
                        <div className="flex flex-col items-center space-y-2">
                            {/* Top icon - QuestionPage (ID 3) */}
                            <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl animate-glow-pulse"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '2px solid rgba(255,255,255,0.2)',
                                    backdropFilter: 'blur(6px)',
                                }}
                            >
                                {displayIcons[0] || '♟️'}
                            </div>
                            
                            {/* Bottom row - AdvanceQuestionPage (ID 5) and TradingQuizExtraPage (ID 2) */}
                            <div className="flex space-x-4">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl animate-glow-pulse"
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        border: '2px solid rgba(255,255,255,0.2)',
                                        backdropFilter: 'blur(6px)',
                                    }}
                                >
                                    {displayIcons[1] || '🚀'}
                                </div>
                                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl animate-glow-pulse"
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        border: '2px solid rgba(255,255,255,0.2)',
                                        backdropFilter: 'blur(6px)',
                                    }}
                                >
                                    {displayIcons[2] || '🌱'}
                                </div>
                            </div>
                        </div>
                        
                        {/* Text below triangle */}
                        <p className="text-white/90 text-sm font-medium mt-4 text-center">
                            See the trader your DNA just revealed — it's you
                        </p>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="relative mb-4">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <input
                            type="email"
                            name="email"
                            id="email-input"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError(null);
                                setSuccess(null);
                                setWarning(null);
                            }}
                            placeholder="Enter your email"
                            className={`w-full pl-12 pr-4 py-3 rounded-lg placeholder-white/40 focus:outline-none transition-all ${
                                error ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 
                                warning ? 'border-orange-400 focus:border-orange-400 focus:ring-orange-400' :
                                success ? 'border-green-400 focus:border-green-400 focus:ring-green-400' : 
                                'border-blue-300 focus:border-blue-400 focus:ring-blue-400'
                            }`}
                            aria-label="Email address"
                            aria-describedby={error ? 'email-error' : warning ? 'email-warning' : success ? 'email-success' : undefined}
                            aria-invalid={error ? 'true' : 'false'}
                            required
                            disabled={loading}
                            autoComplete="email"
                            style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                fontSize: '15px',
                                color: 'rgba(255, 255, 255, 0.7)'
                            }}
                        />
                    </div>

                    {/* Privacy Text */}
                    <div className="flex items-center gap-2 mb-2">
                        <img src={ShieldIcon} alt="Shield" className="w-4 h-4" />
                        <span className="text-white/70 text-[14px]">We respect your privacy. No spam</span>
                    </div>
                    
                    {error && (
                        <div id="email-error" className="mb-4 pr-32 text-red-400 text-sm text-left font-medium" role="alert">
                            {error}
                        </div>
                    )}
                    
                    {warning && (
                        <div id="email-warning" className="mb-4 pr-32 text-orange-400 text-sm text-left font-medium" role="alert">
                            {warning}
                        </div>
                    )}
                    
                    {success && (
                        <div id="email-success" className="mb-4 pr-32 text-green-400 text-sm text-left font-medium" role="status">
                            {success}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading || !email}
                        className={`px-6 text-white font-semibold transition-colors duration-200 flex items-center justify-center ${loading || !email ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        style={{
                            borderRadius: 100,
                            height: '50px',
                            background: loading || !email 
                                ? '#0F9D7C'
                                : 'linear-gradient(to right, #0FB084, #2FA6B9)',
                            paddingTop: 14,
                            paddingBottom: 14,
                            fontSize: '16px',
                            fontWeight: 600
                        }}
                    >
                        {loading ? 'Saving...' : 'Unlock my trader profile'}
                    </button>
                </form>
            </div>

            {/* Avatar positioned at bottom-right */}
            <div className="absolute bottom-[-20px] right-[-8px] pointer-events-none z-0 mb-4">
                <img src={StandingAvatar} alt="Standing Avatar" className="w-[130px] h-[130px] object-contain" />
            </div>

            <style>{`
                @keyframes glow-pulse {
                    0%, 100% {
                        box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
                    }
                    50% {
                        box-shadow: 0 0 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.4);
                    }
                }
                
                .animate-glow-pulse {
                    animation: glow-pulse 1.5s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default EmailCaptureCard;

