/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import { authMiddleware } from "@/middlewares/auth/authMiddleware";
import { NextRequest, NextResponse } from "next/server";

interface User {
	id: string;
	name: string;
	email: string;
}

export const PUT = authMiddleware(
	async (request: NextRequest, params: { id: string }) => {
		const user: User = (request as any).user;
		const { quantity } = await request.json();
		const { id } = params;

		try {
			const updatedItem = await prisma.cartItem.update({
				where: {
					id: id,
					userId: user.id
				},
				data: {
					quantity
				}
			});

			return NextResponse.json(updatedItem, { status: 200 });
		} catch {
			return NextResponse.json(
				{ message: "Error updating cart items" },
				{ status: 500 }
			);
		}
	}
);
export const DELETE = authMiddleware(
	async (request: NextRequest, params: { id: string }) => {
		const user: User = (request as any).user;
		const { id } = params;

		try {
			await prisma.cartItem.delete({
				where: {
					id: id,
					userId: user.id
				}
			});

			return NextResponse.json({}, { status: 200 });
		} catch {
			return NextResponse.json(
				{ message: "Error deleting cart items" },
				{ status: 500 }
			);
		}
	}
);
