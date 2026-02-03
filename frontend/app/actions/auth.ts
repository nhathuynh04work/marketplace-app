"use server";

import { API_URLS } from "@/lib/routes";
import { createSession, deleteSession } from "@/lib/session";
import { User } from "@/types/user";
import { redirect } from "next/navigation";

type ErrorWithFieldErrors = Error & {
	fieldErrors?: Record<string, string[]>;
};

interface LoginParams {
	email: string;
	password: string;
}

interface SignupParams {
	email: string;
	password: string;
}

export async function loginAction({ email, password }: LoginParams): Promise<{ user: User }> {
	try {
		const response = await fetch(API_URLS.AUTH.LOGIN, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ user: { email, password } }),
		});

		const data = await response.json() as {
			user?: User;
			errors?: Record<string, string[]> | string;
		};

		if (!response.ok) {
			if (data.errors) {
				if (typeof data.errors === "string") {
					throw new Error(data.errors);
				} else {
					const error = new Error("Validation failed") as ErrorWithFieldErrors;
					error.fieldErrors = data.errors;
					throw error;
				}
			}
			throw new Error(`Login failed with status ${response.status}`);
		}

		const authHeader = response.headers.get("Authorization");
		if (authHeader) {
			const token = authHeader.split(" ")[1];
			await createSession(token);
		}

		return { user: data.user as User };
	} catch (error) {
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Network error occurred");
	}
}

export async function signupAction({ email, password }: SignupParams): Promise<{ user: User }> {
	try {
		const response = await fetch(API_URLS.AUTH.SIGNUP, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ user: { email, password } }),
		});

		const data = await response.json() as {
			user?: User;
			errors?: Record<string, string[]> | string;
		};

		if (!response.ok) {
			if (data.errors) {
				if (typeof data.errors === "string") {
					throw new Error(data.errors);
				} else {
					const error = new Error("Validation failed") as ErrorWithFieldErrors;
					error.fieldErrors = data.errors;
					throw error;
				}
			}
			throw new Error(`Signup failed with status ${response.status}`);
		}

		const authHeader = response.headers.get("Authorization");
		if (authHeader) {
			const token = authHeader.split(" ")[1];
			await createSession(token);
		}

		return { user: data.user as User };
	} catch (error) {
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Network error occurred");
	}
}

export async function logoutAction() {
	await deleteSession();
	redirect("/");
}
