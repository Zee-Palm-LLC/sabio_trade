import React from "react";
import Card from "./Card";
import TestimonialCard from "./TestimonialCard";

const SellEverythingCard: React.FC = () => {
    return (
        <Card className='bg-[#340863] rounded-[12px] border border-[#7D31D87A] shadow-[0_0_12px_0_rgba(125,49,216,0.47)]'>
            <div className="flex flex-col items-center text-center px-2 py-6 md:px-8">
                <h2 className="text-[24px] md:text-3xl font-bold text-[#18FE6C] leading-tight mb-4">
                    AI won’t replace people<br />
                    <span className="text-[#18FE6C]">but people using AI will.</span>
                </h2>
                <p className="text-base md:text-lg text-[#E2D9F7] font-normal leading-tight">
                    AI is transforming trading by making everyday
                    tasks more accessible, by learning from
                    endless data. It makes investing more
                    accessible, but reminds us: smart tools
                    still
                    need&nbsp; educated people behind them.
                </p>
            </div>
            <div className="flex-1 flex items-center justify-center px-0 mb-3">
                <div className="relative w-full max-w-md">
                    <div className="w-full max-w-sm bg-[#031340] rounded-[12px] border border-slate-600/30 px-4 pt-4 pb-4">
                        <div
                            style={{
                                height: 157,
                                borderRadius: 12,
                                backgroundColor: "#1a243b",
                                width: "100%",
                            }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1760340641889-7d215d84bda3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332"
                                className="w-full h-full object-cover rounded-[12px]"
                                style={{ borderRadius: 12 }}
                                alt="Fitting Example"
                            />
                        </div>
                        <span className="text-[#17F871] text-[12px] font-medium mt-3 block">
                            We got you, covered with guidance on how to utilize the latest AI technology.
                        </span>
                    </div>
                </div>
            </div>
            {/* <div className="px-2 py-4">
                <div className="w-full h-32 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-yellow-300/30 to-orange-500/20"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-800 to-transparent"></div>
                    <div className="relative z-10 text-center">
                        <div className="w-8 h-8 bg-slate-600 rounded-full mx-auto mb-2"></div>
                        <div className="text-white/60 text-xs">Landscape Image</div>
                    </div>
                </div>
                <p className="text-[#18FE6C] text-sm font-medium text-center mt-4 leading-relaxed">
                    We got you, covered with guidance on<br />
                    how to utilize the latest AI technology.
                </p>
            </div> */}

            <TestimonialCard />
        </Card>
    );
}

export default SellEverythingCard;
