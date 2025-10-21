import React from 'react';
import Logo from '../assets/logo.png';
import { BottomShade, ChartCard, EmailCaptureCard } from '../components';

const LeadPage: React.FC = () => {
    return (
        <div className="min-h-screen text-white relative" style={{ background: 'var(--bg-gradient)' }}>
            <BottomShade />
            <div className="w-[375px] mx-auto min-h-screen flex flex-col">
                <div className="flex flex-col items-center pt-8 pb-4 px-4 mb-20">
                    <div className="flex items-center space-x-3 mb-3">
                        <img src={Logo} alt="SabioTrade" className=" h-14" />
                    </div>
                    <EmailCaptureCard />
                    <ChartCard />
                    {/* <div className="mt-4" />
                    <TestimonialCard />
                    <PrimaryButton
                        text="Unlock my trader profile"
                        showIcon={false}
                        onClick={handleOnClick}
                    /> */}

                </div>
            </div>
        </div>
    );
};

export default LeadPage;