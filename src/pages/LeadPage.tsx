import React, { useState } from 'react';
import Logo from '../assets/logo.png';
import { ChartCard, EmailCaptureCard, TestimonialCard } from '../components';

const LeadPage: React.FC = () => {
    const [showEmailModal, setShowEmailModal] = useState(false);

    const handleOnClick = () => {
        setShowEmailModal(true);
    }

    const handleCloseModal = () => {
        setShowEmailModal(false);
    }
    return (
        <div className="min-h-screen text-white" style={{ background: 'var(--bg-gradient)' }}>
            <div className="w-[375px] mx-auto min-h-screen flex flex-col">
                <div className="flex flex-col items-center pt-8 pb-4 px-4">
                    <div className="flex items-center space-x-3 mb-3">
                        <img src={Logo} alt="SabioTrade" className=" h-14" />
                    </div>
                    {/* <EmailCaptureCard /> */}
                    <ChartCard />
                    <div className="mt-4" />
                    <TestimonialCard />
                    <button
                        className="w-full mt-5 text-white font-bold py-4 px-6 transition-colors duration-200 flex items-center justify-center"
                        onClick={handleOnClick}
                        style={{
                            borderRadius: 108,
                            background: 'linear-gradient(135deg, #0FB084 0%, #2FA6B9 100%)',
                            paddingTop: 12,
                            paddingBottom: 12,
                        }}
                    >
                        Unlock my trader profile
                    </button>
                </div>
            </div>

            {/* Bottom Sheet Modal */}
            {showEmailModal && (
                <div
                    className="fixed inset-0 z-50 flex items-end justify-center"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                    onClick={handleCloseModal}
                >
                    <div
                        className="w-full animate-slide-up"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            maxWidth: '375px',
                            background: '#0A1432',
                            borderTopLeftRadius: '12px',
                            borderTopRightRadius: '12px',
                            padding: '12px',
                            maxHeight: '100vh',
                            overflowY: 'auto',
                        }}
                    >
                        <EmailCaptureCard />
                    </div>
                </div>
            )}

            <style>{`
                @keyframes slide-up {
                    from {
                        transform: translateY(100%);
                    }
                    to {
                        transform: translateY(0);
                    }
                }
                
                .animate-slide-up {
                    animation: slide-up 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default LeadPage;