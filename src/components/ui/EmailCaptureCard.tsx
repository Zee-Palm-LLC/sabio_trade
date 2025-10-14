import React, { useState } from 'react';
import PointAvatar from '../../assets/pointing_avatar.png';
import Card from './Card';
import { saveEmail } from '../../services/emailService';

const EmailCaptureCard: React.FC = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const result = await saveEmail(email);
            if (result.success) {
                console.log('Email saved successfully:', result);
            } else {
                setError('Failed to save email. Please try again.');
            }
        } catch (err) {
            console.error('Error submitting email:', err);
            setError('An error occurred. Please try again.');
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full pl-10 pr-4 py-3 bg-[#1A2B50] border border-blue-300 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                            required
                            disabled={loading}
                        />
                    </div>
                    
                    {error && (
                        <div className="mt-2 text-red-400 text-sm text-center">
                            {error}
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
