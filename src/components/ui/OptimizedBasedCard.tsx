import React from "react";
import plant from '../../assets/plant.png';
import Card from "./Card";

const OptimizedBasedCard: React.FC = () => {
    return (
        <Card className='bg-[#340863] rounded-[12px] border border-[#7D31D87A] shadow-[0_0_12px_0_rgba(125,49,216,0.47)]'>
            <h2 className="text-[22px] font-bold text-[#18FE6C] leading-tight mb-4 text-center">
                Start small, learn, and confidence will follow..
            </h2>
            <p className="text-[14px] text-[#E2D9F7] font-normal leading-tight text-center">
                If you’re unsure about trading, remember confidence comes with practice. Our
                challenge aims to position an income portfolio, by focusing on learning each step. Over time, experience builds skill, and skill builds the confidence you need.
            </p>
            <div className="flex items-center justify-center pt-10">
                <img src={plant} alt="plant" className="w-full h-full" />
            </div>
            <div className="text-center mb-0">
                <p className="text-[#24FFA3] text-[15px] font-semibold mt-2">
                    We got you , progress builds confidence.
                </p>
                <p className="text-[#cfc9e1] text-base mb-2">
                    Let’s make your trading journey simple and successful!
                </p>

            </div>
        </Card >
    );
};

export default OptimizedBasedCard;