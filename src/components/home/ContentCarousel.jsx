import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';

import { Pagination, Autoplay, Navigation } from "swiper/modules";

const ContentCarousel = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    hdlGetImage();
  }, []);

  const hdlGetImage = () => {
    axios
      .get("https://picsum.photos/v2/list?page=1&limit=10")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mx-10 mt-10">
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[Pagination, Autoplay]}
        className="mySwiper mb-4 rounded-md"
      >
        {data?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <img
                src={item.download_url}
                className="w-full h-120 object-cover rounded-md cursor-pointer"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>

      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        slidesPerView={5}
        spaceBetween={10}
        pagination={true}
        navigation={true}
        modules={[Pagination, Autoplay, Navigation]}
        className="mySwiper rounded-md"
      >
        {data?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <img
                src={item.download_url}
                className="w-full object-cover rounded-md cursor-pointer"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ContentCarousel;
