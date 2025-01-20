import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
	return (
		<Link
			href={`/products/${product.id}/${product.name}`}
			className="group cursor-pointer rounded-xl p-3 space-y-2"
		>
			<div className="aspect-square rounded-xl bg-gray-100">
				<Image
					src={product.images[0]}
					alt={product.name}
					width={300}
					height={300}
					className="rounded-md w-full h-full object-cover"
				/>
			</div>
			<div>
				<p className="font-semibold text-lg">{product.name}</p>
			</div>
			<div className="flex items-center justify-between -mt-4">
				<div className="font-semibold">
					{new Intl.NumberFormat("eng", {
						style: "currency",
						currency: "USD"
					}).format(Number(product.price))}
				</div>
			</div>
		</Link>
	);
}
