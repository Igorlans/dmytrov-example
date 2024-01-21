import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import { Autoplay, Navigation } from "swiper";
import Image from "next/image";
import hover1 from "@/public/assets/images/indexslider-img/hover-1.jpg";
import hover3 from "@/public/assets/images/indexslider-img/hover-2.jpg";
import hover2 from "@/public/assets/images/indexslider-img/hover-3.jpg";
import hover4 from "@/public/assets/images/indexslider-img/hover-4.jpg";
import hover5 from "@/public/assets/images/indexslider-img/hover-5.jpg";
import hover6 from "@/public/assets/images/indexslider-img/hover-6.jpg";
import s from './IndexSlider.module.scss';
import { useTranslation } from "next-i18next";
import FullViewImg from "./FullViewImg";


export const IndexSlide = () => {
  const swiperNavPrevRef = useRef(null);
  const swiperNavNextRef = useRef(null);
  const { t } = useTranslation();

  const [currentSlide, setCurrentSlide] = useState<any>(null);
  const [numSlideImg, setNumSlideImg] = useState<any>(null);

  const [fullView, setFullView] = useState<string | null>(null)

  const handleAddMobImg = (imgNum: number) => {

  };

  return (
      <>
      {
        fullView && 
        <FullViewImg src={ fullView } onClick={() => setFullView(null)}/>
      }
        <section className={s.indexslide}>
          {numSlideImg && (
              <div className={s.indexslide__mob_img}>
                <div className={s.indexslide__mob_img_box}>
                  <div
                      className="indexslide__mob-img-close"
                      onClick={() => setNumSlideImg(null)}
                  >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                          d="M13.3259 12L23.7254 1.60046C24.0916 1.23432 24.0916 0.640698 23.7254 0.274605C23.3593 -0.0914881 22.7657 -0.091535 22.3996 0.274605L12 10.6742L1.60046 0.274605C1.23432 -0.091535 0.640698 -0.091535 0.274605 0.274605C-0.0914881 0.640745 -0.091535 1.23437 0.274605 1.60046L10.6741 12L0.274605 22.3996C-0.091535 22.7657 -0.091535 23.3593 0.274605 23.7254C0.457651 23.9085 0.697604 24 0.937557 24C1.17751 24 1.41742 23.9085 1.60051 23.7254L12 13.3259L22.3995 23.7254C22.5826 23.9085 22.8225 24 23.0625 24C23.3024 24 23.5423 23.9085 23.7254 23.7254C24.0916 23.3593 24.0916 22.7657 23.7254 22.3996L13.3259 12Z"
                          fill="#353535"
                      />
                    </svg>
                  </div>
                  <Image
                      quality={100}
                    src={numSlideImg}
                    fill={true}
                    alt="" 
                  />
                </div>
              </div>
          )}
          <div className="container indexslide__container">
            <div className={s.indexslide__wrapper}>
              <Swiper
                  modules={[Autoplay, Navigation]}
                  navigation={{
                    prevEl: swiperNavPrevRef.current,
                    nextEl: swiperNavNextRef.current,
                  }}
                  // autoplay={{
                  //   delay: 15000,
                  //   disableOnInteraction: false,
                  // }}

                  onSwiper={(swiper) => {
                    // Delay execution for the refs to be defined
                    setTimeout(() => {
                      // Override prevEl & nextEl now that refs are defined

                      // @ts-ignore
                      swiper.params.navigation.prevEl = swiperNavPrevRef.current
                      // @ts-ignore
                      swiper.params.navigation.nextEl = swiperNavNextRef.current

                      // Re-init navigation
                      swiper.navigation.destroy()
                      swiper.navigation.init()
                      swiper.navigation.update()
                    })
                  }}
                  speed={500}
                  slidesPerView={1}
                  onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
              >
                
                <SwiperSlide>
                  <div className={s.indexslide__slide}>
                    <div className="indexslide__slide-area">
                    <Image
                          className="indexslide__slide-area-img"
                          src={'/assets/images/indexslider-img/bg.jpeg'}
                          width={764}
                          height={594}
                          style={{ objectFit: "cover", marginTop: "0px", marginBottom: "0px" }}
                          alt="slider slide"
                      />
                      <div className="indexslide__slide-area-box indexslide__slide-area-box-1">
                        <div className="indexslide__slide-area-item"></div>
                        <Image
                          src={'/assets/images/indexslider-img/hover-1.jpg'}
                          width={455}
                          height={250}
                          alt="" 
                        />
                      </div>
                      <div className="indexslide__slide-area-box indexslide__slide-area-box-2">
                        <div className="indexslide__slide-area-item"></div>
                        <Image
                          src={'/assets/images/indexslider-img/hover-2.jpg'}
                          width={455}
                          height={250}
                          alt="" 
                        />
                      </div>
                      <div className="indexslide__slide-area-box indexslide__slide-area-box-3">
                        <div className="indexslide__slide-area-item"></div>
                        <Image 
                          src={'/assets/images/indexslider-img/hover-3.jpg'}
                          width={455}
                          height={250} 
                          alt="" 
                        />
                      </div>
                      <div className="indexslide__slide-area-box indexslide__slide-area-box-4">
                        <div className="indexslide__slide-area-item"></div>
                        <Image 
                          src={'/assets/images/indexslider-img/hover-4.jpg'}
                          width={455}
                          height={250}
                          alt="" 
                        />
                      </div>
                      <div className="newImage">
                        <div className="indexslide__slide-area-item"></div>
                        <Image 
                          src={'/assets/images/indexslider-img/hover-4.jpg'}
                          width={455}
                          height={250}
                          alt="" 
                        />
                      </div>
                      <div className="indexslide__slide-area-box indexslide__slide-area-box-5">
                        <div className="indexslide__slide-area-item"></div>
                        <Image 
                          src={'/assets/images/indexslider-img/hover-5.jpg'}
                          width={455}
                          height={250}
                          alt="" 
                        />
                      </div>
                    </div>
                    <div className={s.indexslide__slide_box}>
                      <h2 className="indexslide__slide-subtitle">

                        {t("main:sliderName")}

                      </h2>
                      <h3 className="indexslide__slide-title">{ t("main:sliderSlide1Title") }</h3>
                      <p className="indexslide__slide-text" style={{minHeight: "110px"}}>

                        { t("main:sliderSlide1Descr") }
                        
                      </p>

                      <div className="indexslide__slide-area-mob">
                        <Image src={'/assets/images/indexslider-img/bg.jpeg'} alt="" width={397} height={364}/>

                        <div className="indexslide__slide-area-box indexslide__slide-area-box-1"
                          onClick={() => setFullView("/assets/images/indexslider-img/hover-1.jpg")}
                        >
                        <div className="indexslide__slide-area-item"></div>

                      </div>
                      <div className="indexslide__slide-area-box indexslide__slide-area-box-2"
                        onClick={() => setFullView("/assets/images/indexslider-img/hover-2.jpg")}
                      >
                        <div className="indexslide__slide-area-item"></div>
                      </div>
                      <div className="indexslide__slide-area-box indexslide__slide-area-box-3"
                        onClick={() => setFullView("/assets/images/indexslider-img/hover-3.jpg")}
                      >
                        <div className="indexslide__slide-area-item"></div>
                      </div>
                      <div className="indexslide__slide-area-box indexslide__slide-area-box-4"
                        onClick={() => setFullView("/assets/images/indexslider-img/hover-4.jpg")}
                      >
                        <div className="indexslide__slide-area-item"></div>
                      </div>
                      <div className="indexslide__slide-area-box newPoint"
                        onClick={() => setFullView("/assets/images/indexslider-img/hover-4.jpg")}
                      >
                        <div className="indexslide__slide-area-item"></div>
                      </div>
                      <div className="indexslide__slide-area-box indexslide__slide-area-box-4"
                        onClick={() => setFullView("/assets/images/indexslider-img/hover-5.jpg")}
                      >
                        <div className="indexslide__slide-area-item"></div>
                      </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className={s.indexslide__slide}>
                    {/* s.indexslide__slide */}
                    <div className="indexslide__slide-area">
                      <Image
                          className="indexslide__slide-area-img"
                          src={'/assets/images/indexslider-img/bg2.jpeg'}
                          width={764}
                          height={594}
                          style={{ objectFit: "cover", marginTop: "0px", marginBottom: "0px" }}
                          alt="slider slide"
                      />
                      <div className="indexslide__slide-area-box indexslide__slide-area-box-6">
                        <div className="indexslide__slide-area-item"></div>
                        <Image 
                          src={'/assets/images/indexslider-img/hover-6.jpg'}
                          width={455}
                          height={340}
                          alt="" 
                        />
                      </div>
                    </div>
                    <div className={s.indexslide__slide_box}>
                      <h2 className={s.indexslide__slide_subtitle}>
                        { t("main:sliderName") }
                      </h2>
                      <h3 className="indexslide__slide-title">

                        { t("main:sliderSlide2Title") }

                      </h3>
                      <p className="indexslide__slide-text">

                        { t("main:sliderSlide2Descr") }

                      </p>
                      <div
                          className="indexslide__slide-area-mob"
                      >
                        <Image src={'/assets/images/indexslider-img/bg2.jpeg'} alt="" width={397} height={364} />
                        <div className="indexslide__slide-area-box indexslide__slide-area-box-6" style={{top: 100}}
                          onClick={() => setFullView("/assets/images/indexslider-img/hover-6.jpg")}
                        >
                        <div className="indexslide__slide-area-item"></div>
                      </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className={s.indexslide__slide}>
                    <div className="indexslide__slide-area">
                      <Image
                          className="indexslide__slide-area-img"
                          src={'/assets/images/indexslider-img/bg3.jpeg'}
                          width={764}
                          height={600}
                          style={{ objectFit: "cover", marginTop: "0px", marginBottom: "0px" }}
                          alt="slider slide"
                      />
                      <div className="indexslide__slide-area-box indexslide__slide-area-box-7">
                        <div className="indexslide__slide-area-item"></div>
                        <Image 
                          src={'/assets/images/indexslider-img/hover-7.jpg'}
                          width={475}
                          height={327}
                          alt="" 
                        />
                      </div>
                    </div>
                    <div className={s.indexslide__slide_box}>
                      <h2 className="indexslide__slide-subtitle">

                        { t("main:sliderName") }

                      </h2>
                      <h3 className="indexslide__slide-title">

                        { t("main:sliderSlide3Title") }

                      </h3>
                      <p className="indexslide__slide-text">

                        { t("main:sliderSlide3Descr")}

                      </p>
                      <div
                          className="indexslide__slide-area-mob"
                      >
                        <Image src={'/assets/images/indexslider-img/bg3.jpeg'} alt="" width={397} height={364}/>
                      <div className="indexslide__slide-area-box indexslide__slide-area-box-7"
                        onClick={() => setFullView("/assets/images/indexslider-img/hover-7.jpg")}
                      >
                        <div className="indexslide__slide-area-item"></div>
                      </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className={s.indexslide__slide}>
                    <div className="indexslide__slide-area">
                      <Image
                          className="indexslide__slide-area-img"
                          src={'/assets/images/indexslider-img/bg4.jpg'}
                          width={764}
                          height={594}
                          style={{ objectFit: "cover", marginTop: "0px", marginBottom: "0px" }}
                          alt="slider slide"
                      />
                    </div>
                    <div className={s.indexslide__slide_box}>
                      <h2 className="indexslide__slide-subtitle">

                        { t("main:sliderName")}

                      </h2>
                      <h3 className="indexslide__slide-title">

                        { t("main:sliderSlide4Title") }

                      </h3>
                      <p className="indexslide__slide-text">

                        { t("main:sliderSlide4Descr")}

                      </p>
                      <div className="indexslide__slide-area-mob">
                        <Image 
                          src={'/assets/images/indexslider-img/bg4.jpg'} 
                          width={455}
                          height={364}
                          alt="" 
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

              </Swiper>
              <div className="indexslide__bar">
                <div className="indexslide__bar-count">
                  <div className="indexslide__bar-count-num indexslide__bar-count-target">
                    {currentSlide >= 10
                        ? currentSlide + 1
                        : `0${currentSlide + 1}`}
                  </div>
                  <div className="indexslide__bar-count-num indexslide__bar-count-all">
                    /04
                  </div>
                </div>
                <div className="indexslide__bar-arrows">
                  <div
                      className="indexslide__bar-arrow indexslide__bar-arrow-prev"
                      ref={swiperNavPrevRef}
                  >
                    <svg
                        width="38"
                        height="30"
                        viewBox="0 0 38 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                          d="M15.466 29.2471L16.9407 27.5789L3.96966 16.1129L38 16.1129L38 13.8863L3.96966 13.8863L16.9407 2.42033L15.466 0.752113L2.51879e-06 14.4236L2.6195e-06 15.5756L15.466 29.2471Z"
                          fill="white"
                      />
                    </svg>
                  </div>
                  <div
                      className="indexslide__bar-arrow indexslide__bar-arrow-next"
                      ref={swiperNavNextRef}
                  >
                    <svg
                        width="38"
                        height="30"
                        viewBox="0 0 38 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                          d="M22.534 0.75293L21.0593 2.42115L34.0303 13.8871H0V16.1137H34.0303L21.0593 27.5797L22.534 29.2479L38 15.5764V14.4244L22.534 0.75293Z"
                          fill="white"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
  );
};
