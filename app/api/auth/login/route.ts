import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function POST(request: NextRequest) {
	const { email, password } = await request.json();

	if (!email || !password) {
		return NextResponse.json(
			{ message: "All fields are required" },
			{ status: 400 }
		);
	}

	const user = await prisma.user.findUnique({ where: { email } });
	if (!user) {
		return NextResponse.json(
			{ message: "Invalid credentials" },
			{ status: 401 }
		);
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		return NextResponse.json(
			{ message: "Invalid credentials" },
			{ status: 401 }
		);
	}

	const token = jwt.sign(
		{ id: user.id, name: user.name, email: user.email },
		JWT_SECRET,
		{ expiresIn: "2d" }
	);

	const cookieStore = await cookies();
	cookieStore.set("token", token, { maxAge: 1 * 24 * 60 * 60 });

	return NextResponse.json(
		{ message: "Login successfully" },
		{ status: 200 }
	);
}
