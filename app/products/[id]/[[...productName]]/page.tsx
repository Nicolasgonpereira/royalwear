import { ButtonAddtoCart } from "@/components/ui/buttonAddtoCart";
import GalleryCarousel from "@/components/ui/galleryCarousel";
import { Product } from "@prisma/client";
import { redirect } from "next/navigation";

type Params = Promise<{
	id: string;
	productName?: string;
}>;

export interface IProduct extends Product {
	category: {
		id: string;
		name: string;
		type: string;
	};
}

export async function generateStaticParams() {
	return [];
}

export default async function Page({ params }: { params: Params }) {
	const { id, productName } = await params;
	const apiUrl = process.env.API_URL;
	const data = await fetch(`${apiUrl}/products/${id}`, {
		next: { tags: [`products-${id}`] }
	});

	const product: IProduct = await data.json();

	const decodedName: string = decodeURIComponent(productName ?? "");
	if (decodedName !== product.name) {
		redirect(`/products/${product.id}/${product.name}`);
	}

	return (
		<main className="flex bg-primaryBg text-primaryBgForeground px-4 sm:px-6 lg:px-8">
			<div className="container mx-auto py-8">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div>
						<GalleryCarousel images={product.images} />
					</div>
					<div className="space-y-4">
						<div className="flex items-center justify-between font-bold">
							<h2 className="text-4xl font-bold">
								{product.name}
							</h2>
							<span className="font-semibold text-xl">
								{new Intl.NumberFormat("eng", {
									style: "currency",
									currency: "USD"
								}).format(Number(product.price))}
							</span>
						</div>
						<p className="">{product.description}</p>
						<div className="space-y-2">
							<div>Category: {product.category.name}</div>
							<div>Stock: {product.stock} units</div>
							{/* {product.size && <div>Size: {product.size}</div>} */}
						</div>
						<ButtonAddtoCart product={product} />
					</div>
				</div>
			</div>
		</main>
	);
}
