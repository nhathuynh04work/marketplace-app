"use server";

import { createSession } from "@/lib/session";
import { APIResponse } from "@/types/api";
import { FormState } from "@/types/form";

export async function loginAction(
	prevState: FormState,
	formData: FormData,
): Promise<FormState> {
	const email = formData.get("email");
	const password = formData.get("password");

	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/login`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					user: { email, password },
				}),
			},
		);

		const result: APIResponse = await response.json();

		if (!result.success) {
			return {
				status: "error",
				message: result.message || "Invalid credentials",

				fieldErrors:
					typeof result.errors === "object"
						? (result.errors as Record<string, string[]>)
						: undefined,
			};
		}

		const authHeader = response.headers.get("Authorization");
		if (authHeader) {
			const token = authHeader.split(" ")[1];
			await createSession(token);
		}
		return { status: "success", message: "Logged in successfully" };
	} catch {
		return {
			status: "error",
			message: "Invalid credentials",
		};
	}
}

export async function signupAction(
	prevState: FormState,
	formData: FormData,
): Promise<FormState> {
	const email = formData.get("email");
	const password = formData.get("password");

	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/signup`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					user: { email, password },
				}),
			},
		);

		const result: APIResponse = await response.json();

		if (!result.success) {
			return {
				status: "error",
				message: result.message,
				fieldErrors:
					typeof result.errors === "object"
						? (result.errors as Record<string, string[]>)
						: undefined,
			};
		}

		const authHeader = response.headers.get("Authorization");
		if (authHeader) {
			const token = authHeader.split(" ")[1];
			await createSession(token);
		}
		return { status: "success", message: "Account created successfully" };
	} catch {
		return {
			status: "error",
			message: "Network error. Please try again.",
		};
	}
}
