import React from "react";
import Logo from '../assets/logo.png';
import { ProgressCard, TestimonialCard } from "../components";


const TradingProfiles: React.FC = () => {
    return (
        <div className="min-h-screen text-white" style={{ background: 'var(--bg-gradient)' }}>
            <div className="w-[375px] mx-auto min-h-screen flex flex-col px-4">
                <div className="flex flex-col items-center pt-8 pb-4">
                    <div className="flex items-center space-x-3 mb-3">
                        <img src={Logo} alt="SabioTrade" className=" h-14" />
                    </div>
                </div>
                <ProgressCard 
                    progress={65}
                    topText="1,000,000+ trading profiles built — your personalized path is next."
                    bottomText="Creating the personal challenge and trading profile..."
                />
                <TestimonialCard/>

            </div>
        </div>
    );

}

export default TradingProfiles;