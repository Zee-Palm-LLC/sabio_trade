import React from 'react';
import EducationIcon from '../../assets/trade_education.png';
import Card from './Card';


const SabioTradeFeatures: React.FC = () => {
    return (
        <Card
            className={`w-full max-w-sm bg-[#340863] rounded-[12px] border border-[#7D31D87A] shadow-[0_0_12px_0_rgba(125,49,216,0.47)] p-2`}
        >
            <div className="flex flex-col space-y-2">
                <h3 className="text-white font-bold text-[16px] text-center">
                    Sabio Trade education center you will:
                </h3>
                <div className="flex items-start space-x-2">
                    <div className="flex-1">
                        <ul className="space-y-1">
                            <li className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-white/50 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-white/50 text-sm">
                                    Discover different trading strategies
                                </span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-white/50 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-white/50 text-sm">
                                    Master everything you need to become an intelligent trader
                                </span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-white/50 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-white/50 text-sm">
                                    Know key trading terms and rules
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-lg overflow-hidden flex-shrink-0">
                        <img src={EducationIcon} alt="Education" className="w-full h-full" />
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default SabioTradeFeatures;
