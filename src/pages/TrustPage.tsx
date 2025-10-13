import React from 'react';
import Logo from '../assets/logo.png';
import { BulletPointsList, TrustMainContentCard } from '../components';


const TrustPage: React.FC = () => {

    const bulletPoints = [
        {
            id: '1',
            text: '10,000+ traders joined Sabio challenges.'
        },
        {
            id: '2',
            text: 'Regulated in the EU (Ireland company no. 680139).'
        },
        {
            id: '3',
            prefixText: 'As seen on ',
            prefixOpacity: 0.6,
            highlightedText: 'Investing.com, DailyForex, TradingNews.'
        },
        {
            id: '4',
            prefixText: 'Winner: ',
            prefixOpacity: 0.6,
            highlightedText: 'Best Prop Firm 2025.'
        },
        {
            id: '5',
            text: 'Instant payout system trusted worldwide.'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
            <div className="w-[375px] mx-auto min-h-screen flex flex-col">
                <div className="flex flex-col items-center pt-8 pb-4">
                    <div className="flex items-center space-x-3 mb-3">
                        <img src={Logo} alt="SabioTrade" className=" h-14" />
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-center px-4 mb-1">
                    <TrustMainContentCard />
                </div>

                <div className="flex-1 flex items-center justify-center px-4 mb-4">
                    <BulletPointsList items={bulletPoints} />
                </div>
            </div>
        </div>
    );
};

export default TrustPage;
