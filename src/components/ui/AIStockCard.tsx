import React from "react";
import SceneImage from '../../assets/scene.png';
import Card from "./Card";
import TestimonialCard from "./TestimonialCard";

const AIStockCard: React.FC = () => {
    return (
        <div>
            <Card className='bg-[#340863] rounded-[12px] border border-[#7D31D87A] shadow-[0_0_12px_0_rgba(125,49,216,0.47)] mb-4'>
                <div className="flex flex-col items-center text-center px-4 pt-4 pb-2">
                    <h2 className="text-[22px] font-bold text-[#17F871] leading-tight mb-3">
                        AI won't replace people but people using AI will.
                    </h2>
                    <div className="flex-1 flex items-center justify-center px-0">
                        <div className="relative w-full max-w-md">
                            <div className="w-full max-w-sm rounded-[12px]">
                                <div
                                    style={{
                                        height: 157,
                                        borderRadius: 12,
                                        backgroundColor: "#1a243b",
                                        width: "100%",
                                    }}
                                >
                                    <img
                                        src={SceneImage}
                                        className="w-full h-full object-cover rounded-[12px]"
                                        style={{ borderRadius: 12 }}
                                        alt="Fitting Example"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
            <TestimonialCard />
        </div>
    );
}

export default AIStockCard;
