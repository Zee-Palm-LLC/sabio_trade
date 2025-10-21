import React, { useState } from 'react';
import Logo from '../assets/logo.png';
import { BottomShade, ChartCard, EmailCaptureCard, TestimonialCard } from '../components';

const LeadPage: React.FC = () => {
    const [showEmailModal] = useState(true);

    return (
        <div className="min-h-screen text-white relative" style={{ background: 'var(--bg-gradient)' }}>
            <BottomShade />
            <div className="w-[375px] mx-auto min-h-screen flex flex-col">
                <div className="flex flex-col items-center pt-8 pb-4 px-4 mb-20">
                    <div className="flex items-center space-x-3 mb-3">
                        <img src={Logo} alt="SabioTrade" className=" h-14" />
                    </div>
                    {/* <EmailCaptureCard /> */}
                    <ChartCard />
                    <TestimonialCard/>
                    {/* <div className="mt-4" />
                    <TestimonialCard />
                    <PrimaryButton
                        text="Unlock my trader profile"
                        showIcon={false}
                        onClick={handleOnClick}
                    /> */}

                </div>
            </div>

            {/* Bottom Sheet Modal */}
            {showEmailModal && (
                <div
                    className="fixed inset-0 z-50 flex items-end justify-center right-0"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                >
                    <div
                        className="w-full animate-slide-up"
                        style={{
                            width: window.innerWidth <= 500 ? '100%' : '375px',
                            background: '#0A1432',
                            borderTopLeftRadius: '12px',
                            borderTopRightRadius: '12px',
                            padding: '0px',
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