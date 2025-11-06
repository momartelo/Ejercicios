import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "./Carousel.module.css";

const Carousel = () => {
  const images = [
    "../../../public/img/Carousel/CarouselOK1.png",
    "../../../public/img/Carousel/CarouselOK2.png",
    "../../../public/img/Carousel/CarouselOK3.png",
    "../../../public/img/Carousel/CarouselOK4.png",
    "../../../public/img/Carousel/CarouselOK5.png",
  ];

  return (
    <div className={styles.carouselContainer}>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className={styles.swiperContainer}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className={styles.image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
