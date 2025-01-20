"use client";
import { CartWithProductIncluded } from "@/types/cart";

const apiUrl: string = process.env.API_URL || "http://localhost:3000/api";
let updatedCartItems: CartWithProductIncluded[] = [];

export async function addItem(
	cartItems: CartWithProductIncluded[],
	productId: string,
	quantity: number = 1
): Promise<CartWithProductIncluded[]> {
	updatedCartItems = [...cartItems];
	const existingItem = updatedCartItems.find(
		(item) => item.productId === productId
	);
	if (existingItem) {
		existingItem.quantity += quantity;
		updateItemToCartAPI(existingItem.id, existingItem.quantity);
		return updatedCartItems;
	} else {
		const newCartItem: CartWithProductIncluded | undefined =
			await addItemToCartAPI(productId, quantity);
		if (newCartItem) {
			updatedCartItems.push(newCartItem);
			return updatedCartItems;
		} else {
			return cartItems;
		}
	}
}

export function getTotalItems(cartItems: CartWithProductIncluded[]): number {
	return cartItems.reduce((total, item) => total + item.quantity, 0);
}

export async function fetchCartFromAPI(): Promise<
	CartWithProductIncluded[] | undefined
> {
	try {
		const response = await fetch(`${apiUrl}/cart`);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const items = await response.json();
		return items;
	} catch (error) {
		console.error("Error fetching cart from API:", error);
	}
}

async function addItemToCartAPI(
	productId: string,
	quantity: number
): Promise<CartWithProductIncluded | undefined> {
	try {
		const response = await fetch(`${apiUrl}/cart`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ productId, quantity })
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const item = await response.json();
		return item;
	} catch (error) {
		console.error("Error adding item to cart API:", error);
	}
}

export async function updateItemToCartAPI(
	id: string,
	quantity: number
): Promise<boolean | undefined> {
	try {
		const response = await fetch(`${apiUrl}/cart/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ quantity })
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return response.ok;
	} catch (error) {
		console.error("Error updating cart to API:", error);
	}
}

export async function deleteItemFromCartAPI(
	productId: string
): Promise<boolean | undefined> {
	try {
		const response = await fetch(`${apiUrl}/cart/${productId}`, {
			method: "DELETE"
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return response.ok;
	} catch (error) {
		console.error("Error deleting item from cart API:", error);
	}
}
