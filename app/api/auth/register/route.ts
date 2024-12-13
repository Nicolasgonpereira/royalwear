import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const { name, email, password } = await request.json();

	if (!name || !email || !password) {
		return NextResponse.json(
			{ message: "All fields are required" },
			{ status: 400 }
		);
	}

	const existingUser = await prisma.user.findUnique({ where: { email } });
	if (existingUser) {
		return NextResponse.json(
			{ message: "User already registered" },
			{ status: 409 }
		);
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await prisma.user.create({
		data: {
			name,
			email,
			password: hashedPassword
		}
	});

	return NextResponse.json(
		{
			message: "User successfully created",
			user: { id: user.id, email: user.email }
		},
		{ status: 201 }
	);
}
