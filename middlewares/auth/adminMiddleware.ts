/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

export const adminMiddleware =
	(
		handler: (
			request: NextRequest,
			params: any,
			response: NextResponse
		) => Promise<unknown>
	) =>
	async (request: NextRequest, params: any, response: NextResponse) => {
		const user = (request as any).user;

		if (!user || user.role !== "ADMIN") {
			return NextResponse.json(
				{ message: "Unauthorized" },
				{ status: 403 }
			);
		}

		return handler(request, params, response);
	};
