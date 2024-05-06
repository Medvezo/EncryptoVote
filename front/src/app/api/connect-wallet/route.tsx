import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
	if (request.method !== "POST") {
		return new NextResponse(null, { status: 405 });
	}

	console.log("Reached /api/connect-wallet");

	try {
		const reqBody = await request.json();

		//  POST to Laravel .
		const response = await axios.post("http://127.0.0.1:8000/login", reqBody);

		return new NextResponse(JSON.stringify(response.data), {
			status: response.status,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error: any) {
		// If an error occurs, parse the error response and send it back.
		const status = error.response?.status || 500;
		const data = error.response?.data || { error: "An error occurred" };

		return new NextResponse(JSON.stringify(data), {
			status,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
}
