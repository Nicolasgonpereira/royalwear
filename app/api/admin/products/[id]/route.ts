import { prisma } from "@/lib/prisma";
import { adminMiddleware } from "@/middlewares/auth/adminMiddleware";
import { authMiddleware } from "@/middlewares/auth/authMiddleware";
import { NextRequest, NextResponse } from "next/server";

export const PUT = authMiddleware(
	adminMiddleware(
		async (
			request: NextRequest,
			{ params }: { params: { id: string } }
		) => {
			const { id } = await params;
			const { name, description, price, stock, categoryId, images } =
				await request.json();

			try {
				const updatedProduct = await prisma.product.update({
					where: { id },
					data: {
						name,
						description,
						price,
						stock,
						categoryId,
						images
					}
				});
				return NextResponse.json(updatedProduct, { status: 200 });
			} catch {
				return NextResponse.json(
					{ message: "Error updating product" },
					{ status: 500 }
				);
			}
		}
	)
);

export const DELETE = authMiddleware(
	adminMiddleware(
		async (
			request: NextRequest,
			{ params }: { params: { id: string } }
		) => {
			const { id } = await params;

			try {
				await prisma.product.delete({
					where: { id }
				});

				return NextResponse.json(
					{ message: "Product deleted" },
					{ status: 200 }
				);
			} catch {
				return NextResponse.json(
					{ message: "Error deleting product" },
					{ status: 500 }
				);
			}
		}
	)
);
