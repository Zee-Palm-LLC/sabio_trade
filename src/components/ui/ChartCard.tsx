import React from 'react';
import ChartImage from '../../assets/chart_img.png';
import BulletPoint from '../../assets/star_bullet.png';
import Card from './Card';

const ChartCard: React.FC = () => {
    return (
        <Card
            className={`w-full max-w-sm bg-[#340863] rounded-[12px] border border-[#7D31D87A] shadow-[0_0_12px_0_rgba(125,49,216,0.47)] p-6`}
        >
            {/* Chart Section */}
            <div className="mb-6">
                <div className="w-full h-[150px] bg-gray-700 rounded-lg flex items-center justify-center">
                    <img src={ChartImage} alt="Chart" className="w-full h-full object-cover rounded-lg" />
                </div>
            </div>

            {/* Features List */}
            <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                    <img src={BulletPoint} alt="Bullet" className="w-[14px] h-[14px] flex-shrink-0" />
                    <span className="text-white text-[14px] font-normal">90% profit share</span>
                </div>
                <div className="flex items-center space-x-3">
                    <img src={BulletPoint} alt="Bullet" className="w-[14px] h-[14px] flex-shrink-0" />
                    <span className="text-white text-[14px] font-normal">Instant payouts</span>
                </div>
                <div className="flex items-center space-x-3">
                    <img src={BulletPoint} alt="Bullet" className="w-[14px] h-[14px] flex-shrink-0" />
                    <span className="text-white text-[14px] font-normal">One-step challenge, no time limits</span>
                </div>
                <div className="flex items-center space-x-3">
                    <img src={BulletPoint} alt="Bullet" className="w-[14px] h-[14px] flex-shrink-0" />
                    <span className="text-white text-[14px] font-normal">Education + community included</span>
                </div>
            </div>

            {/* Call-to-Action Button */}
            <button
                className="w-full text-white font-bold py-4 px-6 transition-colors duration-200 flex items-center justify-center"
                style={{
                    borderRadius: 108,
                    background: 'linear-gradient(135deg, #0FB084 0%, #2FA6B9 100%)',
                    paddingTop: 12,
                    paddingBottom: 12,
                }}
            >
                Unlock my trader profile
            </button>
        </Card>
    );
};

export default ChartCard;
