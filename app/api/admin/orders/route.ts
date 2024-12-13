import { prisma } from "@/lib/prisma";
import { adminMiddleware } from "@/middlewares/auth/adminMiddleware";
import { authMiddleware } from "@/middlewares/auth/authMiddleware";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = authMiddleware(
	adminMiddleware(async (request: NextRequest) => {
		const searchParams = request.nextUrl.searchParams;
		const params = {
			status: searchParams.get("status") as OrderStatus | null,
			startDate: searchParams.get("startDate") as string | null,
			endDate: searchParams.get("endDate") as string | null
		};
		const { status, startDate, endDate } = params;

		try {
			const orders = await prisma.order.findMany({
				where: {
					...(status && { status }),
					...(startDate &&
						endDate && {
							createdAt: {
								gte: new Date(startDate),
								lte: new Date(endDate)
							}
						})
				},
				include: {
					products: {
						include: {
							product: true
						}
					}
				}
			});

			return NextResponse.json(orders, { status: 200 });
		} catch {
			return NextResponse.json(
				{ message: "Error fetching orders" },
				{ status: 500 }
			);
		}
	})
);
