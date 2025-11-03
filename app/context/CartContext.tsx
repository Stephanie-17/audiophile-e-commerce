"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
	id: string;
	name: string;
	price: number;
	quantity: number;
	image: string;
}

interface CartContextType {
	cartItems: CartItem[];
	addToCart: (item: CartItem) => void;
	removeFromCart: (id: string) => void;
	updateQuantity: (id: string, quantity: number) => void;
	clearCart: () => void;
	getTotalPrice: () => number;
	getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
	const [cartItems, setCartItems] = useState<CartItem[]>(() => {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("audiophile-cart");
			return saved ? JSON.parse(saved) : [];
		}
		return [];
	});

	useEffect(() => {
		localStorage.setItem("audiophile-cart", JSON.stringify(cartItems));
	}, [cartItems]);

	const addToCart = (newItem: CartItem) => {
		setCartItems((prevItems) => {
			const existingItem = prevItems.find((item) => item.id === newItem.id);
			if (existingItem) {
				return prevItems.map((item) =>
					item.id === newItem.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
			}
			return [...prevItems, { ...newItem, quantity: 1 }];
		});
	};

	const removeFromCart = (id: string) => {
		setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
	};

	const updateQuantity = (id: string, quantity: number) => {
		if (quantity <= 0) {
			removeFromCart(id);
			return;
		}
		setCartItems((prevItems) =>
			prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
		);
	};

	const clearCart = () => {
		setCartItems([]);
	};

	const getTotalPrice = () => {
		return cartItems.reduce(
			(total, item) => total + item.price * item.quantity,
			0
		);
	};

	const getTotalItems = () => {
		return cartItems.reduce((total, item) => total + item.quantity, 0);
	};

	const value = {
		cartItems,
		addToCart,
		removeFromCart,
		updateQuantity,
		clearCart,
		getTotalPrice,
		getTotalItems,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
}
