'use client';

import { useRouter } from 'next/navigation';
import { useState,useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Image from 'next/image';
import { useMutation } from 'convex/react';
import { CartItem } from '../context/CartContext';
import { api } from '@/convex/_generated/api';
import OrderConfirmation from '../components/OrderConfirmation';

interface CofirmedOrder {
  orderId: string,
  items: CartItem[],
  totals: { subtotal: number; shipping: number; vat: number; grandTotal: number; }
}
export default function Checkout() {
  const router = useRouter();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const createOrder = useMutation(api.orders.createOrder);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
   const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmedOrder, setConfirmedOrder] = useState<CofirmedOrder | null>(null);

    useEffect(() => {
    // Remove fdprocessedid attributes after hydration
    document.querySelectorAll('[fdprocessedid]').forEach(element => {
      element.removeAttribute('fdprocessedid');
    });
  }, []);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    zipCode: '',
    city: '',
    country: '',
    paymentMethod: 'e-money',
    eMoneyNumber: '',
    eMoneyPin: ''
  });

  const validateField = (name: string, value: string) => {
    let error = '';
    
    switch(name) {
      case 'name':
        if (!value.trim()) error = 'Name is required';
        else if (value.length < 2) error = 'Name too short';
        break;
      case 'email':
        if (!value.trim()) error = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email';
        break;
      case 'phone':
        if (!value.trim()) error = 'Phone is required';
        else if (!/^\+?[\d\s-]{10,}$/.test(value)) error = 'Invalid phone';
        break;
      case 'address':
        if (!value.trim()) error = 'Address is required';
        break;
      case 'zipCode':
        if (!value.trim()) error = 'ZIP code is required';
        break;
      case 'city':
        if (!value.trim()) error = 'City is required';
        break;
      case 'country':
        if (!value.trim()) error = 'Country is required';
        break;
      case 'eMoneyNumber':
        if (formData.paymentMethod === 'e-money' && !value.trim()) error = 'Required';
        break;
      case 'eMoneyPin':
        if (formData.paymentMethod === 'e-money' && !value.trim()) error = 'Required';
        break;
    }
    
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    
    if (error) {
      setErrors({
        ...errors,
        [name]: error
      });
    }
  };

  const shipping = 50;
  const subtotal = getTotalPrice();
  const vat = Math.round(subtotal * 0.2);
  const grandTotal = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        },
        shipping: {
          address: formData.address,
          zipCode: formData.zipCode,
          city: formData.city,
          country: formData.country
        },
        items: cartItems.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        payment: {
          method: formData.paymentMethod,
          ...(formData.paymentMethod === 'e-money' && {
            emoneyNumber: formData.eMoneyNumber,
            emoneyPin: formData.eMoneyPin
          })
        },
        totals: {
          subtotal: subtotal,
          shipping: shipping,
          vat: vat,
          grandTotal: grandTotal
        }
      };

      const orderId = await createOrder(orderData);
      console.log('Order created with ID:', orderId);
      try {
        await fetch('/api/send-order-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            customerName: formData.name,
            orderId: orderId,
            items: cartItems,
            totals: orderData.totals,
            shipping: orderData.shipping,
          }),
        });
      } catch (emailError) {
        console.error('Error sending email:', emailError);
      }
       setConfirmedOrder({
        orderId,
        items: cartItems,
        totals: orderData.totals,
      });
      setShowConfirmation(true);
      clearCart();
      
      clearCart();
      alert('Order placed successfully!');
     
      
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    router.push('/');
  };


  return (
    <div className='bg-gray-50 min-h-screen py-8'>
      <div className='max-sm:w-[327px] sm:max-md:w-[90%] md:max-[1200px]:w-[689px] min-[1200px]:max-[1439px]:w-[1110px] min-[1440px]:w-[1440px] mx-auto text-black'>
        <button 
          onClick={() => router.back()}
          className='text-black/50 hover:text-[#D87D4A] mb-8 block '
        >
          Go Back
        </button>

        <div className=' grid min-[1200px]:grid-cols-[2fr_1fr] gap-8'>
          {/* Checkout Form */}
          <div className='bg-white rounded-lg p-6 sm:p-12'>
            <h1 className='font-bold text-[28px] sm:text-[32px] uppercase mb-8'>Checkout</h1>
            
            <form onSubmit={handleSubmit}>
              {/* Billing Details */}
              <div className='mb-8'>
                <h2 className='text-[#D87D4A] text-[13px] font-bold tracking-[1px] uppercase mb-4'>
                  Billing Details
                </h2>
                
                <div className='grid sm:grid-cols-2 gap-4'>
                  <div className='relative'>
                    <label className='block text-[12px] font-bold mb-2'>Name</label>
                    {errors.name && (
                      <span className='absolute top-0 right-0 text-[12px] text-red-500'>{errors.name}</span>
                    )}
                    <input
                      type='text'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder='Alexei Ward'
                      className={`w-full px-4 py-3 border rounded-lg outline-none caret-[#D87D4A] hover:border-[#D87D4A] focus:border-[#D87D4A] ${errors.name ? 'border-red-500' : ''}`}
                    />
                  </div>
                  
                  <div className='relative'>
                    <label className='block text-[12px] font-bold mb-2'>Email Address</label>
                    {errors.email && (
                      <span className='absolute top-0 right-0 text-[12px] text-red-500'>{errors.email}</span>
                    )}
                    <input
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder='alexei@mail.com'
                      className={`w-full px-4 py-3 border rounded-lg outline-none caret-[#D87D4A] hover:border-[#D87D4A] focus:border-[#D87D4A] ${errors.email ? 'border-red-500' : ''}`}
                    />
                  </div>
                  
                  <div className='relative'>
                    <label className='block text-[12px] font-bold mb-2'>Phone Number</label>
                    {errors.phone && (
                      <span className='absolute top-0 right-0 text-[12px] text-red-500'>{errors.phone}</span>
                    )}
                    <input
                      type='tel'
                      name='phone'
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder='+1 202-555-0136'
                      className={`w-full px-4 py-3 border rounded-lg outline-none caret-[#D87D4A] hover:border-[#D87D4A] focus:border-[#D87D4A] ${errors.phone ? 'border-red-500' : ''}`}
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              <div className='mb-8'>
                <h2 className='text-[#D87D4A] text-[13px] font-bold tracking-[1px] uppercase mb-4'>
                  Shipping Info
                </h2>
                
                <div className='space-y-4'>
                  <div className='relative'>
                    <label className='block text-[12px] font-bold mb-2'>Address</label>
                    {errors.address && (
                      <span className='absolute top-0 right-0 text-[12px] text-red-500'>{errors.address}</span>
                    )}
                    <input
                      type='text'
                      name='address'
                      value={formData.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder='1137 Williams Avenue'
                      className={`w-full px-4 py-3 border rounded-lg outline-none caret-[#D87D4A] hover:border-[#D87D4A] focus:border-[#D87D4A] ${errors.address ? 'border-red-500' : ''}`}
                    />
                  </div>
                  
                  <div className='grid sm:grid-cols-2 gap-4'>
                    <div className='relative'>
                      <label className='block text-[12px] font-bold mb-2'>ZIP Code</label>
                      {errors.zipCode && (
                        <span className='absolute top-0 right-0 text-[12px] text-red-500'>{errors.zipCode}</span>
                      )}
                      <input
                        type='text'
                        name='zipCode'
                        value={formData.zipCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder='10001'
                        className={`w-full px-4 py-3 border rounded-lg outline-none caret-[#D87D4A] hover:border-[#D87D4A] focus:border-[#D87D4A] ${errors.zipCode ? 'border-red-500' : ''}`}
                      />
                    </div>
                    
                    <div className='relative'>
                      <label className='block text-[12px] font-bold mb-2'>City</label>
                      {errors.city && (
                        <span className='absolute top-0 right-0 text-[12px] text-red-500'>{errors.city}</span>
                      )}
                      <input
                        type='text'
                        name='city'
                        value={formData.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder='New York'
                        className={`w-full px-4 py-3 border rounded-lg outline-none caret-[#D87D4A] hover:border-[#D87D4A] focus:border-[#D87D4A] ${errors.city ? 'border-red-500' : ''}`}
                      />
                    </div>
                    
                    <div className='relative'>
                      <label className='block text-[12px] font-bold mb-2'>Country</label>
                      {errors.country && (
                        <span className='absolute top-0 right-0 text-[12px] text-red-500'>{errors.country}</span>
                      )}
                      <input
                        type='text'
                        name='country'
                        value={formData.country}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder='United States'
                        className={`w-full px-4 py-3 border rounded-lg outline-none caret-[#D87D4A] hover:border-[#D87D4A] focus:border-[#D87D4A] ${errors.country ? 'border-red-500' : ''}`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className='mb-8'>
                <h2 className='text-[#D87D4A] text-[13px] font-bold tracking-[1px] uppercase mb-4'>
                  Payment Details
                </h2>
                
                <div className='grid sm:grid-cols-2 gap-4 mb-4'>
                  <label className='block text-[12px] font-bold'>Payment Method</label>
                  
                  <div className='space-y-2'>
                    <label className='flex items-center px-4 py-3 border rounded-lg cursor-pointer hover:border-[#D87D4A]'>
                      <input
                        type='radio'
                        name='paymentMethod'
                        value='e-money'
                        checked={formData.paymentMethod === 'e-money'}
                        onChange={handleChange}
                        className='mr-4 accent-[#D87D4A]'
                      />
                      <span className='text-[14px] font-bold'>e-Money</span>
                    </label>
                    
                    <label className='flex items-center px-4 py-3 border rounded-lg cursor-pointer hover:border-[#D87D4A]'>
                      <input
                        type='radio'
                        name='paymentMethod'
                        value='cash'
                        checked={formData.paymentMethod === 'cash'}
                        onChange={handleChange}
                        className='mr-4 accent-[#D87D4A]'
                      />
                      <span className='text-[14px] font-bold'>Cash on Delivery</span>
                    </label>
                  </div>
                </div>

               
                  <div className='grid sm:grid-cols-2 gap-4'>
                    <div className='relative'>
                      <label className='block text-[12px] font-bold mb-2'>e-Money Number</label>
                      {errors.eMoneyNumber && (
                        <span className='absolute top-0 right-0 text-[12px] text-red-500'>{errors.eMoneyNumber}</span>
                      )}
                      <input
                        type='text'
                        name='eMoneyNumber'
                        value={formData.eMoneyNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder='238521993'
                        className={`w-full px-4 py-3 border rounded-lg outline-none caret-[#D87D4A] hover:border-[#D87D4A] focus:border-[#D87D4A] ${errors.eMoneyNumber ? 'border-red-500' : ''}`}
                      />
                    </div>
                    
                    <div className='relative'>
                      <label className='block text-[12px] font-bold mb-2'>e-Money PIN</label>
                      {errors.eMoneyPin && (
                        <span className='absolute top-0 right-0 text-[12px] text-red-500'>{errors.eMoneyPin}</span>
                      )}
                      <input
                        type='text'
                        name='eMoneyPin'
                        value={formData.eMoneyPin}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder='6891'
                        className={`w-full px-4 py-3 border rounded-lg outline-none caret-[#D87D4A] hover:border-[#D87D4A] focus:border-[#D87D4A] ${errors.eMoneyPin ? 'border-red-500' : ''}`}
                      />
                    </div>
                  </div>
             
                  <div className='flex gap-8 items-center mt-6'>
                    <div className=''>
                      <Image src={'/assets/checkout/icon-cash-on-delivery.svg'} width={50} height={50} alt='cash on delivery icon' />
                    </div>
                    <p className='text-[15px] leading-[25px] text-black/50'>
                      The Cash on Delivery option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled.
                    </p>
                  </div>
              
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className='bg-white rounded-lg p-6 sm:p-8 h-fit'>
            <h2 className='font-bold text-[18px] uppercase mb-6'>Summary</h2>
            
            {cartItems.length === 0 ? (
              <p className='text-center text-black/50 py-8'>Your cart is empty</p>
            ) : (
              <>
                <div className='space-y-4 mb-6'>
                  {cartItems.map((item) => (
                    <div key={item.id} className='flex items-center gap-4'>
                      <Image 
                        src={item.image} 
                        alt={item.name}
                        width={64}
                        height={64}
                        className='w-16 h-16 rounded object-cover'
                      />
                      <div className='flex-1'>
                        <p className='font-bold text-[15px]'>{item.name}</p>
                        <p className='text-black/50 text-[14px]'>$ {item.price.toLocaleString()}</p>
                      </div>
                      <p className='text-black/50 font-bold'>x{item.quantity}</p>
                    </div>
                  ))}
                </div>

                <div className='space-y-2 mb-6'>
                  <div className='flex justify-between'>
                    <p className='text-black/50 uppercase text-[15px]'>Total</p>
                    <p className='font-bold text-[18px]'>$ {subtotal.toLocaleString()}</p>
                  </div>
                  <div className='flex justify-between'>
                    <p className='text-black/50 uppercase text-[15px]'>Shipping</p>
                    <p className='font-bold text-[18px]'>$ {shipping}</p>
                  </div>
                  <div className='flex justify-between'>
                    <p className='text-black/50 uppercase text-[15px]'>VAT (Included)</p>
                    <p className='font-bold text-[18px]'>$ {vat.toLocaleString()}</p>
                  </div>
                </div>

                <div className='flex justify-between mb-8'>
                  <p className='text-black/50 uppercase text-[15px]'>Grand Total</p>
                  <p className='font-bold text-[18px] text-[#D87D4A]'>$ {grandTotal.toLocaleString()}</p>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className='w-full py-4 bg-[#D87D4A] hover:bg-[#FBAF85] transition-colors font-bold text-white text-[13px] tracking-[1px] uppercase disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {isSubmitting ? 'Processing...' : 'Continue & Pay'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
     {confirmedOrder && (
        <OrderConfirmation 
          isOpen={showConfirmation}
          onClose={handleCloseConfirmation}
          orderData={confirmedOrder}
        />
      )}
    </div>
  );
}