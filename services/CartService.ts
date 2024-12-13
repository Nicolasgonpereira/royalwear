"use client";
import { CartItem } from "@prisma/client";

const apiUrl: string = process.env.API_URL || "http://localhost:3000/api";
let updatedCartItems: CartItem[] = [];

export async function addItem(
	cartItems: CartItem[],
	productId: string,
	quantity: number = 1
): Promise<CartItem[]> {
	updatedCartItems = [...cartItems];
	const existingItem = updatedCartItems.find(
		(item) => item.productId === productId
	);
	console.log(existingItem);
	if (existingItem) {
		existingItem.quantity += quantity;
		updateItemToCartAPI(existingItem.id, existingItem.quantity);
		console.log(
			"updated no cartservice after add quantity",
			updatedCartItems
		);
		return updatedCartItems;
	} else {
		const newCartItem: CartItem | undefined = await addItemToCartAPI(
			productId,
			quantity
		);
		if (newCartItem) {
			updatedCartItems.push(newCartItem);
			return updatedCartItems;
		} else {
			return cartItems;
		}
	}
}

export function getTotalItems(cartItems: CartItem[]): number {
	return cartItems.reduce((total, item) => total + item.quantity, 0);
}

export async function fetchCartFromAPI(): Promise<CartItem[] | undefined> {
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
): Promise<CartItem | undefined> {
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
	productId: string,
	quantity: number
): Promise<boolean | undefined> {
	try {
		const response = await fetch(`${apiUrl}/cart/${productId}`, {
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
