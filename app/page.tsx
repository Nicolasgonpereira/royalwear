import ProductCard from "@/components/ui/product-card";
import { IProduct } from "./products/[id]/[[...productName]]/page";

const apiUrl = process.env.API_URL || "http://localhost:3000/api";

export default async function Home() {
	const data = await fetch(`${apiUrl}/products`, {
		next: { tags: ["products"] }
	});
	const products: IProduct[] = await data.json();

	return (
		<main>
			<header className="text-center py-8">
				<h1 className="text-4xl font-bold">Welcome to Royal Wear</h1>
				<p className="text-lg mt-2">
					Your one-stop shop for the latest fashion trends
				</p>
			</header>
			{/* Featured Products will be add later */}
			{/* <section className="py-8">
				{products && (
					<Carousel title="Featured Products" cards={products} />
				)}
			</section> */}
			<div className="flex flex-col items-center">
				<h2 className="text-2xl font-bold mb-4">Meet our products</h2>
				<section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
					{products?.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</section>
			</div>
			<footer className="text-center py-4 bg-secondary text-secondaryForeground">
				<p>&copy; 2023 Royal Wear. All rights reserved.</p>
			</footer>
		</main>
	);
}
