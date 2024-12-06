import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const products = await prisma.product.findMany({
			include: {
				category: true
			}
		});
		return NextResponse.json(products, { status: 200 });
	} catch {
		return NextResponse.json(
			{ message: "Error listing products" },
			{ status: 500 }
		);
	}
}
