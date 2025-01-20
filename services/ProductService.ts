import { IProduct } from "@/app/products/[id]/[[...productName]]/page";
import { Product } from "@prisma/client";

const apiUrl: string = process.env.API_URL || "http://localhost:3000/api";

export async function getProducts(): Promise<IProduct[] | undefined> {
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

interface IProductbyId extends Product {
	category: {
		id: string;
		name: string;
		type: string;
	};
	reviews: {
		id: string;
		userId: string;
		productId: string;
		rating: number;
		createAt: Date;
		comment?: string;
	}[];
}

export async function getProductById(
	productId: number
): Promise<IProductbyId | undefined> {
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

export async function getFeaturedProducts(): Promise<IProduct[] | undefined> {
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
