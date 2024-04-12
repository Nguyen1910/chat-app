import { useEffect, useState } from "react";
import { useAppContext } from "../../../Context/AppProvider";
import { Swiper, SwiperSlide } from "swiper/react";
import "./lightBox.scss";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import ModalFullScreen from "../ModalFullScreen";

const LightBox = () => {
  const { imageList, indexImg, visibleModal, setVisibleModal } =
    useAppContext();
  const [thumbsSwiper, setThumbsSwiper] = useState<any>();

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.keyCode === 27) {
        setVisibleModal(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {visibleModal && (
        <ModalFullScreen>
          <button
            className="absolute top-5 right-8 w-8 h-8 bg-gray-800 rounded-full hover:opacity-75 cursor-pointer z-[2]"
            onClick={() => setVisibleModal(false)}
          >
            X
          </button>
          <Swiper
            spaceBetween={200}
            navigation={true}
            initialSlide={indexImg}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="lightBoxLg"
          >
            {imageList.map((image: any, index: number) => (
              <SwiperSlide key={index}>
                <img src={image} className="" />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={15}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="lightBoxThumb"
          >
            {imageList.map((image: any, index: number) => (
              <SwiperSlide key={index}>
                <img src={image} className="" />
              </SwiperSlide>
            ))}
          </Swiper>
        </ModalFullScreen>
      )}
    </>
  );
};

export default LightBox;
