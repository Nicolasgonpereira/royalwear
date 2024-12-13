import { Product } from "@prisma/client";
import Image from "next/image";

export default function CarouselProductCard({ product }: { product: Product }) {
	return (
		<div
			key={product.id}
			className="flex flex-col flex-shrink-0 w-60 text-foreground p-4 cursor-pointer"
		>
			<Image
				src={product.images[0]}
				alt="Product Image"
				width={200}
				height={300}
				className="rounded-sm h-full mx-1 shadow-md"
				draggable={false}
			></Image>
			<span className="font-bold mt-2 mx-1">{product.name}</span>
			<span className="mx-1">
				{new Intl.NumberFormat("eng", {
					style: "currency",
					currency: "USD"
				}).format(Number(product.price))}
			</span>
		</div>
	);
}
