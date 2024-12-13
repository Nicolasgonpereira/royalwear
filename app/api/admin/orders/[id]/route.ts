import { prisma } from "@/lib/prisma";
import { adminMiddleware } from "@/middlewares/auth/adminMiddleware";
import { authMiddleware } from "@/middlewares/auth/authMiddleware";
import { NextRequest, NextResponse } from "next/server";

export const GET = authMiddleware(
	adminMiddleware(
		async (
			request: NextRequest,
			{ params }: { params: { id: string } }
		) => {
			const { id } = await params;

			try {
				const order = await prisma.order.findUnique({
					where: { id },
					include: {
						products: {
							include: {
								product: true
							}
						}
					}
				});

				if (!order) {
					return NextResponse.json(
						{ message: "Order not found" },
						{ status: 404 }
					);
				}

				return NextResponse.json(order, { status: 200 });
			} catch {
				return NextResponse.json(
					{ message: "Error fetching order details" },
					{ status: 500 }
				);
			}
		}
	)
);

export const PUT = authMiddleware(
	adminMiddleware(
		async (
			request: NextRequest,
			{ params }: { params: { id: string } }
		) => {
			const { id } = await params;
			const { status } = await request.json();

			try {
				const updatedOrder = await prisma.order.update({
					where: { id },
					data: { status }
				});

				return NextResponse.json(updatedOrder, { status: 200 });
			} catch {
				return NextResponse.json(
					{ message: "Error updating order status" },
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
				await prisma.order.delete({
					where: { id }
				});

				return NextResponse.json(
					{ message: "Order deleted" },
					{ status: 200 }
				);
			} catch {
				return NextResponse.json(
					{ message: "Error deleting order" },
					{ status: 500 }
				);
			}
		}
	)
);
