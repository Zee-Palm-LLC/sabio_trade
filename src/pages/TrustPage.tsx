import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { TrustMainContentCard } from '../components';

const TrustPage: React.FC = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
            <div className="w-[375px] mx-auto min-h-screen flex flex-col">
                <div className="flex flex-col items-center pt-8 pb-2">
                    <div className="flex items-center space-x-3 mb-3">
                        <img src={Logo} alt="SabioTrade" className=" h-14" />
                    </div>
                </div>

                <div className="flex-1 flex items-start justify-center px-4 mb-1">
                    <TrustMainContentCard />
                </div>

                {/* Footer Section */}
                <div className="text-center text-black text-xs px-4 pb-6">
                    <p className="mb-1 text-white text-opacity-30">CODEVIL IT ENGINEERING LIMITED 2021-2025</p>
                    <p className="mb-1 text-white text-opacity-30">registered with company number 680139 at 2c,</p>
                    <p className="mb-1 text-white text-opacity-30">Grangegorman Lower, Smithfield, Dublin, Ireland,</p>
                    <p className="mb-4 text-white text-opacity-30">D07a433</p>
                    <div className="flex justify-center items-center space-x-2">
                        <span className="text-white">•</span>
                        <a href="#" className="underline text-white hover:text-white transition-colors">Terms & Conditions</a>
                        <span className="text-white">•</span>
                        <a href="#" className="underline text-white hover:text-white transition-colors">Privacy Policy</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrustPage;
