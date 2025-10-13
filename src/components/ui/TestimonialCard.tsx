import React from "react";
import TrustPilot from '../../assets/trustpilot.png';

export interface TestimonialCardProps {
}

const TestimonialCard: React.FC<TestimonialCardProps> = () => (
    <div className="flex-1 flex items-center justify-center px-0 mb-0">
        <div className="relative w-full max-w-md">
            <div className="w-full max-w-sm bg-[#031340] rounded-[12px] border border-slate-600/30 px-4 pt-4 pb-4">
                <div className="flex items-center mb-2">
                    <img
                        src="https://randomuser.me/api/portraits/men/32.jpg" // use a placeholder or static photo
                        alt="Wade Warren"
                        className="w-9 h-9 rounded-full mr-4 object-cover"
                    />
                    <div>
                        <div className="text-white font-bold text-base">Wade Warren</div>
                        <div className="text-[#99A3C3] text-sm font-medium">Company CEO</div>
                    </div>
                </div>
                <div className="flex items-center mb-2">
                    {[1, 2, 3, 4, 5].map(i => (
                        <img src={TrustPilot} alt="TrustPilot" className="w-4 h-4 mr-1 last:mr-0" />
                    ))}
                </div>
                <div>
                    <p className="text-[#edf1fd] text-[12px] font-normal leading-6">
                        "I've been consistently impressed with the quality of service provided by this website"
                    </p>
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <span className="w-2 h-2 rounded-full bg-white/80 mx-1 inline-block"></span>
                <span className="w-2 h-2 rounded-full bg-white/20 mx-1 inline-block"></span>
                <span className="w-2 h-2 rounded-full bg-white/20 mx-1 inline-block"></span>
            </div>
        </div>
    </div>
);

export default TestimonialCard;