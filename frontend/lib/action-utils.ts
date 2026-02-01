"use server";

import { apiFetch } from "./api";

export type ActionResult<T> = {
    success: true;
    data: T;
    message?: string;
} | {
    success: false;
    error: string;
    fieldErrors?: Record<string, string[]>;
};

export async function fetchAction<T>(
    endpoint: string,
    options?: Parameters<typeof apiFetch>[1],
): Promise<T> {
    const { result } = await apiFetch<T>(endpoint, options);

    if (!result.success) {
        const error = new Error(result.message || "An error occurred");
        if (typeof result.errors === "object") {
            (error as Error & { fieldErrors?: Record<string, string[]> }).fieldErrors = result.errors;
        }
        throw error;
    }

    return (result.data !== undefined ? result.data : result) as T;
}

export async function fetchQuery<T>(
    endpoint: string,
    options?: Parameters<typeof apiFetch>[1],
): Promise<T> {
    return fetchAction<T>(endpoint, { ...options, requiresAuth: true });
}

export async function fetchMutation<T>(
    endpoint: string,
    options?: Parameters<typeof apiFetch>[1],
): Promise<T> {
    return fetchAction<T>(endpoint, { ...options, requiresAuth: true });
}
