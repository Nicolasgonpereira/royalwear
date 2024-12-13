/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET!;

export const authMiddleware =
	(
		handler: (
			request: NextRequest,
			params: any,
			response: NextResponse
		) => Promise<NextResponse>
	) =>
	async (
		request: NextRequest,
		params: any,
		response: NextResponse
	): Promise<NextResponse> => {
		const token = request.cookies.get("token")?.value;

		if (!token) {
			return NextResponse.json(
				{ message: "Unauthorized" },
				{ status: 401 }
			);
		}

		const decoded = jwt.verify(String(token), JWT_SECRET);

		if (!decoded) {
			return NextResponse.json(
				{ message: "Invalid or expired token" },
				{ status: 401 }
			);
		}

		(request as any).user = decoded;
		return handler(request, params, response);
	};
