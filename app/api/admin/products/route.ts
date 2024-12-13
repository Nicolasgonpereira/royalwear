import { prisma } from "@/lib/prisma";
import { adminMiddleware } from "@/middlewares/auth/adminMiddleware";
import { authMiddleware } from "@/middlewares/auth/authMiddleware";
import { NextRequest, NextResponse } from "next/server";

export const POST = authMiddleware(
	adminMiddleware(async (request: NextRequest) => {
		const { name, description, price, stock, categoryId, images } =
			await request.json();

		try {
			const newProduct = await prisma.product.create({
				data: {
					name,
					description,
					price,
					stock,
					categoryId,
					images
				}
			});
			return NextResponse.json(newProduct, { status: 201 });
		} catch {
			return NextResponse.json(
				{ message: "Error creating product" },
				{ status: 500 }
			);
		}
	})
);
