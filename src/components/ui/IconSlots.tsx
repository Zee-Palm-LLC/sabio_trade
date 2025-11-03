import React, { useEffect, useState } from 'react';
import { DNAIconsService, type DNAIconData } from '../../services/dnaIconsService';

interface IconSlotsProps {
    className?: string;
}

const IconSlots: React.FC<IconSlotsProps> = ({ className = '' }) => {
    const [icons, setIcons] = useState<DNAIconData[]>([]);

    useEffect(() => {
        // Get initial icons
        const updateIcons = () => {
            const storedIcons = DNAIconsService.getDNAIcons();
            // Only show the first 3 icons (max slots) - they fill in order as earned
            setIcons(storedIcons.slice(0, 3));
        };

        updateIcons();

        // Subscribe to icon changes to update in real-time
        const unsubscribe = DNAIconsService.subscribeToChanges(() => {
            updateIcons();
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div className={`flex justify-center items-center gap-2 ${className}`}>
            {[0, 1, 2].map((index) => {
                const iconData = icons[index];
                const isEmpty = !iconData;
                
                return (
                    <div
                        key={index}
                        className={`flex items-center justify-center transition-all duration-500 ${
                            iconData ? 'animate-fade-in' : ''
                        }`}
                        style={{
                            width: '40px',
                            height: '40px',
                            background: iconData 
                                ? 'rgba(255, 255, 255, 0.2)' 
                                : 'rgba(255, 255, 255, 0.08)',
                            border: iconData
                                ? '2px solid rgba(255, 255, 255, 0.4)'
                                : '2px dashed rgba(255, 255, 255, 0.15)',
                            borderRadius: '50%',
                            backdropFilter: 'blur(8px)',
                            boxShadow: iconData ? '0 4px 12px rgba(0, 0, 0, 0.3)' : 'none',
                            opacity: isEmpty ? 0.6 : 1,
                        }}
                    >
                        {iconData ? (
                            <span 
                                className="text-2xl leading-none animate-pop-in"
                                style={{
                                    filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.5))',
                                    display: 'inline-block',
                                    transform: 'scale(1.15)',
                                }}
                            >
                                {iconData.icon}
                            </span>
                        ) : null}
                    </div>
                );
            })}
            <style>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                
                @keyframes pop-in {
                    0% {
                        transform: scale(0.5) scale(1.15);
                        opacity: 0;
                    }
                    50% {
                        transform: scale(1.2) scale(1.15);
                    }
                    100% {
                        transform: scale(1) scale(1.15);
                        opacity: 1;
                    }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.3s ease-in;
                }
                
                .animate-pop-in {
                    animation: pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
            `}</style>
        </div>
    );
};

export default IconSlots;

