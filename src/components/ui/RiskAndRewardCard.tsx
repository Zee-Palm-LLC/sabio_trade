import React from "react";
import MellodyHobsonImage from '../../assets/mellody.png';
import Card from "./Card";
import QuoteCard from "./QuoteCard";
import TestimonialCard from "./TestimonialCard";

const RiskAndRewardsCard: React.FC = () => {
    return (
        <div>
            <Card className='bg-[#340863] rounded-[12px] border border-[#7D31D87A] shadow-[0_0_12px_0_rgba(125,49,216,0.47)] mb-6'>
                <QuoteCard
                    quote="“The biggest risk of all is not taking one.”"
                    profileImage={MellodyHobsonImage}
                    name="Mellody Hobson"
                />
                <div className="text-center mb-0">
                    <p className="text-[#17F871] text-[16px] font-semibold mt-2 mb-2">
                        We got you, steady growth beats chasing noise.
                    </p>
                    {/* <ResultsCard text="Our education and tools are utilizing the latest technologies to make 
your experience silky smooth, the challenge will safely prepare you" /> */}
                    {/* <p className="text-[#cfc9e1] text-base mb-2">
                        In trading, every reward comes with risk. Quick gains tempt, but losses can be just as fast. People should remember: protect your money first, aim for steady growth, and never risk more than you can afford.
                    </p> */}

                </div>
            </Card>

            <TestimonialCard />
        </div>
    );
};

export default RiskAndRewardsCard;