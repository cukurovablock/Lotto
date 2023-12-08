import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import mobile from "../images/mobile.png"
import image from "../images/image.png"
import image1 from "../images/image1.png"
import image2 from "../images/image2.png"

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


import { Autoplay ,EffectCoverflow, Pagination } from 'swiper/modules';
import GeneralRaffle from './generalRaffle';


function SliderRaffle() {
  return (
    <div id='topJoined' className='mt-24'>
      <h1 className='text-white text-3xl text-center m-4 underline-offset-0'>Top Joined Raffles</h1>  
      <Swiper
        effect={'coverflow'}
        autoplay={{
          delay: 5000, 
        }}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination,Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <GeneralRaffle image={mobile}/>
        </SwiperSlide>
        <SwiperSlide>
          <GeneralRaffle image={image}/>
        </SwiperSlide>
        <SwiperSlide>
        <GeneralRaffle image={image2}/>
        </SwiperSlide>
        <SwiperSlide>
        <GeneralRaffle image={image1}/>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default SliderRaffle
