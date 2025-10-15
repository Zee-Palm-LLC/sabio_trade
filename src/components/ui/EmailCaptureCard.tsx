import React, { useState } from 'react';
import PointAvatar from '../../assets/pointing_avatar.png';
import Card from './Card';
import { saveEmail } from '../../services/emailService';

const EmailCaptureCard: React.FC = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [warning, setWarning] = useState<string | null>(null);

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
                if (result.message === 'Email already registered') {
                    setWarning('This email is already registered!');
                } else {
                    setSuccess('Email registered successfully!');
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
        <Card
            className={`w-full max-w-sm bg-[#340863] rounded-[12px] border border-[#7D31D87A] shadow-[0_0_12px_0_rgba(125,49,216,0.47)] p-6 relative overflow-hidden`}
        >
            {/* Avatar positioned at bottom-right with no padding */}
            <div className="absolute -bottom-2 -right-2">
                <img src={PointAvatar} alt="Point Avatar" className="w-24 h-24" />
            </div>

            {/* Content */}
            <div className="relative z-10">
                <h2 className="text-white font-bold text-[18px] leading-tight mb-4 text-center">
                    Enter your email to unlock your results + get a tailored plan.
                </h2>

                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                            className={`w-full pl-10 pr-4 py-3 bg-[#1A2B50] border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${
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
                        />
                    </div>
                    
                    {error && (
                        <div id="email-error" className="mt-2 text-red-400 text-sm text-center font-medium" role="alert">
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

                    <div className='mt-4 flex justify-center flex-col items-start'>
                        <button
                            type="submit"
                            disabled={loading || !email}
                            className={`font-[16px] font-normal py-4 px-6 transition-colors duration-200 flex items-center justify-center ${loading || !email ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                            style={{
                                borderRadius: 108,
                                background: 'linear-gradient(135deg, #0FB084 0%, #2FA6B9 100%)',
                                paddingTop: 12,
                                paddingBottom: 12,
                            }}
                        >
                            {loading ? 'Saving...' : 'Unlock my trader profile'}
                        </button>
                    </div>
                </form>
            </div>
        </Card>
    );
};

export default EmailCaptureCard;
