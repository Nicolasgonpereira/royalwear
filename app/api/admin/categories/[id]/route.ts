import { prisma } from "@/lib/prisma";
import { adminMiddleware } from "@/middlewares/auth/adminMiddleware";
import { authMiddleware } from "@/middlewares/auth/authMiddleware";
import { NextRequest, NextResponse } from "next/server";

export const PUT = authMiddleware(
	adminMiddleware(
		async (
			request: NextRequest,
			{ params }: { params: Promise<{ id: string }> }
		): Promise<NextResponse> => {
			const { id } = await params;
			const { name, type } = await request.json();

			try {
				const updatedCategory = await prisma.category.update({
					where: { id },
					data: {
						name,
						type
					}
				});
				return NextResponse.json(updatedCategory, { status: 200 });
			} catch {
				return NextResponse.json(
					{ message: "Error updating category" },
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
				await prisma.category.delete({
					where: { id }
				});

				return NextResponse.json(
					{ message: "Category deleted" },
					{ status: 200 }
				);
			} catch {
				return NextResponse.json(
					{ message: "Error deleting category" },
					{ status: 500 }
				);
			}
		}
	)
);
