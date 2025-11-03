'use client';

import "./globals.css";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import Footer from "./components/Footer";



const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>AudioPhile</title>
      <link rel="shortcut icon" href="/assets/favicon-32x32.png" type="image/x-icon" />
      <body
        className={`antialiased`}
      >
        <ConvexProvider client={convex}>
          <CartProvider>
            <Navbar />
            {children}
            <Footer/>
          </CartProvider>
        </ConvexProvider>
      </body>
    </html>
  );
}