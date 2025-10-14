import React from 'react';
import IncomeIcon from '../../assets/income.svg';
import KnowledgeIcon from '../../assets/knowledge.svg';
import MotivationIcon from '../../assets/motivation.svg';
import PotentialIcon from '../../assets/potiential.svg';
import Card from './Card';

interface ScoreItem {
    label: string;
    score: 'High' | 'Intermediate' | 'Low';
    icon: string;
}

interface ScoreBreakdownCardProps {
    scores?: ScoreItem[];
}

const ScoreBreakdownCard: React.FC<ScoreBreakdownCardProps> = ({
    scores = [
        { label: 'Motivation', score: 'High', icon: MotivationIcon },
        { label: 'Potential', score: 'Low', icon: PotentialIcon },
        { label: 'Income', score: 'Intermediate', icon: IncomeIcon },
        { label: 'Knowledge', score: 'High', icon: KnowledgeIcon },
    ]
}) => {
    const getScorePercentage = (score: string) => {
        switch (score) {
            case 'High': return 100;
            case 'Intermediate': return 100;
            case 'Low': return 100;
            default: return 100;
        }
    };

    const getScoreColor = (score: string) => {
        switch (score) {
            case 'High': return '#10B981'; // green
            case 'Intermediate': return '#F59E0B'; // orange
            case 'Low': return '#EF4444'; // red
            default: return '#6B7280';
        }
    };

    return (
        <Card
            className={`w-full max-w-sm bg-[#340863] rounded-[12px] border border-[#7D31D87A] shadow-[0_0_12px_0_rgba(125,49,216,0.47)] p-0 overflow-hidden`}
        >
            <div className="pt-6 pb-4">
                <div className="relative w-full h-2 rounded-full mb-2"
                    style={{
                        background: 'linear-gradient(90deg, #EF4444 0%, #F59E0B 50%, #10B981 100%)',
                    }}>
                    <div
                        className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-lg"
                        style={{
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    ></div>
                </div>
                <div className="flex items-center justify-between w-full">
                    <span className="text-white text-sm font-medium">Low</span>
                    <span className="text-white text-sm font-medium">Intermediate</span>
                    <span className="text-white text-sm font-medium">High</span>
                </div>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-white/10"></div>

            {/* Score Items - No Padding */}
            <div className="py-6 space-y-0">
                {scores.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                        {/* Left: Icon Section */}
                        <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{
                                background: '#1A2B50',
                            }}
                        >
                            <img src={item.icon} alt={item.label} className="w-5 h-5" />
                        </div>

                        {/* Right: Column with Title, Progress Bar, and Score */}
                        <div className="flex-1">
                            {/* Title */}
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-white text-base font-medium">{item.label}</span>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full">
                                <div
                                    className="w-full rounded-full h-[3px]"
                                    style={{
                                        background: '#1A2B50'
                                    }}
                                >
                                    <div
                                        className="h-[3px] rounded-full transition-all duration-500"
                                        style={{
                                            width: `${getScorePercentage(item.score)}%`,
                                            background: getScoreColor(item.score)
                                        }}
                                    ></div>
                                </div>

                                {/* Score Label Below Progress Bar */}
                                <div className="flex justify-end mt-1">
                                    <span
                                        className="text-sm font-semibold"
                                        style={{ color: getScoreColor(item.score) }}
                                    >
                                        {item.score}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default ScoreBreakdownCard;
