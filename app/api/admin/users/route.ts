import { prisma } from "@/lib/prisma";
import { adminMiddleware } from "@/middlewares/auth/adminMiddleware";
import { authMiddleware } from "@/middlewares/auth/authMiddleware";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = authMiddleware(
	adminMiddleware(async (request: NextRequest) => {
		const searchParams = request.nextUrl.searchParams;
		const params = {
			name: searchParams.get("name") as string | null,
			email: searchParams.get("email") as string | null,
			role: searchParams.get("role") as Role | null
		};
		const { name, email, role } = params;

		try {
			const users = await prisma.user.findMany({
				where: {
					...(name && {
						name: { contains: name, mode: "insensitive" }
					}),
					...(email && {
						email: { contains: email, mode: "insensitive" }
					}),
					...(role && { role })
				},
				select: {
					id: true,
					name: true,
					email: true,
					role: true,
					createdAt: true,
					updatedAt: true
				}
			});

			return NextResponse.json(users, { status: 200 });
		} catch {
			return NextResponse.json(
				{ message: "Error fetching users" },
				{ status: 500 }
			);
		}
	})
);
