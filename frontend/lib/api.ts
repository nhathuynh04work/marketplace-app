"use server";

import { getSession } from "@/lib/session";
import { APIResponse } from "@/types/api";
import { API_BASE } from "./routes";
import { clearSessionAndRedirect } from "@/app/actions/auth";

type ErrorWithFieldErrors = Error & {
    fieldErrors?: Record<string, string[]>;
};

type ApiFetchOptions = RequestInit & {
    requiresAuth?: boolean;
};

export async function apiFetch<T = unknown>(
    endpoint: string,
    options: ApiFetchOptions = {},
): Promise<T> {
    const { requiresAuth = false, headers: customHeaders, body, ...rest } = options;
    const headers = new Headers(customHeaders);

    if (body && !(body instanceof FormData)) {
        if (!headers.has("Content-Type")) {
            headers.set("Content-Type", "application/json");
        }
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

    let response: Response;
    try {
        response = await fetch(url, {
            headers,
            body,
            ...rest,
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Network error occurred";
        console.error("[apiFetch] Network error:", { url, error: message });
        throw new Error(message);
    }

    let data: APIResponse<T>;
    try {
        data = (await response.json()) as APIResponse<T>;
    } catch {
        data = {
            success: false,
            message: `Server returned invalid JSON (${response.status} ${response.statusText})`,
        };
    }

    if (!response.ok) {
        const message = data.message || `Request failed with status ${response.status}`;

        switch (response.status) {
            case 401:
                console.error("[apiFetch] Unauthorized:", { url, message });
                await clearSessionAndRedirect();

            case 422:
                const fieldErrors = typeof data.errors === "object" && data.errors !== null
                    ? (data.errors as Record<string, string[]>)
                    : undefined;
                console.error("[apiFetch] Validation error:", { url, message, fieldErrors });
                const validationError = new Error(message) as ErrorWithFieldErrors;
                validationError.fieldErrors = fieldErrors;
                throw validationError;

            default:
                console.error("[apiFetch] API error:", { url, status: response.status, message });
                throw new Error(message);
        }
    }

    if (!data.success) {
        const message = data.message || "Request failed";
        console.error("[apiFetch] Request failed:", { url, message });
        throw new Error(message);
    }

    return (data.data !== undefined && data.data !== null ? data.data : data) as T;
}
