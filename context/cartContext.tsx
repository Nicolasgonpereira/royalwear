"use client";

import {
	addItem,
	deleteItemFromCartAPI,
	fetchCartFromAPI,
	updateItemToCartAPI
} from "@/services/CartService";
import { CartWithProductIncluded } from "@/types/cart";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./userContext";

type CartContextType = {
	cart: CartWithProductIncluded[];
	addItemToCart: (productId: string, quantity?: number) => Promise<void>;
	removeItemFromCart: (id: string) => void;
	updateItemQuantity: (id: string, quantity: number) => void;
};

export const cartContext = createContext<CartContextType | undefined>(
	undefined
);

export default function CartProvider({
	children
}: {
	children: React.ReactNode;
}) {
	const [cart, setCart] = useState<CartWithProductIncluded[]>([]);
	const { user } = useUser();

	useEffect(() => {
		if (user) {
			fetchCart();
		} else {
			setCart([]);
		}
	}, [user]);

	const fetchCart = async () => {
		const cartItems = await fetchCartFromAPI();
		if (cartItems) {
			setCart(cartItems);
		}
	};

	const addItemToCart = async (
		productId: string,
		quantity: number = 1
	): Promise<void> => {
		const newCartItems = await addItem(cart, productId, quantity);
		setCart(newCartItems);
	};

	const removeItemFromCart = async (id: string): Promise<void> => {
		const cartAwaitingRemoval = cart;
		setCart(cart.filter((item) => item.id !== id));
		const result = await deleteItemFromCartAPI(id);
		if (!result) {
			setCart(cartAwaitingRemoval);
		}
	};

	const updateItemQuantity = async (id: string, quantity: number) => {
		const cartAwaitingRemoval = cart;
		setCart(
			cart.map((item) => (item.id === id ? { ...item, quantity } : item))
		);
		const result = await updateItemToCartAPI(id, quantity);
		if (!result) {
			setCart(cartAwaitingRemoval);
		}
	};

	return (
		<cartContext.Provider
			value={{
				cart,
				addItemToCart,
				removeItemFromCart,
				updateItemQuantity
			}}
		>
			{children}
		</cartContext.Provider>
	);
}

export const useCart = () => {
	const context = useContext(cartContext);
	if (!context) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
};
