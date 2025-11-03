import React from "react";
import Image from "next/image";
import Link from "next/link";

const ProductCategories = () => {
	const categories = [
		{
			id: 1,
			imagePath:
				"/assets/shared/desktop/image-category-thumbnail-headphones.png",
			categoryName: "headphones",
		},
		{
			id: 2,
			imagePath: "/assets/shared/desktop/image-category-thumbnail-speakers.png",
			categoryName: "speakers",
		},
		{
			id: 3,
			imagePath:
				"/assets/shared/desktop/image-category-thumbnail-earphones.png",
			categoryName: "earphones",
		},
	];

	return (
		<aside className="w-full my-24 max-w-[327px] mx-auto md:max-w-[689px] lg:max-w-[1110px] flex flex-col md:flex-row gap-4 md:gap-2.5 lg:gap-[30px]">
			{categories.map((category) => (
				<div key={category.id} className="flex flex-col items-center flex-1">
					<Image
						className="w-[150px] h-[150px] object-contain z-10 relative"
						src={category.imagePath}
						width={150}
						height={150}
						alt={`${category.categoryName} category`}
					/>
					<div className="w-full h-[165px] bg-[#F1F1F1] rounded-lg flex flex-col items-center justify-end -mt-[70px] pt-[70px]">
						<h6 className="text-black font-bold text-[15px] tracking-[1.07px] mb-[17px] uppercase">
							{category.categoryName}
						</h6>
						<Link href={`/${category.categoryName}`}>
							<button className="hover:text-[#D87D4A] cursor-pointer transition-colors text-black/50 font-bold text-[13px] tracking-[1px] flex items-center gap-[13px] mb-[22px]">
								SHOP
								<Image
									src={"/assets/shared/desktop/icon-arrow-right.svg"}
									alt="right arrow icon"
									width={8}
									height={12}
								/>
							</button>
						</Link>
					</div>
				</div>
			))}
		</aside>
	);
};

export default ProductCategories;
