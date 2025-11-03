'use client';

import products from '@/app/data/db.json';
import { notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { use, useState } from 'react';
import { useCart } from '../../context/CartContext';
import ProductCategories from '@/app/components/ProductCategories';
import About from '@/app/components/About';
import Cart from '@/app/components/Cart';

type ProductPageProps = {
  params: Promise<{ 
    category: string;
    slug: string;
  }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const { category, slug } = use(params);
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [openModal, setOpenModal] = useState(false)
  

  const product = products.data.find(
    p => p.slug === slug && p.category === category
  );
  
  if (!product) {
    notFound();
  }

  const handleQuantityDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleQuantityIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
   
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id.toString(),
        name: product.name
        .replace(/headphones/gi,'')
        .replace(/speakers/gi, '')
        .replace(/wireless earphones/gi, '')
        .trim(),
        price: product.price,
        quantity: 1,
        image: product.image.mobile
      });
    }
    
  
    // router.push('/checkout');
    setOpenModal(true)
  };
  
  return (
    <main className='relative md:px-4 py-8 text-black'>
      <div className='max-sm:w-[327px] sm:max-md:w-[90%] md:max-[1200px]:w-[689px] min-[1200px]:max-[1439px]:w-[1110px] min-[1440px]:max-w-[1440px] mx-auto'>
        <button 
        onClick={() => router.back()}
        className='text-black/50 hover:text-[#D87D4A] mb-8 inline-block cursor-pointer'
      >
        Go Back
      </button>
      
     
      <div className='flex max-[1200px]:flex-col md:flex-row items-center gap-8 mb-16'>
  
        <div className='max-sm:w-[327px] sm:max-md:w-[90%] md:max-[1200px]:w-[281px] md:max-[1200px]:h-[480px] min-[1200px]:w-[540px] min-[1200px]:h-[560px]'>
          <picture>
            <source media="(min-width:1200px)" srcSet={product.image.desktop} />
            <source media="(min-width: 768px)" srcSet={product.image.tablet} />
            <Image 
              className='w-full rounded-lg' 
              src={product.image.mobile} 
              width={327} 
              height={352} 
              alt={product.name} 
            />
          </picture>
        </div>
        
        {/* Product Info */}
        <div className='max-sm:w-[327px] sm:w-[572px] min-[1200px]:w-[445px]'>
          {product.new && (
            <p className='text-[14px] tracking-[10px] text-[#D87D4A] mb-4'>NEW PRODUCT</p>
          )}
          <h1 className='font-bold text-[28px] lg:text-[40px] tracking-[1px] sm:tracking-[1.43px] w-[250px] uppercase mb-6 text-left'>
            {product.name}
          </h1>
          <p className='text-[15px] leading-[25px] text-black/50 mb-6'>
            {product.description}
          </p>
          <p className='font-bold text-[18px] mb-8'>$ {product.price.toLocaleString()}</p>
          
          {/* Add to Cart Section */}
          <div className='flex gap-4'>
            <div className='flex items-center bg-gray-100'>
              <button 
                onClick={handleQuantityDecrease}
                className='px-4 py-3 hover:text-[#D87D4A] font-bold'
              >
                -
              </button>
              <span className='px-4 font-bold'>{quantity}</span>
              <button 
                onClick={handleQuantityIncrease}
                className='px-4 py-3 hover:text-[#D87D4A] font-bold'
              >
                +
              </button>
            </div>
            <button 
              onClick={handleAddToCart}
              className='px-8 py-3 bg-[#D87D4A] hover:bg-[#FBAF85] transition-colors font-bold text-white text-[13px] tracking-[1px]'
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      
      {/* Features */}
      <div className=' grid min-[1200px]:grid-cols-[2fr_1fr] gap-16 mb-16'>
        <div className='lg:w-[635px]'>
          <h2 className='font-bold text-[24px] sm:text-[32px] uppercase mb-6'>Features</h2>
          <p className='text-[15px] leading-[25px] text-black/50 whitespace-pre-line'>
            {product.features}
          </p>
        </div>
        
        {/* In The Box */}
        <div>
          <h2 className='font-bold text-[24px] sm:text-[32px] uppercase mb-6'>In The Box</h2>
          <ul className='space-y-2'>
            {product.includes.map((item, index) => (
              <li key={index} className='flex gap-6'>
                <span className='text-[#D87D4A] font-bold'>{item.quantity}x</span>
                <span className='text-black/50'>{item.item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Gallery */}
      <div className=' mb-16 grid max-sm:grid-cols-1 grid-cols-2 max-sm:gap-5  sm:gap-[30px]'>
        <div className='max-sm:space-y-5 sm:space-y-8'>
          <Image 
            src={product.gallery.first.mobile} 
            width={327} 
            height={174} 
            alt={`${product.name} gallery 1`}
            className='w-full ax-lg:h-[174px] lg:h-[280px] rounded-lg'
          />
          <Image 
            src={product.gallery.second.mobile} 
            width={327} 
            height={174} 
            alt={`${product.name} gallery 2`}
            className='w-full max-lg:h-[174px] lg:h-[280px]  rounded-lg'
          />
        </div>
        <Image 
          src={product.gallery.third.mobile} 
          width={327} 
          height={368} 
          alt={`${product.name} gallery 3`}
          className=' w-full max-md:h-[368px] max-lg:h-[368px] lg:h-[592px] object-cover rounded-lg'
        />
      </div>
      
      {/* You May Also Like */}
      <div>
        <h2 className='font-bold text-[24px] sm:text-[32px] uppercase text-center mb-10'>
          You May Also Like
        </h2>
        <div className='grid sm:grid-cols-3 gap-8'>
          {product.others.map((other) => {
            // Find the other product to get its category
            const otherProduct = products.data.find(p => p.slug === other.slug);
            
            return (
              <div key={other.slug} className='text-center'>
                <Image 
                  src={other.image.mobile} 
                  width={327} 
                  height={318} 
                  alt={other.name}
                  className='w-full rounded-lg mb-6'
                />
                <h3 className='font-bold text-[24px] uppercase mb-6'>{other.name}</h3>
                <Link href={`/${otherProduct?.category}/${other.slug}`}>
                  <button className='px-8 py-3 bg-[#D87D4A] hover:bg-[#FBAF85] transition-colors font-bold text-white text-[13px] tracking-[1px]'>
                    SEE PRODUCT
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <ProductCategories />
      <About />
      </div>
      {
        openModal && ( <Cart setOpenModal={setOpenModal} />)
      }
     
    </main>
  );
}