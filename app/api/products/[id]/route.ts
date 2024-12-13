import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;

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
