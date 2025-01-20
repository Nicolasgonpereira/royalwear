import ProductCard from "@/components/ui/product-card";
import { Product } from "@prisma/client";

const apiUrl = process.env.API_URL || "http://localhost:3000/api";

export default async function Page() {
	const data = await fetch(`${apiUrl}/products`, {
		next: { tags: ["products"] }
	});
	const products: Product[] = await data.json();

	return (
		<main className="bg-primaryBg text-primaryBgForeground px-4 sm:px-6 lg:px-8">
			<section>
				<h2 className="text-xl font-semibold mb-4">Products</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
					{products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</section>
		</main>
	);
}
