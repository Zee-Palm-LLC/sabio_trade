import React from "react";
import SceneImage from '../../assets/scene.png';
import Card from "./Card";
import TestimonialCard from "./TestimonialCard";

const AIStockCard: React.FC = () => {
    return (
        <div>
            <Card className='bg-[#340863] rounded-[12px] border border-[#7D31D87A] shadow-[0_0_12px_0_rgba(125,49,216,0.47)] mb-6'>
                <div className="flex flex-col items-center text-center mb-4">
                    <h2 className="text-[22px] font-bold text-[#17F871] leading-tight mb-4">
                        AI won’t replace people but people using AI will.
                    </h2>
                    <p className="text-[14px] text-[#E2D9F7] font-normal leading-tight">
                        AI is transforming trading by making everyday
                        tasks more accessible, by learning from
                        endless data. It makes investing more
                        accessible, but reminds us: smart tools
                        still
                        need&nbsp; educated people behind them.
                    </p>
                </div>
                {/* <ResultsCard text="Our education and tools are utilizing the latest technologies to make your experience silky smooth, the challenge will safely prepare you." /> */}
                <div className="flex-1 flex items-center justify-center px-0 mb-0">
                    <div className="relative w-full max-w-md">
                        <div className="w-full max-w-sm rounded-[12px] pt-4 pb-0">
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
                            <span
                                className="block mt-3 text-center"
                                style={{
                                    color: "#17F871",
                                    fontWeight: 700,
                                    fontStyle: "bold",
                                    fontSize: 16,
                                    lineHeight: "140%",
                                    letterSpacing: "0%",
                                }}
                            >
                                We got you, covered with guidance on how to utilize the latest AI technology.
                            </span>
                        </div>
                    </div>
                </div>
            </Card>
            <TestimonialCard />
        </div>
    );
}

export default AIStockCard;
