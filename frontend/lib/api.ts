"use server";

import { getSession } from "@/lib/session";
import { APIResponse } from "@/types/api";
import { API_BASE } from "./routes";

type ApiFetchOptions = RequestInit & {
    requiresAuth?: boolean;
};

class ApiError extends Error {
    constructor(
        message: string,
        public errors?: Record<string, string[]> | string,
        public statusCode?: number
    ) {
        super(message);
        this.name = "ApiError";
    }
}

export async function apiFetch<T = unknown>(
    endpoint: string,
    options: ApiFetchOptions = {},
): Promise<T> {
    const { requiresAuth = false, headers: customHeaders, body, ...rest } = options;
    const headers = new Headers(customHeaders);

    if (requiresAuth) {
        const token = await getSession();
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
    }

    const url = `${API_BASE}/${endpoint}`;

    try {
        const response = await fetch(url, {
            headers,
            body,
            ...rest,
        });

        const jsonResponse = (await response.json()) as APIResponse<T>;

        if (!jsonResponse.success) {
            throw new ApiError(
                jsonResponse.message || "API request failed",
                jsonResponse.errors,
                response.status
            );
        }

        return jsonResponse.data as T;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        
        console.error("Fetch error:", error);
        throw new ApiError(
            error instanceof Error ? error.message : "An unexpected error occurred",
            "Network or parsing error"
        );
    }
}

export { ApiError };
