import React, { useEffect, useState } from 'react';
import { DNAIconsService, type DNAIconData } from '../../services/dnaIconsService';

interface IconSlotsProps {
    className?: string;
}

const IconSlots: React.FC<IconSlotsProps> = ({ className = '' }) => {
    const [icons, setIcons] = useState<DNAIconData[]>([]);

    // Icon slots correspond to question IDs: 3, 5, 2
    const iconSlotQuestionIds = [3, 5, 2];

    useEffect(() => {
        // Get initial icons
        const updateIcons = () => {
            const storedIcons = DNAIconsService.getDNAIcons();
            setIcons(storedIcons);
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
            {iconSlotQuestionIds.map((questionId) => {
                const iconData = icons.find(icon => icon.questionId === questionId);
                const isEmpty = !iconData;
                const isEarned = !!iconData;
                
                return (
                    <div
                        key={questionId}
                        className={`flex items-center justify-center transition-all duration-500 ${
                            iconData ? 'animate-fade-in' : ''
                        } ${isEarned ? 'animate-icon-glow' : ''}`}
                        style={{
                            width: '40px',
                            height: '40px',
                            background: isEarned 
                                ? 'rgba(255, 255, 255, 0.25)' 
                                : 'rgba(255, 255, 255, 0.08)',
                            border: isEarned
                                ? '2px solid rgba(255, 255, 255, 0.5)'
                                : '2px dashed rgba(255, 255, 255, 0.15)',
                            borderRadius: '50%',
                            backdropFilter: 'blur(8px)',
                            boxShadow: isEarned 
                                ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
                                : 'none',
                            opacity: isEmpty ? 0.4 : 1,
                        }}
                    >
                        {iconData ? (
                            <span 
                                className="text-1xl leading-none animate-pop-in"
                                style={{
                                    filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.5))',
                                    display: 'inline-block',
                                    transform: 'scale(1.15)',
                                }}
                            >
                                {iconData.icon}
                            </span>
                        ) : (
                            <div 
                                style={{
                                    width: '16px',
                                    height: '16px',
                                    borderRadius: '50%',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                }}
                            />
                        )}
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
                
                @keyframes icon-glow {
                    0%, 100% {
                        filter: drop-shadow(0 0 8px rgba(23, 248, 113, 0.6)) drop-shadow(0 0 12px rgba(23, 248, 113, 0.4));
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), 0 0 8px rgba(23, 248, 113, 0.4);
                    }
                    50% {
                        filter: drop-shadow(0 0 12px rgba(23, 248, 113, 0.8)) drop-shadow(0 0 16px rgba(23, 248, 113, 0.6));
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), 0 0 12px rgba(23, 248, 113, 0.6);
                    }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.3s ease-in;
                }
                
                .animate-pop-in {
                    animation: pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
                
                .animate-icon-glow {
                    animation: icon-glow 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default IconSlots;

