import React, { useEffect, useRef, useState } from "react";
import TrustPilot from '../../assets/trustpilot.png';

export interface TestimonialCardProps {
}

interface Testimonial {
    name: string;
    role: string;
    image: string;
    text: string;
}

const testimonials: Testimonial[] = [
    {
        name: "Wade Warren",
        role: "Company CEO",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        text: "I've been consistently impressed with the quality of service provided by this website"
    },
    {
        name: "Jane Cooper",
        role: "Marketing Director",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        text: "The platform has completely transformed how we approach trading. Highly recommended!"
    },
    {
        name: "Robert Fox",
        role: "Investment Manager",
        image: "https://randomuser.me/api/portraits/men/45.jpg",
        text: "Best trading education I've ever experienced. The community support is incredible."
    }
];

const TestimonialCard: React.FC<TestimonialCardProps> = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const touchStartX = useRef<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const minSwipeDistance = 50;

    // Auto-scroll carousel every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                // Loop back to start when reaching the end
                return prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1;
            });
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const touchEndX = e.changedTouches[0].clientX;
        const distance = touchStartX.current - touchEndX;

        if (Math.abs(distance) > minSwipeDistance) {
            if (distance > 0) {
                // Swiped left - go to next (with looping)
                setCurrentIndex((prevIndex) => 
                    prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
                );
            } else if (distance < 0) {
                // Swiped right - go to previous (with looping)
                setCurrentIndex((prevIndex) => 
                    prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
                );
            }
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center px-0 mb-0">
            <div className="relative w-full max-w-md">
                {/* Carousel Container with Overflow Hidden */}
                <div className="relative w-full max-w-sm overflow-hidden">
                    <div 
                        ref={containerRef}
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="w-full flex-shrink-0 bg-[#031340] rounded-[12px] border border-slate-600/30 px-4 pt-4 pb-4 select-none"
                            >
                                <div className="flex items-center mb-2">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-9 h-9 rounded-full mr-4 object-cover"
                                    />
                                    <div>
                                        <div className="text-white font-bold text-base">{testimonial.name}</div>
                                        <div className="text-[#99A3C3] text-sm font-medium">{testimonial.role}</div>
                                    </div>
                                </div>
                                <div className="flex items-center mb-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <img key={star} src={TrustPilot} alt="TrustPilot" className="w-4 h-4 mr-1 last:mr-0" />
                                    ))}
                                </div>
                                <div>
                                    <p className="text-[#edf1fd] text-[12px] font-normal leading-6">
                                        "{testimonial.text}"
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Dotted Indicators */}
                <div className="flex justify-center mt-4 gap-2">
                    {testimonials.map((_, index) => (
                        <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                index === currentIndex ? 'bg-white/80 w-6' : 'bg-white/20'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;