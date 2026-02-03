"use server";

import { API_ROUTES, API_BASE } from "@/lib/routes";
import { createSession, deleteSession } from "@/lib/session";
import { User } from "@/types/user";
import { redirect } from "next/navigation";
import { APIResponse } from "@/types/api";

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

export async function login({ email, password }: LoginParams): Promise<{ user: User }> {
	const url = `${API_BASE}${API_ROUTES.AUTH.LOGIN}`;
	
	let response: Response;
	try {
		response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
			body: JSON.stringify({ user: { email, password } }),
		});
	} catch (error) {
		const message = error instanceof Error ? error.message : "Network error occurred";
		console.error("[login] Network error:", { url, error: message });
		throw new Error(message);
	}

	let data: APIResponse<{ user: User }>;
	try {
		data = await response.json();
	} catch {
		data = {
			success: false,
			message: `Server returned invalid JSON (${response.status} ${response.statusText})`,
		};
	}

	if (!response.ok || !data.success) {
		const message = data.message || `Login failed with status ${response.status}`;
		
		if (response.status === 401) {
			console.error("[login] Unauthorized:", { message });
			throw new Error(message);
		}
		
		if (response.status === 422) {
			const fieldErrors = typeof data.errors === "object" && data.errors !== null
				? (data.errors as Record<string, string[]>)
				: undefined;
			console.error("[login] Validation error:", { message, fieldErrors });
			const error = new Error(message) as ErrorWithFieldErrors;
			error.fieldErrors = fieldErrors;
			throw error;
		}
		
		console.error("[login] Login failed:", { status: response.status, message });
		throw new Error(message);
	}

	const authHeader = response.headers.get("Authorization");
	if (authHeader) {
		const token = authHeader.split(" ")[1];
		await createSession(token);
	} else {
		console.warn("[login] No Authorization header in response");
	}

	return data.data as { user: User };
}

export async function signup({ email, password }: SignupParams): Promise<{ user: User }> {
	const url = `${API_BASE}${API_ROUTES.AUTH.SIGNUP}`;
	
	let response: Response;
	try {
		response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
			body: JSON.stringify({ user: { email, password } }),
		});
	} catch (error) {
		const message = error instanceof Error ? error.message : "Network error occurred";
		console.error("[signup] Network error:", { url, error: message });
		throw new Error(message);
	}

	let data: APIResponse<{ user: User }>;
	try {
		data = await response.json();
	} catch {
		data = {
			success: false,
			message: `Server returned invalid JSON (${response.status} ${response.statusText})`,
		};
	}

	if (!response.ok || !data.success) {
		const message = data.message || `Signup failed with status ${response.status}`;
		
		if (response.status === 422) {
			const fieldErrors = typeof data.errors === "object" && data.errors !== null
				? (data.errors as Record<string, string[]>)
				: undefined;
			console.error("[signup] Validation error:", { message, fieldErrors });
			const error = new Error(message) as ErrorWithFieldErrors;
			error.fieldErrors = fieldErrors;
			throw error;
		}
		
		console.error("[signup] Signup failed:", { status: response.status, message });
		throw new Error(message);
	}

	const authHeader = response.headers.get("Authorization");
	if (authHeader) {
		const token = authHeader.split(" ")[1];
		await createSession(token);
	} else {
		console.warn("[signup] No Authorization header in response");
	}

	return data.data as { user: User };
}

export async function logoutAction() {
	await deleteSession();
	redirect("/");
}

export async function clearSessionAction() {
	await deleteSession();
}
