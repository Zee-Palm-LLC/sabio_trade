import React from "react";
import plant from '../../assets/plant.png';
import { DNAIconsService } from '../../services/dnaIconsService';
import Card from "./Card";

interface NotSureCardProps {
    // Legacy prop for backward compatibility - now using localStorage
    dnaIcons?: string[];
}

const NotSureCard: React.FC<NotSureCardProps> = ({ dnaIcons: _dnaIcons = [] }) => {
    // Get stored DNA icons from localStorage
    const storedDNAIcons = DNAIconsService.getDNAIcons();
    
    // Get the DNA icon from question ID 5 (AdvanceQuestionPage)
    const question5Icon = storedDNAIcons.find(icon => icon.questionId === 5);
    
    // Map DNA icons to trader archetype info based on icon emoji
    const getTraderDNAInfo = () => {
        if (!question5Icon) return null;

        // Map icon emoji to specific archetype and quote
        const iconMapping: Record<string, { archetype: string; quote: string }> = {
            '🧘': { archetype: 'Emotional', quote: "Awareness is power — every trader starts here." },
            '🦉': { archetype: 'Patient', quote: "Holding your ground — classic discipline." },
            '📊': { archetype: 'Risk-Taker', quote: "Buying when others panic — a true contrarian spirit." },
            '🧠': { archetype: 'Composed', quote: "Composure over chaos — strong mental game." }
        };

        const mappedInfo = iconMapping[question5Icon.icon];
        
        if (mappedInfo) {
            return {
                archetype: mappedInfo.archetype,
                quote: mappedInfo.quote
            };
        }

        // Fallback to stored values if icon not found in mapping
        return {
            archetype: question5Icon.archetype,
            quote: question5Icon.quote
        };
    };

    const traderInfo = getTraderDNAInfo();
    return (
        <Card className='bg-[#340863] rounded-[12px] border border-[#7D31D87A] shadow-[0_0_12px_0_rgba(125,49,216,0.47)]'>
            <h2 className="text-[22px] font-bold text-[#18FE6C] leading-tight mb-4 text-center">
                You’re on track — each step reveals how to master better decisions.
            </h2>
            <p className="text-[14px] text-[#E2D9F7] font-normal leading-tight text-center">
                If you’re unsure about trading, remember confidence comes with practice.
            </p>
            <div className="flex items-center justify-center pt-10">
                <img src={plant} alt="plant" className="w-full h-full" />
            </div>
            {/* Trader DNA Information */}
            {traderInfo && (
                <div className="px-4 pb-4">
                    <div className="text-center">
                        {/* Icon + Archetype */}
                        <div className="flex items-center justify-center mb-1">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mr-0"
                            >
                                {question5Icon?.icon}
                            </div>
                            <h3 className="text-white text-lg font-semibold mt-1">
                                {traderInfo?.archetype}
                            </h3>
                        </div>

                        {/* Quote */}
                        <p className="text-white/90 text-base italic mb-3">
                            "{traderInfo?.quote}"
                        </p>

                        {/* Progress Message */}
                        <p className="text-[#17F871] text-sm font-medium">
                            Great progress! Your instinct's already showing potential.
                        </p>
                    </div>
                </div>
            )}

            <div className="text-center mb-0">
                <p className="text-[#17F871] text-[15px] font-semibold mt-2">
                    We got you , progress builds confidence.
                </p>
                {/* <p className="text-[#cfc9e1] text-base mb-2">
                    Let's make your trading journey simple and successful!
                </p> */}

            </div>
        </Card >
    );
};

export default NotSureCard;