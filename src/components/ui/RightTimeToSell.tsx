import React from "react";
import profileImage from '../../assets/profile.png';
import QuoteIcon from '../../assets/quote.svg';
import { Card, TestimonialCard } from "../index";


const RightTimeToSell: React.FC = () => {
    return (
        <Card className='bg-[#340863] rounded-[12px] border border-[#7D31D87A] shadow-[0_0_12px_0_rgba(125,49,216,0.47)]'>
            <div className="bg-[#031340] rounded-[12px] p-4 mb-6 border border-slate-600/30">
                <div className="flex justify-center">
                    <img src={QuoteIcon} alt="Quote" className="w-10 h-10 mb-0" />
                </div>
                <p className="text-white font-semibold text-[17px] leading-relaxed mb-2">
                    <span className="block text-center">
                        "In trading, it's not about being right, it's about making money."
                    </span>
                </p>
                <div className="flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 overflow-hidden">
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="object-cover w-8 h-8 rounded-full"
                        />
                    </div>
                    <span className="text-white text-sm">Marty Schwartz</span>
                </div>
            </div>

            <div className="text-center mb-8">
                <p className="text-[#cfc9e1] text-base mb-2">
                    To make it simple, don’t rush, hold with<br className="sm:hidden" />
                    patience, and avoid emotional timing.
                </p>
                <p className="text-[#24FFA3] text-[16px] font-semibold mt-2">
                    “It’s ok to be unsure, we will guide you”
                </p>
                <p className="text-[#cfc9e1] text-base mb-2">
                We cover all the important steps, our challenge adapts your skill level, helping you gain confidence and improve your trading decisions.
                </p>
            </div>
            <TestimonialCard />
        </Card>

    );

}

export default RightTimeToSell;