import React from "react";
import WarrenBuffettImage from '../../assets/warren.png';
import { Card, QuoteCard, TestimonialCard } from "../index";


const RightTimeToSell: React.FC = () => {
    return (
        <Card className='bg-[#340863] rounded-[12px] border border-[#7D31D87A] shadow-[0_0_12px_0_rgba(125,49,216,0.47)]'>
            <QuoteCard
                quote="“The stock market is designed to transfer money from the impatient to the patient.”"
                profileImage={WarrenBuffettImage}
                name="Warren Buffett "
            />

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