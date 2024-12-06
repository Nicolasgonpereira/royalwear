import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function GET() {
	const cookieStore = await cookies();
	const token = cookieStore.get("token");

	if (!token) {
		return NextResponse.json(
			{ message: "User not authenticated" },
			{ status: 401 }
		);
	}

	try {
		const decoded = jwt.verify(String(token), JWT_SECRET);
		return NextResponse.json(
			{ message: "User authenticated", user: decoded },
			{ status: 200 }
		);
	} catch {
		return NextResponse.json({ message: "Invalid token" }, { status: 401 });
	}
}
