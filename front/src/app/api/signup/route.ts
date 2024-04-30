import { NextRequest, NextResponse } from "next/server";
import axiosBase from "@/helpers/axiosBase";

// The POST function is defined to handle POST requests specifically.
export async function POST(request: NextRequest) {
	// Check if the method is POST, otherwise return method not allowed.
	if (request.method !== "POST") {
		return new NextResponse(null, { status: 405 });
	}
	console.log("Reached /api/signup");

	try {
		// Extract the request body
		const reqBody = await request.json();

		// Make the POST request to the Laravel backend with axios to create a new user.
		const response = await axiosBase.post("http://127.0.0.1:8000/register", reqBody);
		console.log("Signup request sent", reqBody);

		// Create a new NextResponse object with the response data and status.
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
