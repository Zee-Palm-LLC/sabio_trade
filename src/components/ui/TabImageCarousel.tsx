import React, { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Iphone1 from "../../assets/iphone_1.png";
import Iphone2 from "../../assets/iphone_2.png";
import Iphone3 from "../../assets/iphone_3.png";
import Iphone4 from "../../assets/iphone_4.png";
import Iphone5 from "../../assets/iphone_5.png";
import Iphone6 from "../../assets/iphone_6.png";
import Iphone7 from "../../assets/iphone_7.png";
import Iphone8 from "../../assets/iphone_8.png";
import Iphone9 from "../../assets/iphone_9.png";
import Tab1 from "../../assets/tab_1.png";
import Tab2 from "../../assets/tab_2.png";
import Tab3 from "../../assets/tab_3.png";
import Tab4 from "../../assets/tab_4.png";
import Tab5 from "../../assets/tab_5.png";
import Tab6 from "../../assets/tab_6.png";

export interface TabImageCarouselProps {
    isPhone?: boolean;
}

const carouselItems = [
    { id: 1, image: Tab6 },
    { id: 2, image: Tab5 },
    { id: 3, image: Tab4 },
    { id: 4, image: Tab3 },
    { id: 5, image: Tab2 },
    { id: 6, image: Tab1 },
];

const mobileCarouselItems = [
    { id: 1, image: Iphone1 },
    { id: 2, image: Iphone2 },
    { id: 3, image: Iphone3 },
    { id: 4, image: Iphone4 },
    { id: 5, image: Iphone5 },
    { id: 6, image: Iphone6 },
    { id: 7, image: Iphone7 },
    { id: 8, image: Iphone8 },
    { id: 9, image: Iphone9 },
]

const TabImageCarousel: React.FC<TabImageCarouselProps> = ({ isPhone = false }) => {
    const swiperRef = useRef<SwiperType | null>(null);

    const handlePrev = () => {
        if (swiperRef.current) swiperRef.current.slidePrev();
    };

    const handleNext = () => {
        if (swiperRef.current) swiperRef.current.slideNext();
    };

    const items = isPhone ? mobileCarouselItems : carouselItems;

    return (
        <div className="w-full mb-0 flex flex-col items-center">
            <div className="w-full max-w-[375px]">
                <Swiper
                    modules={[Pagination, Autoplay, Navigation]}
                    spaceBetween={5}
                    slidesPerView={isPhone ? 2.2 : 1.8}
                    centeredSlides
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                        el: ".custom-pagination-dots-tabs",
                        bulletClass: "custom-bullet-tabs",
                        bulletActiveClass: "custom-bullet-active-tabs",
                    }}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    className={isPhone ? "mobile-image-swiper" : "tab-image-swiper"}
                >
                    {items.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className="tab-carousel-item"
                                style={{
                                    backgroundImage: `url(${item.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Navigation & Pagination */}
                <div className="flex items-center justify-center mt-2 px-8">
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
                        <div className="custom-pagination-dots-tabs flex items-center gap-2" />
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
        /* Container for proper bottom alignment */
        .tab-image-swiper {
          padding-bottom: 0 !important;
          height: 200px !important;
        }

        .tab-image-swiper .swiper-wrapper {
          align-items: flex-end; /* Align items to bottom */
          height: 100%;
        }

        /* Side slides (left and right) */
        .tab-image-swiper .swiper-slide {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          height: 100%;
        }

        .tab-image-swiper .swiper-slide .tab-carousel-item {
          width: 120px;
          height: 165px;
          border-radius: 10.61px;
          opacity: 1;
          transition: all 0.3s ease;
        }

        /* Center slide (active) - Red */
        .tab-image-swiper .swiper-slide-active .tab-carousel-item {
          width: 140px;
          height: 190px;
          border-radius: 12.16px;
          opacity: 1;
        }

        /* Mobile carousel styles */
        .mobile-image-swiper {
          padding-bottom: 0 !important;
          height: 200px !important;
        }

        .mobile-image-swiper .swiper-wrapper {
          align-items: flex-end; /* Align items to bottom */
          height: 100%;
        }

        /* Side slides (left and right) for mobile */
        .mobile-image-swiper .swiper-slide {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          height: 100%;
        }

        .mobile-image-swiper .swiper-slide .tab-carousel-item {
          width: 100px;
          height: 165px;
          border-radius: 10.61px;
          opacity: 1;
          transition: all 0.3s ease;
        }

        /* Center slide (active) for mobile */
        .mobile-image-swiper .swiper-slide-active .tab-carousel-item {
          width: 115px;
          height: 185px;
          border-radius: 12.16px;
          opacity: 1;
        }

        /* Pagination bullets */
        .custom-bullet-tabs {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 9999px;
          transition: all 0.3s;
          display: inline-block;
          cursor: pointer;
        }
        .custom-bullet-active-tabs {
          background: rgba(255, 255, 255, 1);
        }
      `}</style>
        </div>
    );
};

export default TabImageCarousel;

