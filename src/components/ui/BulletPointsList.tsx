import React from 'react';

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
        <ul className={`${className} list-none m-0`}>
            {items.map((item) => (
                <li key={item.id} className="flex items-start space-x-3 mb-3 last:mb-0">
                    <div
                        className="w-4 h-4 mt-0.5 flex-shrink-0 rounded-full"
                        style={{
                            backgroundColor: `rgba(255, 255, 255, var(--opacity-60))`,
                            width: '16px',
                            height: '16px'
                        }}
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
                            <span style={{ color: `rgba(255,255,255, var(--opacity-60))` }}>{item.text}</span>
                        )}
                    </span>
                </li>
            ))}
        </ul>
    );
};

export default BulletPointsList;
