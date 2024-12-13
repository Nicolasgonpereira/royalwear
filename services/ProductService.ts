import { Product } from "@prisma/client";

const apiUrl: string = process.env.API_URL || "http://localhost:3000/api";

export async function getProducts(): Promise<Product[] | undefined> {
	try {
		const response = await fetch(`${apiUrl}/products`);
		if (!response.ok) {
			throw new Error("Error fetching products");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching products:", error);
	}
}

export async function getProductById(
	productId: number
): Promise<Product | undefined> {
	try {
		const response = await fetch(`${apiUrl}/products/${productId}`);
		if (!response.ok) {
			throw new Error(`Error fetching product with ID ${productId}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(`Error fetching product with ID ${productId}:`, error);
	}
}

export async function getFeaturedProducts(): Promise<Product[] | undefined> {
	try {
		const response = await fetch(`${apiUrl}/products`);
		if (!response.ok) {
			throw new Error("Error fetching featured products");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching featured products:", error);
	}
}
