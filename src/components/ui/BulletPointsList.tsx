import React from 'react';
import BulletPointIcon from '../../assets/bullet_point.svg';

interface BulletPoint {
    id: string;
    text?: string;
    highlightedText?: string;
    prefixText?: string;
    prefixOpacity?: number;
}

interface BulletPointsListProps {
    className?: string;
    items: BulletPoint[];
}

const BulletPointsList: React.FC<BulletPointsListProps> = ({ className = '', items }) => {
    return (
        <ul className={`${className} list-none m-0`}>
            {items.map((item) => (
                <li key={item.id} className="flex items-start space-x-3 mb-3 last:mb-0">
                    <img 
                        src={BulletPointIcon} 
                        alt="Bullet" 
                        className="w-4 h-4 mt-0.5 flex-shrink-0" 
                    />
                    <span className="text-white text-[14px] font-normal leading-relaxed">
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
