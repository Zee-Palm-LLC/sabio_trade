import React from 'react';
import Logo from '../assets/logo.png';
import SheildFilledIcon from '../assets/sheild_filled.svg';
import { ChartCard, EmailCaptureCard, TestimonialCard } from '../components';

import { useNavigate } from 'react-router-dom';

const LeadPage: React.FC = () => {
    const navigate = useNavigate();
   
    const handleOnClick = ()=>{
        navigate('/trading-profiles');
    }
    return (
        <div className="min-h-screen text-white" style={{ background: 'var(--bg-gradient)' }}>
            <div className="w-[375px] mx-auto min-h-screen flex flex-col">
                <div className="flex flex-col items-center pt-8 pb-4 px-4">
                    <div className="flex items-center space-x-3 mb-3">
                        <img src={Logo} alt="SabioTrade" className=" h-14" />
                    </div>
                    <EmailCaptureCard />
                    <div className="w-full mt-0 mb-4 py-3 bg-[#0C1540] rounded-[4px] flex items-center justify-start">
                        <img src={SheildFilledIcon} alt="Sheild Filled" className="w-6 h-6 mr-2 flex-shrink-0" />
                        <span className="text-[14px] text-[#A6B8D3] font-normal">We respect your privacy. No spam.</span>
                    </div>
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
        </div>
    );
};

export default LeadPage;