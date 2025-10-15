import React from "react";
import TrustPilot from '../../assets/trustpilot.png';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// Import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

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
    return (
        <div className="w-full mb-0">
            <div className="w-full">
                <Swiper
                    modules={[Pagination, Autoplay, Navigation]}
                    spaceBetween={0}
                    slidesPerView={1.2}
                    centeredSlides={true}
                    pagination={{
                        clickable: true,
                        el: '.custom-pagination-dots',
                        bulletClass: 'custom-bullet',
                        bulletActiveClass: 'custom-bullet-active'
                    }}
                    navigation={{
                        prevEl: '.custom-prev',
                        nextEl: '.custom-next',
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    className="testimonial-swiper"
                >
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide key={index}>
                            <div className="bg-[#031340] rounded-[12px] border border-slate-600/30 px-4 pt-4 pb-4 select-none">
                                <div className="flex items-center mb-1">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-9 h-9 rounded-full mr-4 object-cover"
                                    />
                                    <div className="flex flex-col gap-0">
                                        <div className="text-white font-bold text-base leading-tight">{testimonial.name}</div>
                                        <div className="text-[#99A3C3] text-sm font-medium leading-tight">{testimonial.role}</div>
                                    </div>
                                </div>
                                <div className="flex items-center mb-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <img key={star} src={TrustPilot} alt="TrustPilot" className="w-4 h-4 mr-1 last:mr-0" />
                                    ))}
                                </div>
                                <p className="text-[#edf1fd] text-[12px] font-normal leading-0">"{testimonial.text}"</p>

                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Navigation and Pagination Container */}
                <div className="flex items-center justify-center mt-4 gap-2">
                    <button className="custom-prev w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer">
                        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 12L6 8L10 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    <div className="custom-pagination-dots flex items-center gap-2"></div> 
                    <button className="custom-next w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer">
                        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 4L10 8L6 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>

            <style>{`
                .testimonial-swiper .swiper-slide {
                    opacity: 0.4;
                    transform: scale(0.9);
                    transition: all 0.3s ease;
                }
                
                .testimonial-swiper .swiper-slide-active {
                    opacity: 1;
                    transform: scale(1);
                }
                
                .custom-bullet {
                    width: 8px;
                    height: 8px;
                    background: rgba(255, 255, 255, 0.5);
                    border-radius: 9999px;
                    transition: all 0.3s;
                    display: inline-block;
                    cursor: pointer;
                }
                
                .custom-bullet-active {
                    background: rgba(255, 255, 255, 1);
                }
                
                .custom-prev,
                .custom-next {
                    border: none;
                    outline: none;
                }
                
                .custom-prev.swiper-button-disabled,
                .custom-next.swiper-button-disabled {
                    opacity: 0.3;
                    cursor: not-allowed;
                }
            `}</style>
        </div>
    );
};

export default TestimonialCard;
