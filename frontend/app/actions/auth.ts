"use server";

import { apiFetch } from "@/lib/api";
import { API_ROUTES } from "@/lib/routes";
import { createSession, deleteSession } from "@/lib/session";
import { FormState } from "@/types/form";
import { User } from "@/types/user";
import { redirect } from "next/navigation";

export async function loginAction(
	prevState: FormState,
	formData: FormData,
): Promise<FormState> {
	const email = formData.get("email");
	const password = formData.get("password");

	const { result, headers } = await apiFetch<{ user: User }>(
		API_ROUTES.AUTH.LOGIN,
		{
			method: "POST",
			body: JSON.stringify({ user: { email, password } }),
		},
	);

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

	const authHeader = headers.get("Authorization");
	if (authHeader) {
		const token = authHeader.split(" ")[1];
		await createSession(token);
	}

	return { status: "success", message: "Logged in successfully" };
}

export async function signupAction(
	prevState: FormState,
	formData: FormData,
): Promise<FormState> {
	const email = formData.get("email");
	const password = formData.get("password");

	const { result, headers } = await apiFetch<{ user: User }>(
		API_ROUTES.AUTH.SIGNUP,
		{
			method: "POST",
			body: JSON.stringify({
				user: { email, password },
			}),
		},
	);

	if (!result.success) {
		return {
			status: "error",
			message: result.message || "Failed to create account",
			fieldErrors:
				typeof result.errors === "object"
					? (result.errors as Record<string, string[]>)
					: undefined,
		};
	}

	const authHeader = headers.get("Authorization");
	if (authHeader) {
		const token = authHeader.split(" ")[1];
		await createSession(token);
	}

	return { status: "success", message: "Account created successfully" };
}

export async function logoutAction() {
	await deleteSession();
    redirect("/")
}
