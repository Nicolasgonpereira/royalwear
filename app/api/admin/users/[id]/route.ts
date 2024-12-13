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
			const { name, role } = await request.json();

			try {
				const user = await prisma.user.update({
					where: { id },
					data: {
						...(name && { name }),
						...(role && { role })
					}
				});

				if (!user) {
					return NextResponse.json(
						{ message: "User not found" },
						{ status: 404 }
					);
				}

				return NextResponse.json(user, { status: 200 });
			} catch {
				return NextResponse.json(
					{ message: "Error updating user" },
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
				const user = await prisma.user.delete({
					where: { id }
				});

				if (!user) {
					return NextResponse.json(
						{ message: "User not found" },
						{ status: 404 }
					);
				}

				return NextResponse.json(
					{ message: "User deleted" },
					{ status: 200 }
				);
			} catch {
				return NextResponse.json(
					{ message: "Error deleting user" },
					{ status: 500 }
				);
			}
		}
	)
);
