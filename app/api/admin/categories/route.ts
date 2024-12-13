import { prisma } from "@/lib/prisma";
import { adminMiddleware } from "@/middlewares/auth/adminMiddleware";
import { authMiddleware } from "@/middlewares/auth/authMiddleware";
import { NextRequest, NextResponse } from "next/server";

export const POST = authMiddleware(
	adminMiddleware(async (request: NextRequest) => {
		const { name, type } = await request.json();

		try {
			const newCategory = await prisma.category.create({
				data: {
					name,
					type
				}
			});
			return NextResponse.json(newCategory, { status: 201 });
		} catch {
			return NextResponse.json(
				{ message: "Error creating category" },
				{ status: 500 }
			);
		}
	})
);
