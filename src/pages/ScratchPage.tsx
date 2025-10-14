import React, { useEffect, useRef, useState } from 'react';
import amdIcon from '../assets/amd.svg';
import Logo from '../assets/logo.png';
import ArrowUpIcon from '../assets/up.svg';
import { Card, ScratchTicket } from '../components';

const ScratchPage: React.FC = () => {
    const [isScratched, setIsScratched] = useState(false);
    const [scratchPercentage, setScratchPercentage] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isScratching = useRef(false);

    const handleScratch = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (isScratched) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();

        // Calculate scratched percentage
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        let transparentPixels = 0;

        for (let i = 3; i < pixels.length; i += 4) {
            if (pixels[i] === 0) transparentPixels++;
        }

        const percentage = (transparentPixels / (canvas.width * canvas.height)) * 100;
        setScratchPercentage(percentage);

        if (percentage > 30) {
            setIsScratched(true);
        }
    };

    const handleMouseDown = () => {
        isScratching.current = true;
    };

    const handleMouseUp = () => {
        isScratching.current = false;
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (isScratching.current) {
            handleScratch(e);
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        canvas.width = 200;
        canvas.height = 200;

        // Fill with silver color
        ctx.fillStyle = '#C0C0C0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add some texture
        ctx.fillStyle = '#A0A0A0';
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            ctx.fillRect(x, y, 2, 2);
        }
    }, []);

    return (
        <div className="min-h-screen text-white" style={{ background: 'var(--bg-gradient)' }}>
            <div className="w-[375px] mx-auto min-h-screen flex flex-col px-4">
                <div className="flex flex-col items-center pt-8 pb-4">
                    <div className="flex items-center space-x-3 mb-3">
                        <img src={Logo} alt="SabioTrade" className=" h-14" />
                    </div>
                </div>
                <Card
                    className={`w-full max-w-sm bg-[#340863] rounded-[12px] border border-[#7D31D87A] shadow-[0_0_12px_0_rgba(125,49,216,0.47)]`}
                >
                    <h2 className="text-white font-semibold text-lg leading-tight text-center">
                        Lock in your early access savings
                    </h2>
                    <div className="text-center mb-4">
                        <p className="text-green-400 text-sm font-medium mb-3">
                            "Your offer expires in 2 days"
                        </p>
                        <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                            <div className="bg-green-400 h-2 rounded-full" style={{ width: '68%' }}></div>
                        </div>

                        <p className="text-white/70 text-[12px]">
                            Early access savings 68% of spots already taken.
                        </p>
                    </div>
                    <div className="w-full max-w-sm bg-[#031340] rounded-[12px] border border-slate-600/30 px-4 pt-4 pb-4">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
                                    <img src={amdIcon} alt="AMD" className="w-4 h-4" />
                                </div>
                                <span className="text-[18px] font-bold" style={{ color: 'var(--color-primary)' }}>+2.5%</span>
                                <img src={ArrowUpIcon} alt="Arrow Up" className="w-4 h-4" />
                            </div>
                            <span className="text-white/70 text-sm">2 days ago</span>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-start space-x-2">
                                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-white/50 text-[12px]">
                                    Partnership announcements with major tech players sparked investor confidence.
                                </p>
                            </div>
                            <div className="flex items-start space-x-2">
                                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-white/50 text-[12px]">
                                    Rise as analysts upgraded the stock strong quarterly results.
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>
                <span className="text-white text-[17px] font-bold block text-center mt-6">
                    Eventually you'll be ready to spot those events. Passing the challenge will grant you a unique opportunity to trade with our funds!
                </span>

                {/* Scratch Card Section */}
                <ScratchTicket />

            </div>
        </div>
    );
};

export default ScratchPage;