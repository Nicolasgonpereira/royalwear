/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import { authMiddleware } from "@/middlewares/auth/authMiddleware";
import { NextRequest, NextResponse } from "next/server";

interface User {
	id: string;
	name: string;
	email: string;
}

export const GET = authMiddleware(async (request: NextRequest) => {
	const user: User = (request as any).user;
	try {
		const cartItems = await prisma.cartItem.findMany({
			where: { userId: user.id },
			include: {
				product: true
			}
		});

		return NextResponse.json(cartItems, { status: 200 });
	} catch {
		return NextResponse.json(
			{ message: "Error listing cart items" },
			{ status: 500 }
		);
	}
});

export const POST = authMiddleware(async (request: NextRequest) => {
	const user: User = (request as any).user;
	const { productId, quantity } = await request.json();

	try {
		const cartItem = await prisma.cartItem.create({
			data: {
				quantity,
				userId: user.id,
				productId
			}
		});

		return NextResponse.json(cartItem, { status: 201 });
	} catch {
		return NextResponse.json(
			{ message: "Error adding product to cart." },
			{ status: 500 }
		);
	}
});
