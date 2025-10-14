import React, { useRef, useState } from "react";
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

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const touchEndX = e.changedTouches[0].clientX;
        const distance = touchStartX.current - touchEndX;

        if (Math.abs(distance) > minSwipeDistance) {
            if (distance > 0 && currentIndex < testimonials.length - 1) {
                // Swiped left - go to next
                setCurrentIndex(currentIndex + 1);
            } else if (distance < 0 && currentIndex > 0) {
                // Swiped right - go to previous
                setCurrentIndex(currentIndex - 1);
            }
        }
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
        <div className="flex-1 flex items-center justify-center px-0 mb-0">
            <div className="relative w-full max-w-md">
                <div 
                    ref={containerRef}
                    className="w-full max-w-sm bg-[#031340] rounded-[12px] border border-slate-600/30 px-4 pt-4 pb-4 select-none touch-pan-y"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className="flex items-center mb-2">
                        <img
                            src={currentTestimonial.image}
                            alt={currentTestimonial.name}
                            className="w-9 h-9 rounded-full mr-4 object-cover"
                        />
                        <div>
                            <div className="text-white font-bold text-base">{currentTestimonial.name}</div>
                            <div className="text-[#99A3C3] text-sm font-medium">{currentTestimonial.role}</div>
                        </div>
                    </div>
                    <div className="flex items-center mb-2">
                        {[1, 2, 3, 4, 5].map(i => (
                            <img key={i} src={TrustPilot} alt="TrustPilot" className="w-4 h-4 mr-1 last:mr-0" />
                        ))}
                    </div>
                    <div>
                        <p className="text-[#edf1fd] text-[12px] font-normal leading-6">
                            "{currentTestimonial.text}"
                        </p>
                    </div>
                </div>
                
                {/* Dotted Indicators */}
                <div className="flex justify-center mt-4 gap-2">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                index === currentIndex ? 'bg-white/80 w-6' : 'bg-white/20'
                            }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;