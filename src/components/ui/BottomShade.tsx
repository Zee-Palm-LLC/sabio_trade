import React, { useEffect, useState } from 'react';
import BottomShadeImg from '../../assets/bottom_shade.png';

const BottomShade: React.FC = () => {
    const [isNotScrollable, setIsNotScrollable] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScrollability = () => {
            // Check if mobile (viewport width < 768px)
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);

            if (mobile) {
                // Check if page is scrollable
                const isScrollable = document.documentElement.scrollHeight > window.innerHeight;
                setIsNotScrollable(!isScrollable);
            } else {
                setIsNotScrollable(false);
            }
        };

        // Initial check
        checkScrollability();

        // Check on resize
        window.addEventListener('resize', checkScrollability);
        // Check on content changes (with a small delay to allow DOM updates)
        const observer = new MutationObserver(() => {
            setTimeout(checkScrollability, 100);
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
        });

        return () => {
            window.removeEventListener('resize', checkScrollability);
            observer.disconnect();
        };
    }, []);

    // Only show on mobile AND when page is not scrollable
    if (!isMobile || !isNotScrollable) {
        return null;
    }

    return (
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-0">
            <img src={BottomShadeImg} alt="" className="w-full h-auto object-cover" />
        </div>
    );
};

export default BottomShade;

