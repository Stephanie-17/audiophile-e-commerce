import React from 'react'
import { useCart } from '../context/CartContext'
import Image from 'next/image'
import Link from 'next/link'

interface CartProps {
  setOpenModal: (openModal:boolean)=>void
}

const Cart = ({setOpenModal}:CartProps) => {
  const {cartItems, updateQuantity, getTotalItems, getTotalPrice, clearCart} = useCart();
  const numberOfItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const handleQuantityDecrease = (id:string, quantity:number) => {
    if (quantity > 1) updateQuantity(id, quantity - 1);
  };

  const handleQuantityIncrease = (id:string, quantity:number) => {
    updateQuantity(id, quantity + 1);
  };

  return (
    <>
  
      <div 
        className='fixed inset-0 bg-black/40 z-40'
        onClick={() => setOpenModal(false)}
      />
      
   
      <aside className='fixed top-32 right-4 sm:right-10 lg:right-20 w-[90%] max-md:max-w-[327px] md:max-w-[377px] bg-white rounded-lg shadow-2xl z-50 p-8'>
        {/* Header */}
        <header className='flex justify-between items-center mb-8'>
          <h4 className='font-bold text-[18px] tracking-[1.29px] uppercase'>
            Cart ({numberOfItems})
          </h4>
          {cartItems.length > 0 && (
            <button 
              onClick={clearCart}
              className='text-[15px] cursor-pointer leading-[25px] underline text-black/50 hover:text-[#D87D4A] transition-colors'
            >
              Remove all
            </button>
          )}
        </header>

      
        {cartItems.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-black/50 mb-4'>Your cart is empty</p>
            <button 
              onClick={() => setOpenModal(false)}
              className='text-[#D87D4A] hover:underline'
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <ul className='space-y-6 max-h-[300px] overflow-y-auto'>
              {cartItems.map(item => (
                <li key={item.id} className='flex items-center gap-4'>
                  <Image 
                    className='rounded-lg shrink-0' 
                    src={item.image} 
                    width={64} 
                    height={64} 
                    alt={item.name} 
                  />
                  
                  <div className='flex-1 min-w-0'>
                    <h5 className='text-[15px] font-bold leading-[25px] truncate'>
                      {item.name}
                    </h5>
                    <h6 className='text-[14px] leading-[25px] font-bold text-black/50'>
                      $ {item.price.toLocaleString()}
                    </h6>
                  </div>
                  
                  <div className='flex items-center bg-[#F1F1F1] h-8'>
                    <button 
                      onClick={() => handleQuantityDecrease(item.id, item.quantity)}
                      className='w-8 h-full hover:text-[#D87D4A] font-bold text-[13px] transition-colors'
                    >
                      -
                    </button>
                    <span className='w-8 text-center font-bold text-[13px]'>
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => handleQuantityIncrease(item.id, item.quantity)}
                      className='w-8 h-full hover:text-[#D87D4A] font-bold text-[13px] transition-colors'
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>

           
            <div className='mt-8 flex justify-between items-center'>
              <p className='text-black/50 text-[15px] leading-[25px] uppercase'>Total</p>
              <h4 className='font-bold text-[18px]'>$ {totalPrice.toLocaleString()}</h4>
            </div>

           
            <Link href='/checkout' onClick={() => setOpenModal(false)}>
              <button className='uppercase mt-6 w-full bg-[#D87D4A] hover:bg-[#FBAF85] transition-colors text-white h-12 text-[13px] tracking-[1px] font-bold'>
                Checkout
              </button>
            </Link>
          </>
        )}
      </aside>
    </>
  );
}

export default Cart