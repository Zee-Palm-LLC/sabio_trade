import React from "react";
import WarrenBuffettImage from '../../assets/warren.png';
import { DNAIconsService } from '../../services/dnaIconsService';
import { Card, QuoteCard, TestimonialCard } from "../index";

interface RightTimeToSellProps {
    // Legacy prop for backward compatibility - now using localStorage
    dnaIcons?: string[];
}

const RightTimeToSell: React.FC<RightTimeToSellProps> = ({ dnaIcons: _dnaIcons = [] }) => {
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
        <div>
            <Card className='bg-[#340863] rounded-[12px] border border-[#7D31D87A] shadow-[0_0_12px_0_rgba(125,49,216,0.47)] mb-6'>
                <QuoteCard
                    quote="“The stock market is designed to transfer money from the impatient to the patient.”"
                    profileImage={WarrenBuffettImage}
                    name="Warren Buffett "
                    bottomMargin="mb-0"
                />

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
            </Card>
            <TestimonialCard />
        </div>

    );

}

export default RightTimeToSell;