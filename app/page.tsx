"use client";
import Carousel from "@/components/ui/carousel";
import { getFeaturedProducts } from "@/services/ProductService";
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Home() {
	const [featuredProducts, setFeaturedProducts] = useState<
		Product[] | undefined
	>(undefined);

	useEffect(() => {
		const fetchFeaturedProducts = async (): Promise<void> => {
			setFeaturedProducts(await getFeaturedProducts());
		};
		fetchFeaturedProducts();
	}, []);

	return (
		<main>
			<header className="text-center py-8">
				<h1 className="text-4xl font-bold">Welcome to Royal Wear</h1>
				<p className="text-lg mt-2">
					Your one-stop shop for the latest fashion trends
				</p>
			</header>
			<section className="py-8">
				{featuredProducts && (
					<Carousel
						title="Featured Products"
						cards={featuredProducts}
					/>
				)}
			</section>
			<footer className="text-center py-4 bg-secondary text-secondaryForeground">
				<p>&copy; 2023 Royal Wear. All rights reserved.</p>
			</footer>
		</main>
	);
}
