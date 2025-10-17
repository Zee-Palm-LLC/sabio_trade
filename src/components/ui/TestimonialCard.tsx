import React, { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import TrustPilot from "../../assets/trustpilot.png";

export interface TestimonialCardProps { }

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
        text: "I've been consistently impressed with the quality of service provided by this website.",
    },
    {
        name: "Jane Cooper",
        role: "Marketing Director",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        text: "The platform has completely transformed how we approach trading. Highly recommended!",
    },
    {
        name: "Robert Fox",
        role: "Investment Manager",
        image: "https://randomuser.me/api/portraits/men/45.jpg",
        text: "Best trading education I've ever experienced. The community support is incredible.",
    },
    {
        name: "Emily Johnson",
        role: "Retail Trader",
        image: "https://randomuser.me/api/portraits/women/65.jpg",
        text: "User-friendly interface and insightful analytics. It made trading enjoyable and profitable for me.",
    },
    {
        name: "Michael Smith",
        role: "Financial Analyst",
        image: "https://randomuser.me/api/portraits/men/53.jpg",
        text: "Their cutting-edge tools keep me ahead of the market. Support is always available and helpful.",
    },
];

const TestimonialCard: React.FC<TestimonialCardProps> = () => {
    const swiperRef = useRef<SwiperType | null>(null);

    const handlePrev = () => {
        if (swiperRef.current) swiperRef.current.slidePrev();
    };

    const handleNext = () => {
        if (swiperRef.current) swiperRef.current.slideNext();
    };

    return (
        <div className="w-full mb-0 flex flex-col items-center">
            <div className="w-full max-w-[375px]">
                <Swiper
                    modules={[Pagination, Autoplay, Navigation]}
                    spaceBetween={0}
                    slidesPerView={1.3}
                    centeredSlides
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                        el: ".custom-pagination-dots",
                        bulletClass: "custom-bullet",
                        bulletActiveClass: "custom-bullet-active",
                    }}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    className="testimonial-swiper"
                >
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide key={index}>
                            <div className="bg-[#031340] rounded-[12px] border px-4 pt-4 pb-4 select-none" style={{ border: "1px solid #FFFFFF66" }}>
                                <div className="flex items-center mb-1">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-9 h-9 rounded-full mr-4 object-cover"
                                    />
                                    <div className="flex flex-col gap-0">
                                        <div className="text-white font-bold text-base leading-tight">
                                            {testimonial.name}
                                        </div>
                                        <div className="text-[#99A3C3] text-sm font-medium leading-tight">
                                            {testimonial.role}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center mb-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <img
                                            key={star}
                                            src={TrustPilot}
                                            alt="TrustPilot"
                                            className="w-4 h-4 mr-1 last:mr-0"
                                        />
                                    ))}
                                </div>
                                <p className="text-[#edf1fd] text-[13px] font-normal">
                                    "{testimonial.text}"
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Navigation & Pagination */}
                <div className="flex items-center justify-center mt-4 px-8">
                    <button
                        onClick={handlePrev}
                        className="custom-prev w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10 12L6 8L10 4"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <div className="flex justify-center gap-1">
                        <div className="custom-pagination-dots flex items-center gap-2" />
                    </div>
                    <button
                        onClick={handleNext}
                        className="custom-next w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6 4L10 8L6 12"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
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
      `}</style>
        </div>
    );
};

export default TestimonialCard;
