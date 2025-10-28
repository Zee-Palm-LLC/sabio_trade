import React, { useEffect, useRef, useState } from "react";
import SaveIcon from '../../assets/copy.svg';
import GiftIcon from '../../assets/gift.png';
import SabioIcon from '../../assets/sabio_icon.svg';

interface TicketScratchCardProps {
    onScratchComplete?: () => void;
}

const TicketScratchCard: React.FC<TicketScratchCardProps> = ({ onScratchComplete }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [scratched, setScratched] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopyCode = () => {
        navigator.clipboard.writeText('TRADENOW');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = 156;
        canvas.height = 212;

        ctx.fillStyle = "#28BDA8";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.globalCompositeOperation = "destination-out";
        let isDrawing = false;

        const start = (e: MouseEvent | TouchEvent) => {
            e.preventDefault();
            isDrawing = true;
            draw(e);
        };

        const stop = () => (isDrawing = false);

        const draw = (e: MouseEvent | TouchEvent) => {
            if (!isDrawing) return;
            e.preventDefault();
            const rect = canvas.getBoundingClientRect();
            const pos = "touches" in e ? e.touches[0] : e;
            const x = pos.clientX - rect.left;
            const y = pos.clientY - rect.top;
            ctx.beginPath();
            ctx.arc(x, y, 25, 0, Math.PI * 2); // brush size = 25px
            ctx.fill();

            // Check if scratching is complete
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data;
            let transparentPixels = 0;

            for (let i = 3; i < pixels.length; i += 4) {
                if (pixels[i] === 0) transparentPixels++;
            }

            const percentage = (transparentPixels / (canvas.width * canvas.height)) * 100;

            if (percentage > 80 && !scratched) {
                setScratched(true);
                onScratchComplete?.();
            }
        };

        // Mouse events
        canvas.addEventListener("mousedown", start);
        canvas.addEventListener("mouseup", stop);
        canvas.addEventListener("mousemove", draw);

        // Touch events (with passive: false to allow preventDefault)
        canvas.addEventListener("touchstart", start, { passive: false });
        canvas.addEventListener("touchend", stop);
        canvas.addEventListener("touchmove", draw, { passive: false });

        return () => {
            canvas.removeEventListener("mousedown", start);
            canvas.removeEventListener("mouseup", stop);
            canvas.removeEventListener("mousemove", draw);
            canvas.removeEventListener("touchstart", start);
            canvas.removeEventListener("touchend", stop);
            canvas.removeEventListener("touchmove", draw);
        };
    }, []);

    return (
        <div className="flex flex-col items-center mt-8 mb-4">
            <div className="relative w-[156px] h-[212px]">
                {/* SVG ticket border */}
                <svg
                    viewBox="0 0 156 212"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0 left-0 w-full h-full"
                >
                    <path
                        d="
                  M0,16
                  a16,16 0 0,1 16,-16
                  h124
                  a16,16 0 0,1 16,16
                  v68
                  a16,16 0 1,0 0,32
                  v68
                  a16,16 0 0,1 -16,16
                  h-124
                  a16,16 0 0,1 -16,-16
                  v-68
                  a16,16 0 1,0 0,-32
                  z
                "
                        fill="#28BDA8"
                    />
                </svg>

                {/* Content underneath - White background */}
                <div className="absolute inset-0 flex items-center justify-center bg-white rounded-lg"
                    style={{ clipPath: 'path("M0,16 a16,16 0 0,1 16,-16 h124 a16,16 0 0,1 16,16 v68 a16,16 0 1,0 0,32 v68 a16,16 0 0,1 -16,16 h-124 a16,16 0 0,1 -16,-16 v-68 a16,16 0 1,0 0,-32 z")' }}>
                    <div className="text-center p-4">
                        {/* Logo */}
                        <div className="mb-2">
                            <img src={SabioIcon} alt="Sabio Icon" className="w-12 h-12 mx-auto" />
                        </div>

                        {/* Discount Text */}
                        <div className="mb-2">
                            <h2 className="text-gray-800 font-medium text-[18px] leading-tight">You get 43% off</h2>
                        </div>

                        {/* Discount Code Button */}
                        <button 
                            onClick={handleCopyCode}
                            className="bg-green-100 border-2 border-dashed border-green-300 rounded-lg px-2 py-1 flex items-center space-x-2 mx-auto hover:bg-green-200 transition-colors"
                        >
                            <span className="text-green-700 text-[14px] font-bold">{copied ? 'COPIED!' : 'TRADENOW'}</span>
                            <img src={SaveIcon} alt="Save Icon" className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Scratch canvas */}
                {!scratched && (
                    <canvas
                        ref={canvasRef}
                        width={156}
                        height={212}
                        className="absolute inset-0 cursor-pointer"
                        style={{ 
                            clipPath: 'path("M0,16 a16,16 0 0,1 16,-16 h124 a16,16 0 0,1 16,16 v68 a16,16 0 1,0 0,32 v68 a16,16 0 0,1 -16,16 h-124 a16,16 0 0,1 -16,-16 v-68 a16,16 0 1,0 0,-32 z")'
                        }}
                    />
                )}

                {/* Circular div for gift icon - only show when not scratched, behind canvas */}
                {!scratched && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-black rounded-full flex items-center justify-center z-0">
                        <img src={GiftIcon} alt="Gift Icon" className="w-10 h-10" />
                    </div>
                )}
            </div>

            {/* Text below ticket - only show when not scratched */}
            {!scratched && (
                <div className="flex items-center mt-4 space-x-2">
                    <span className="text-2xl">👆</span>
                    <span className="text-white text-lg">Scratch the card</span>
                </div>
            )}

        </div>
    );
};

export default TicketScratchCard;
