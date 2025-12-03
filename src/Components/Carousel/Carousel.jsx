import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../styles/swiper-overrides.css";

import styles from "./Carousel.module.css";

import img1 from "/img/Carousel/CarouselOK1400.png";
import img2 from "/img/Carousel/CarouselOK2400.png";
import img3 from "/img/Carousel/CarouselOK3400.png";
import img4 from "/img/Carousel/CarouselOK4400.png";
import img5 from "/img/Carousel/CarouselOK5400.png";

import mob1 from "/img/Carousel/CarouselOK1lm.png";
import mob2 from "/img/Carousel/CarouselOK2lm.png";
import mob3 from "/img/Carousel/CarouselOK3lm.png";
import mob4 from "/img/Carousel/CarouselOK4lm.png";
import mob5 from "/img/Carousel/CarouselOK5lm.png";

const Carousel = () => {
  const imagesDesktop = [img1, img2, img3, img4, img5];
  const imagesMobile = [mob1, mob2, mob3, mob4, mob5];

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
        {imagesDesktop.map((src, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            <picture>
              <source srcSet={imagesMobile[index]} media="(max-width: 500px)" />
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className={styles.image}
              />
            </picture>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
