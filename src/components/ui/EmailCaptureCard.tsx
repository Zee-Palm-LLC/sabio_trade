import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PointAvatar from '../../assets/pointing_avatar.png';
import ShieldIcon from '../../assets/sheild_filled.svg';
import { saveEmail } from '../../services/emailService';

const EmailCaptureCard: React.FC = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [warning, setWarning] = useState<string | null>(null);
    const navigate = useNavigate();

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
            const result = await saveEmail(email);
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
        <div className="w-full relative pt-2">
            {/* Content */}
            <div className="relative z-10 pb-6">
                <h2 className="text-white font-bold text-[18px] leading-tight mb-6 text-left pr-20">
                    Enter your email to unlock your results + get a tailored plan.
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="relative mb-4">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                            className={`w-full pl-12 pr-4 py-4 rounded-lg text-white placeholder-white/40 focus:outline-none transition-all ${
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
                                fontSize: '15px'
                            }}
                        />
                    </div>

                    {/* Privacy Text */}
                    <div className="flex items-center gap-2 mb-6">
                        <img src={ShieldIcon} alt="Shield" className="w-4 h-4" />
                        <span className="text-white/70 text-[14px]">We respect your privacy. No spam</span>
                    </div>
                    
                    {error && (
                        <div id="email-error" className="mb-4 text-red-400 text-sm text-center font-medium" role="alert">
                            {error}
                        </div>
                    )}
                    
                    {warning && (
                        <div id="email-warning" className="mt-2 text-orange-400 text-sm text-center font-medium" role="alert">
                            {warning}
                        </div>
                    )}
                    
                    {success && (
                        <div id="email-success" className="mt-2 text-green-400 text-sm text-center font-medium" role="status">
                            {success}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading || !email}
                        className={`px-6 text-white font-semibold transition-colors duration-200 flex items-center justify-center ${loading || !email ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        style={{
                            borderRadius: 100,
                            background: loading || !email 
                                ? 'rgba(15, 176, 132, 0.3)' 
                                : '#0F9D7C',
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
            <div className="absolute bottom-[-8px] right-[-8px] pointer-events-none z-0">
                <img src={PointAvatar} alt="Point Avatar" className="w-[130px] h-[130px] object-contain" />
            </div>
        </div>
    );
};

export default EmailCaptureCard;

