import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import { SwiperSlide, Swiper } from 'swiper/react';
import { useEffect, useState } from 'react';
import tailwindConfig from 'tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';
import { resize } from 'utils/variables';
import { useForm } from "react-hook-form";
import { API_URL, ARG_POPULATE_DEEP, SERVER_HOST_URL } from "utils/constants";
import axios from "axios";
import { getServerImageUrl } from "utils/functions";


// Images
import bgImage1 from '@images/bg_image_1.png';


export default function Home({ data }) {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (data) {
      setIsDataLoaded(true);
      console.log(data);
    }
  }, []);

  const fullConfig = resolveConfig(tailwindConfig)

  const [slides, setSlides] = useState(data.heroSlides.map((sl) => ({
    image: sl.backgroundImage ? `${SERVER_HOST_URL}${sl.backgroundImage.data.attributes.url}` : '',
    heading1: sl.headingOne,
    heading2: sl.headingTwo,
    buttonName: sl.buttonText,
    slideStyle: {
      backgroundColor: fullConfig.theme.colors.gray[100]
    }
  })));
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState(null);

  return (
    <div className={`mainContainer ${styles.Home}`}>

      <Head>
        <title>Home - Comptek</title>
      </Head>

      {/* Swiper */}
      <div className={styles.Swiper}>
        <Swiper
          className="h-full"
          slidesPerView={1}
          onSlideChange={() => setActiveIndex(swiper.activeIndex)}
          onSwiper={(swiper) => { setSwiper(swiper); }}
          longSwipesMs={100}
        > {
            slides.map((slide, i) => <SwiperSlide key={i} style={slide.slideStyle} className={styles.Slide}>
              <div className={styles.Bg}>
                <Image loading="lazy" layout="fill" src={slide.image} objectFit="contain" />
              </div>
              <div className='midContainer h-full flex flex-col justify-center'>
                <h1 className="text-gray-600">{slide.heading1}</h1>
                <h1 className="text-brand">{slide.heading2}</h1>
                <button className="buttonOne flex justify-between mt-4 mb-10" style={{ width: '200px' }}>{slide.buttonName} <span className="mdi mdi-chevron-double-right"></span></button>
              </div>
            </SwiperSlide>)
          }
        </Swiper>
        <div className="midContainer absolute flex z-10" style={{ bottom: resize(120, 'carouselHeight') }}>
          {slides.map((slide, i) => <div key={i} onClick={() => swiper.slideTo(i)} className={`${styles.PageDot} ${activeIndex == i ? styles.active : ''}`}></div>)}
        </div>
      </div>

      {/* Section 01 */}
      <div className={styles.Section01}>
        <div className="midContainer flex justify-between items-center">
          <div className="flex scale-90 origin-top-left relative" style={{ top: '-80px', maxHeight: '250px' }}>
            {data.productCategories.map((pc, i) => <div key={i} className={styles.Product}>
              <div className={styles.ProductImage}>
                <Image width={250} height={250} src={getServerImageUrl(pc.productImage.data.attributes.url)} objectFit="contain" />
              </div>
              <h5>{pc.categoryName}</h5>
            </div>)}
          </div>
          <div>
            <div className="sectionCount">
              <span className="sectionNumber text-gray-300">01</span>
              <h2 className="text-brand/80">{data.SectionOneTitle}</h2>
            </div>
            <button className="buttonTwo mx-auto relative block my-3">View more <span className="mdi mdi-chevron-double-right"></span></button>
          </div>
        </div>
      </div>

      {/* Section 02 */}
      <div className={styles.Section02}>
        <div className="midContainer flex justify-center items-center flex-col">
          <div className="sectionCount my-6">
            <span className="sectionNumber text-white/30">02</span>
            <h2 className="text-white">{data.SectionTwoTitle}</h2>
          </div>
          <div className="flex justify-center items-center flex-wrap">
            {data.features.map((f, i) => <div key={`feature${i}`} className={styles.FeatureBox}>
              <div className="col-span-6">
                <h3>{f.featureTitle}</h3>
                <span className={styles.FeatureDot}></span>
                <span className={styles.FeatureDot}></span>
              </div>
              <div className="col-span-6">
                {f.featureList.split(';').map((fl, j) => <li key={`featureList${j}`}>{fl.trim()}</li>)}
              </div>
              <div className="col-span-6">
                <button className="buttonOne">{f.buttonText} <span className="mdi mdi-chevron-double-right"></span></button>
              </div>
              <span className={styles.FeatureWatermark}>{f.featureTitle}</span>
            </div>)}
          </div>
        </div>
        <div className={styles.FeatureBg}>
          <Image src={bgImage1} layout="responsive" objectFit="contain" />
        </div>
      </div>

      {/* Section 03 */}
      <div className={styles.Section03}>
        <div className="mainContainer flex justify-center items-center flex-col bg-gray-100">
          <div className="sectionCount my-6">
            <span className="sectionNumber text-gray-600/30">03</span>
            <h2 className="text-gray-600">{data.SectionThreeTitle}</h2>
          </div>
        </div>
        <div className="midContainer  py-10">
          {data.services.map((service, i) => <div key={`service${i}`} className={`grid grid-cols-12 w-full`}>
            <div className={`col-span-6 flex my-3 ${i % 2 == 1 ? 'justify-start' : 'justify-end'}`}>
              <Image src={getServerImageUrl(service.serviceImage.data.attributes.url)} width={400} height={290} objectFit="cover" />
            </div>
            <div className={`col-span-6 flex flex-col justify-center p-8 ${i % 2 == 1 ? '-order-1 items-end' : ''}`}>
              <div className="flex flex-col">
                <h6 className="text-brand mb-1 ml-4">{service.serviceTitle}</h6>
                <small className="text-gray-700 ml-4">{service.serviceCaption}</small>
                <button className="buttonOne mt-8">{service.buttonText} <span className="mdi mdi-chevron-double-right"></span></button>
              </div>
            </div>
          </div>)}
        </div>
      </div>

      {/* Section 04 */}
      <div className={styles.Section04}>
        <div className="contentContainer py-6">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <div className="sectionCount mb-3 w-max">
                <span className="sectionNumber text-white/30">04</span>
                <h2 className="text-white">{data.SectionFourTitle}</h2>
              </div>
              <small className="text-white">Write to us if you want to talk about how we can work with you or your company.</small>
            </div>
            <div className="col-span-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-6">
                    <input type="text" autoComplete="off" placeholder="Fullname" {...register("fullname", { required: true })} />
                  </div>
                  <div className="col-span-6">
                    <select autoComplete="off" placeholder="Product" {...register("product", { required: true })} >
                      <option default value="1">Product</option>
                    </select>
                  </div>
                  <div className="col-span-6">
                    <input type="email" autoComplete="off" placeholder="Email" {...register("email", { required: true })} />
                  </div>
                  <div className="col-span-6">
                    <input type="text" autoComplete="off" placeholder="Phone" {...register("phone", { required: true })} />
                  </div>
                  <div className="col-span-12">
                    <textarea rows={4} autoComplete="off" placeholder="Message" {...register("message", { required: true })} ></textarea>
                  </div>
                </div>
                <div className="buttons py-6">
                  <button className="buttonThree relative ml-auto w-max block" type="submit">Send Message <span className="mdi mdi-chevron-double-right"></span></button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className={styles.ContactBg}>
          <Image src={bgImage1} layout="fill" objectFit="cover" />
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps(context) {
  const { data } = await axios.get(`${API_URL}/home-page?${ARG_POPULATE_DEEP}`)
  return {
    props: {
      data: data && data.data && data.data.attributes ? data.data.attributes : null
    }
  }
}
