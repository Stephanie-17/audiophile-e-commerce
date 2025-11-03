'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: {
    orderId: string;
    items: OrderItem[];
    totals: {
      subtotal: number;
      shipping: number;
      vat: number;
      grandTotal: number;
    };
  };
}

export default function OrderConfirmation({ isOpen, onClose, orderData }: OrderConfirmationProps) {
  const [showAll, setShowAll] = useState(false);

  if (!isOpen) return null;

  const firstItem = orderData.items[0];
  const remainingItems = orderData.items.slice(1);

  return (
    <>
      {/* Backdrop */}
      <div 
        className='fixed inset-0 bg-black/40 z-40'
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className='fixed inset-0 z-50 flex items-center justify-center p-6 overflow-y-auto'>
        <div className='w-full max-w-[327px] sm:max-w-[540px] my-8'>
          <div className='bg-white rounded-lg p-8 md:p-12'>
            {/* Success Icon */}
            
              <Image className='mb-[33px]' src={'/assets/checkout/icon-order-confirmation.svg'} width={64} height={64} alt='order confirmation'/>
           

            <h1 className='font-bold text-[24px] md:text-[32px] uppercase tracking-wider mb-4 text-black'>
              Thank you<br />for your order
            </h1>
            
            <p className='text-[15px] text-black/50 leading-[25px] mb-8'>
              You will receive an email confirmation shortly.
            </p>

            {/* Order Summary */}
            <div className='grid md:grid-cols-[60%_40%] rounded-lg overflow-hidden mb-8'>
              {/* Items */}
              <div className='bg-[#F1F1F1] p-6'>
                {/* First Item */}
                <div className='flex items-center gap-4 pb-3'>
                  <Image
                    src={firstItem.image}
                    alt={firstItem.name}
                    width={50}
                    height={50}
                    className='rounded'
                  />
                  <div className='flex-1'>
                    <p className='font-bold text-[15px] text-black'>{firstItem.name}</p>
                    <p className='text-[14px] text-black/50'>$ {firstItem.price.toLocaleString()}</p>
                  </div>
                  <p className='text-black/50 font-bold text-[15px]'>x{firstItem.quantity}</p>
                </div>

                {/* Remaining Items */}
                {remainingItems.length > 0 && (
                  <>
                    {showAll && (
                      <div className='border-t border-black/10 pt-3 space-y-3'>
                        {remainingItems.map((item: OrderItem, index: number) => (
                          <div key={index} className='flex items-center gap-4'>
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                              className='rounded'
                            />
                            <div className='flex-1'>
                              <p className='font-bold text-[15px] text-black'>{item.name}</p>
                              <p className='text-[14px] text-black/50'>$ {item.price.toLocaleString()}</p>
                            </div>
                            <p className='text-black/50 font-bold text-[15px]'>x{item.quantity}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <button
                      onClick={() => setShowAll(!showAll)}
                      className='w-full text-center text-[12px] font-bold text-black/50 hover:text-[#D87D4A] transition-colors pt-3 border-t border-black/10 mt-3'
                    >
                      {showAll ? 'View less' : `and ${remainingItems.length} other item(s)`}
                    </button>
                  </>
                )}
              </div>

              {/* Grand Total */}
              <div className='bg-black p-6 flex flex-col justify-end'>
                <p className='text-white/50 text-[15px] uppercase mb-2'>Grand Total</p>
                <p className='text-white font-bold text-[18px]'>$ {orderData.totals.grandTotal.toLocaleString()}</p>
              </div>
            </div>

            {/* Back to Home Button */}
            <Link href='/' onClick={onClose}>
              <button className='w-full py-4 bg-[#D87D4A] hover:bg-[#FBAF85] transition-colors font-bold text-white text-[13px] tracking-[1px] uppercase'>
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}