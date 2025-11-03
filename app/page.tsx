import About from "./components/About";
import ProductCategories from "./components/ProductCategories";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
	return (
		<div className="">
			<div className="hero-container px-6 text-white">
				<section className="flex justify-center h-[90vh] items-center lg:justify-start mx-auto lg:w-full">
					<div className="flex justify-center items-center lg:justify-start w-[327px] md:w-[689px] lg:w-full min-[1200px]:max-w-[1110px] min-[1440px]:max-w-[1440px] mx-auto">
						<div className="hero-text w-full md:w-[379px] mt-[108px] mb-[125px] md:mb-[167px] flex justify-center flex-col items-center text-center lg:text-left lg:items-start">
							<p className="tracking-[10px] text-white/50 text-[14px] mb-4 md:mb-6">
								NEW PRODUCT
							</p>
							<h1 className="text-[36px] md:text-[56px] font-bold tracking-[1.29px] md:tracking-[2px] leading-10 md:leading-[58px] mb-6">
								XX99 MARK II HEADPHONES
							</h1>
							<p className="leading-[25px] text-white/75 text-[15px] mb-7 md:mb-10">
								Experience natural, lifelike audio and exceptional build quality
								made for the passionate music enthusiast.
							</p>
							<Link href={'/headphones/xx99-mark-two-headphones'}>
							  <button className="w-40 cursor-pointer h-12 bg-[#D87D4A] hover:bg-[#FBAF85] transition-colors font-bold text-[13px] tracking-[1px]">
								SEE PRODUCT
							</button>
							</Link>
							
						</div>
					</div>
				</section>
			</div>
			<ProductCategories />

			<section className="product-display mt-[120px] md:px-6">
				<section className="max-sm:w-[327px] sm:max-md:w-[90%] mx-auto  md:max-lg:w-[689px] lg:max-[1199px]:w-full min-[1200px]:max-[1439px]:w-[1110px] min-[1440px]:max-w-[1440px] md:h-[720px] lg:h-[560px] px-6 h-[600px] pb-[55px] rounded-lg text-center lg:text-left relative bg-[#D87D4A] min-[1440px]:gap-[250px] flex flex-col lg:flex-row  items-center gap-[138px] overflow-hidden mb-3">
					<div className="rings lg:ml-[117px] relative w-[328px] h-[328px]">
						<picture>
							<source
								media="(min-width:1024px)"
								srcSet="/assets/home/desktop/image-speaker-zx9.png"
							/>
							<Image
								className="absolute left-1/2 -translate-x-1/2 z-10 top-[55px] w-[172px] md:w-[197px] lg:w-[410px] lg:h-[533px] -mt-10 object-contain "
								src={"/assets/home/mobile/image-speaker-zx9.png"}
								width={172}
								height={172}
								alt="ZX9 Speaker"
							/>
						</picture>
					</div>

					<div className="relative z-20 flex flex-col items-center lg:items-start gap-6 lg:gap-0  md:mt-16 lg:mt-[133px]">
						<h1 className="text-[36px] md:text-[56px]  w-[280px] md:w-[261px] font-bold leading-10 md:leading-[58px] tracking-[1.29px] lg:mb-6 md:tracking-[2px]">
							ZX9 <br /> SPEAKER
						</h1>
						<p className="text-[15px] md:mt-6 lg:mt-0 leading-[25px] lg:mb-10 w-[280px] md:w-[349px]">
							Upgrade to premium speakers that are phenomenally built to deliver
							truly remarkable sound.
						</p>
						<Link href={'/speakers/zx9-speaker'}>
						  	<button className="bg-black w-40 md:mt-10 lg:mt-0 h-12 text-[13px] cursor-pointer font-bold tracking-[1px] hover:bg-[#4C4C4C] transition-colors">
							SEE PRODUCT
						</button>
						</Link>
					
					</div>
				</section>

				<section className="zx7-container mt-6 md:mt-8 lg:mt-12 mx-auto rounded-lg flex flex-col justify-center items-start pl-6 md:pl-[62px] gap-8 max-sm:w-[327px] h-80 sm:max-md:w-[90%] md:max-lg:w-[689px] lg:max-[1199px]:w-full min-[1200px]:max-[1439px]:w-[1110px] min-[1440px]:max-w-[1440px]">
					<h4 className="text-[28px] font-bold text-black tracking-[2px]">
						ZX7 SPEAKER
					</h4>
						<Link href={'/speakers/zx7-speaker'}>
						  <button className="w-40 h-12 border-2 border-black text-black text-[13px] font-bold tracking-[1px] hover:bg-black hover:text-white transition-colors ">
						 SEE PRODUCT
					   </button>
						</Link>
					
				</section>

				<section className="max-sm:w-[327px] sm:max-md:w-[90%] md:max-lg:w-[689px] h-[424px] sm:max-md:h-[220px] lg:max-[1199px]:w-full min-[1200px]:max-[1439px]:w-[1110px] min-[1440px]:max-w-[1440px] md:h-80 mt-6 flex flex-col sm:flex-row items-center sm:items-start mx-auto  gap-6 min-[1200px]:gap-[30px]">
					<div className="image max-sm:w-[327px] sm:max-md:w-[50%] md:max-lg:w-[339px] lg:max-[1199px]:w-[50%] min-[1200px]:max-[1439px]:w-[540px] min-[1440px]:w-[50%]">
						<picture>
							<source
								media="(min-width:1200px )"
								srcSet="/assets/home/desktop/image-earphones-yx1.jpg"
							/>
							<source
								media="(min-width:768px )"
								srcSet="/assets/home/tablet/image-earphones-yx1.jpg"
							/>
							<Image
								className="sm:h-[200px]  rounded-lg   md:h-80 w-full"
								src={"/assets/home/mobile/image-earphones-yx1.jpg"}
								alt="Yx1 Earphones"
								width={327}
								height={100}
							/>
						</picture>
					</div>
					<div className="text sm:max-md:w-[50%] max-sm:w-[327px] h-[200px] md:max-lg:w-[339px] lg:max-[1199px]:w-[50%] min-[1200px]:w-[540px] min-[1440px]:w-[50%] md:h-80 bg-[#F1F1F1] flex flex-col items-start justify-center rounded-lg pl-6 md:max-[1199px]:pl-[41px] min-[1200px]:pl-[95px] gap-8">
						<h4 className="text-[28px] font-bold text-black tracking-[2px]">
							YX1 EARPHONES
						</h4>
						<Link href={'/earphones/yx1-earphones'}>
						   <button className="w-40 h-12 border-2 border-black text-black text-[13px] font-bold tracking-[1px] hover:bg-black hover:text-white transition-colors ">
							SEE PRODUCT
						</button>
						</Link>
						
					</div>
				</section>
				<About />
			</section>
		</div>
	);
}
