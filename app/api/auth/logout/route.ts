import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export default async function POST() {
	const cookieStore = await cookies();
	cookieStore.delete("token");
	return NextResponse.json(
		{ message: "Logout successfully" },
		{ status: 200 }
	);
}
