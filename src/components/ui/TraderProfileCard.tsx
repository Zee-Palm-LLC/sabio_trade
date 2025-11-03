import React from 'react';
import rocketIcon from '../../assets/rocket.svg';
import TraderProfile from '../../assets/trader-profile.png';
import Card from './Card';

interface TraderProfileCardProps {
    rating?: string;
    avatarUrl?: string;
}

const TraderProfileCard: React.FC<TraderProfileCardProps> = ({
    rating = "Very Good",
    avatarUrl
}) => {
    return (
        <Card
            className={`w-full max-w-sm bg-[#340863] rounded-[12px] border border-[#7D31D87A] shadow-[0_0_12px_0_rgba(125,49,216,0.47)] p-0 overflow-hidden`}
        >
            <div className="flex items-center justify-between mb-0">
                <h3
                    className="text-white text-center font-[600] text-[16px] leading-[140%] tracking-normal"
                >
                    Your Trader Profile:
                </h3>
                <div
                    className="flex items-center gap-[6px] px-2 py-2"
                    style={{
                        background: "#054A21",
                        border: "1px solid #FFFFFF2B",
                        borderRadius: 37,
                        padding: 8,
                    }}
                >
                    <img src={rocketIcon} alt="Shield" className="w-4 h-4" />
                    <span className="text-white font-bold text-sm">{rating}</span>
                </div>
            </div>
            <div
                className="w-full flex items-center"
                style={{
                    background: "#031340",
                    border: "1px solid #FFFFFF29",
                    borderRadius: 12,
                    padding: 10,
                    marginTop: 16,
                    marginBottom: 8
                }}
            >
                <div className="flex-1">
                    <h4 className="text-white font-medium text-[15px] leading-tight">
                        You've advanced — just one more step to unlock funding.
                    </h4>
                </div>
                {avatarUrl && (
                    <div className="flex-shrink-0 ml-6">
                        <img
                            src={TraderProfile}
                            alt="Avatar"
                            className="w-[72px] h-[82px] rounded-[12px] object-cover border-0"
                            style={{ background: "#031347" }}
                        />
                    </div>
                )}
            </div>
        </Card>
    );
};

export default TraderProfileCard;
