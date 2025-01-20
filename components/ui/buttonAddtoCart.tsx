"use client";

import { IProduct } from "@/app/products/[id]/[[...productName]]/page";
import { useCart } from "@/context/cartContext";
import { useState } from "react";

export function ButtonAddtoCart({ product }: { product: IProduct }) {
	const [loading, setLoading] = useState<boolean>(false);
	const { addItemToCart } = useCart();
	const handleAddtoCart = async () => {
		setLoading(true);
		await addItemToCart(product.id);
		setLoading(false);
	};

	return (
		<button
			className="bg-primary enabled:hover:bg-secondary text-primaryForeground px-4 py-2 rounded-lg"
			onClick={handleAddtoCart}
			disabled={loading}
		>
			{loading ? (
				<span className="flex items-center">
					<svg
						className="motion-reduce:hidden animate-spin -ml-1 h-5 w-5 mr-3"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth={4}
						></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					Processing...
				</span>
			) : (
				"Add to Cart"
			)}
		</button>
	);
}
