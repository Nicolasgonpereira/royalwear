import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export default async function GET({ params }: { params: { id: string } }) {
	const { id } = params;

	try {
		const product = await prisma.product.findUnique({
			where: {
				id: String(id)
			},
			include: {
				category: true,
				reviews: true
			}
		});

		if (!product) {
			return NextResponse.json(
				{ message: "Product not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json(product, { status: 200 });
	} catch {
		return NextResponse.json(
			{ message: "Error fetching product" },
			{ status: 500 }
		);
	}
}
