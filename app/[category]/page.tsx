import About from "../components/About";
import ProductCategories from "../components/ProductCategories";
import products from "../data/db.json";
import Image from "next/image";
import Link from "next/link";

type CategoryPageProps = {
	params: Promise<{ category: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
	const { category } = await params;

	const categoryProducts = products.data.filter(
		(product) => product.category === category
	);

	return (
		<main className="text-black">
			<header className="bg-[#191919] py-8 md:py-0 md:max-lg:pt-[105px] md:max-lg:pb-[97px] lg:py-[98px]">
				<h2 className="text-white text-[28px] tracking-[2px] font-bold uppercase w-[190px] md:w-[233px] md:text-[40px] md:leading-11 md:tracking-[1.43px]   mx-auto">
					{category}
				</h2>
			</header>
			<section className="mt-16 flex flex-col gap-[120px] min-[1200px]:max-[1439px]:w-[1110px] min-[1440px]:max-w-[1440px] mx-auto items-center">
				{categoryProducts.map((product, index) => (
					<div
						key={product.id}
						className={`flex max-[1200px]:flex-col ${index % 2 === 0 ? "min-[1200px]:flex-row-reverse" : "min-[1200px]:flex-row"} items-center  min-[1200px]:max-[1439px]:gap-[125px] min-[1440px]:gap-[170px]`}
					>
						<div className="max-sm:w-[320px] md:max-[1200px]:h-[352px] sm:max-md:w-full md:max-[1200px]:w-[689px] min-[1200px]:w-[540px] min-[1200px]:h-[560px]">
							<picture>
								<source
									media="(min-width:1200px )"
									srcSet={product.categoryImage.desktop}
								/>
								<source
									media="(min-width: 768px)"
									srcSet={product.categoryImage.tablet}
								/>
								<Image
									className="sm:max-md:w-[90%] md:h-full md:w-full mx-auto rounded-lg"
									src={product.categoryImage.mobile}
									width={327}
									height={352}
									alt={product.name}
								/>
							</picture>
						</div>
						<div className="mt-8 max-sm:w-[327px] sm:max-[1200px]:w-[572px] flex items-center flex-col gap-6 text-center min-[1200px]:text-left min-[1200px]:items-start min-[1200px]:w-[445px]">
							{product.new && (
								<p className="text-[14px] tracking-[10px] text-[#D87D4A]">
									NEW PRODUCT
								</p>
							)}
							<h2 className="font-bold text-[28px] sm:text-[40px] text-center lg:text-left  tracking-[1px] sm:tracking-[1.43px] sm:leading-11 uppercase">
								{product.name}
							</h2>
							<p className="text-[15px] leading-[25px]  text-black/50 ">
								{product.description}
							</p>
							<Link href={`/${product.category}/${product.slug}`}>
								<button className="w-40 cursor-pointer h-12 bg-[#D87D4A] hover:bg-[#FBAF85] transition-colors font-bold text-white text-[13px] tracking-[1px]">
									SEE PRODUCT
								</button>
							</Link>
						</div>
					</div>
				))}
			</section>
			<ProductCategories />
			<About />
		</main>
	);
}
