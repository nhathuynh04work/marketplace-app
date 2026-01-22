"use server";

import { getSession } from "@/lib/session";
import { APIResponse } from "@/types/api";
import { API_BASE } from "./routes";

type FetchOptions = RequestInit & {
	requiresAuth?: boolean;
};

type FetchResult<T> = {
	result: APIResponse<T>;
	headers: Headers;
	status: number;
};

export async function apiFetch<T = unknown>(
	endpoint: string,
	options: FetchOptions = {},
): Promise<FetchResult<T>> {
	const { requiresAuth = false, headers: customHeaders, ...rest } = options;

	const headers = new Headers(customHeaders);

	if (!headers.has("Content-Type")) {
		headers.set("Content-Type", "application/json");
	}
	if (!headers.has("Accept")) {
		headers.set("Accept", "application/json");
	}

	if (requiresAuth) {
		const token = await getSession();
		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}
	}

	const url = endpoint.startsWith("http")
		? endpoint
		: `${API_BASE}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

	try {
		const response = await fetch(url, {
			headers,
			...rest,
		});

		let data: APIResponse<T>;
		try {
			data = (await response.json()) as APIResponse<T>;
		} catch {
			data = {
				success: false,
				message: `Server Error: ${response.statusText}`,
			};
		}

		return {
			result: data,
			headers: response.headers,
			status: response.status,
		};
	} catch (error) {
		return {
			result: {
				success: false,
				message:
					error instanceof Error
						? error.message
						: "Network error occurred",
			},
			headers: new Headers(),
			status: 0,
		};
	}
}
