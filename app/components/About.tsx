import React from 'react'
import Image from 'next/image'
const About = () => {
  return (
    <section className='mt-[120px] text-black mx-auto sm:max-md:w-[90%] flex flex-col lg:flex-row-reverse lg:gap-[50px] items-center min-[1200px]:max-[1439px]:w-[1110px] min-[1200px]:gap-[125px] min-[1440px]:gap-[270px] min-[1400px]:max-w-[1400px]'>
      <div className="img mx-auto max-sm:w-[327px] max-lg:w-full lg:max-[1439px]:w-[540px] min-[1440px]:w-[570px] mb-10">
        <picture>
          <source media="(min-width:1024px )" srcSet="/assets/shared/desktop/image-best-gear.jpg" />
          <source media="(min-width:768px )" srcSet="/assets/shared/tablet/image-best-gear.jpg" />
          <Image className='w-full rounded-lg ' src={'/assets/shared/mobile/image-best-gear.jpg'} width={327} height={300} alt='Man with XX99 Mark II Headphones'/>
        </picture>
      </div>
      <div className="pg text-center lg:text-left max-sm:w-[327px] sm:max-md:max-w-[473px] md:w-[573px] lg:max-[1439px]:w-[445px]">
        <h2 className='text-[28px] sm:max-md:text-[30px] md:text-[40px] mb-8 font-bold tracking-[1px] md:tracking-[1.43px] md:leading-11'>BRINGING YOU THE <span className='text-[#D87D4A]'>BEST</span> AUDIO GEAR</h2>
        <p className='text-black/50 text-[15px] leading-[25px]'>Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.</p>
      </div>
     
    </section>
  )
}

export default About