import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "./Carousel.module.css";

import img1 from "/img/Carousel/CarouselOK1.png";
import img2 from "/img/Carousel/CarouselOK2.png";
import img3 from "/img/Carousel/CarouselOK3.png";
import img4 from "/img/Carousel/CarouselOK4.png";
import img5 from "/img/Carousel/CarouselOK5.png";

const Carousel = () => {
  const images = [img1, img2, img3, img4, img5];

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
