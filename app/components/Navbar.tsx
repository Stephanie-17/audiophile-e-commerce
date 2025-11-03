'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProductCategories from "./ProductCategories";
import Cart from "./Cart";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();

  return (
    <>
      <div className="relative bg-[#191919] text-white px-6 pt-[19px] -mb-0.5 w-full">
        <nav className="flex p-0 min-[327px]:max-[500px]:max-w-[327px] min-[500px]:w-full md:w-[689px] lg:w-full min-[1200px]:max-w-[1110px] min-[1440px]:max-w-[1440px] mx-auto pb-8 items-center lg:items-end gap-11 min-[360px]:gap-[74px] min-[500px]:gap-0 min-[500px]:justify-between border-b-4 border-b-white/10">
          <div className="flex gap-11 min-[370px]:gap-[74px] min-[500px]:justify-between md:gap-[42px] items-center lg:inline-block">
            <button 
              onClick={() => setOpenMenu(true)}
              className="lg:hidden"
            >
              <Image
                className="w-4 h-[15px]"
                src={"/assets/hamburger.svg"}
                width={50}
                height={50}
                alt="menu-btn"
              />
            </button>
            <Link href="/">
              <Image
                className="w-[143px]"
                src={"/assets/logo.svg"}
                width={100}
                height={100}
                alt="audiophile-logo"
              />
            </Link>
          </div>

          <ul className="list-none hidden lg:flex w-[429px] items-center gap-[34px]">
            <li>
              <Link
                className="font-bold text-[13px] tracking-[2px] hover:text-[#D87D4A] transition-colors"
                href={"/"}
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                className="font-bold text-[13px] tracking-[2px] hover:text-[#D87D4A] transition-colors"
                href={"/headphones"}
              >
                HEADPHONES
              </Link>
            </li>
            <li>
              <Link
                className="font-bold text-[13px] tracking-[2px] hover:text-[#D87D4A] transition-colors"
                href={"/speakers"}
              >
                SPEAKERS
              </Link>
            </li>
            <li>
              <Link
                className="font-bold text-[13px] tracking-[2px] hover:text-[#D87D4A] transition-colors"
                href={"/earphones"}
              >
                EARPHONES
              </Link>
            </li>
          </ul>

          <button 
            onClick={() => setOpenCart(true)}
            className="relative"
          >
            <Image
              className="w-[23px]"
              src={"/assets/carts.svg"}
              width={30}
              height={30}
              alt="cart-icon"
            />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#D87D4A] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {openMenu && (
        <>
          <div 
            className='fixed inset-0 bg-black/40 z-40 lg:hidden'
            onClick={() => setOpenMenu(false)}
          />
          <div className='fixed top-[90px] left-0 w-full bg-white z-50 lg:hidden rounded-b-lg'>
            <div className="px-6 py-8">
              <ProductCategories />
            </div>
          </div>
        </>
      )}

      {/* Cart Modal */}
      {openCart && <Cart setOpenModal={setOpenCart} />}
    </>
  );
};

export default Navbar;