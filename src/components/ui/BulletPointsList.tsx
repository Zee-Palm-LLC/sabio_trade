import React from 'react';
import BulletPointIcon from '../../assets/star_bullet.png';

interface BulletPoint {
    id: string;
    text?: string;
    highlightedText?: string;
    prefixText?: string;
    prefixOpacity?: number;
    textOpacity?: number; // 1 for full opacity, 0.6 for 60% opacity
}

interface BulletPointsListProps {
    className?: string;
    items: BulletPoint[];
}

const BulletPointsList: React.FC<BulletPointsListProps> = ({ className = '', items }) => {
    return (
        <ul className={`${className} list-none m-0 p-0`} style={{ listStyleType: 'none' }}>
            {items.map((item) => (
                <li key={item.id} className="flex items-start space-x-3 mb-3 last:mb-0" style={{ listStyleType: 'none' }}>
                    <img 
                        src={BulletPointIcon} 
                        alt="Bullet" 
                        className="w-3 h-3 mt-0.5 flex-shrink-0" 
                    />
                    <span 
                        className="text-white text-[14px] font-normal leading-relaxed"
                        style={{ opacity: item.textOpacity || 1 }}
                    >
                        {item.prefixText && (
                            <span style={{ opacity: item.prefixOpacity || 0.6 }}>
                                {item.prefixText}
                            </span>
                        )}
                        {item.highlightedText ? (
                            <span className="font-bold">{item.highlightedText}</span>
                        ) : (
                            item.text
                        )}
                    </span>
                </li>
            ))}
        </ul>
    );
};

export default BulletPointsList;
