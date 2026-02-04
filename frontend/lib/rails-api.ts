import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export const railsApi = {
    get: <T>(url: string) => request<T>(url, "GET"),
    post: <T>(url: string, body: unknown) => request<T>(url, "POST", body),
    put: <T>(url: string, body: unknown) => request<T>(url, "PUT", body),
    del: <T>(url: string) => request<T>(url, "DELETE"),
};

async function request<T>(url: string, method: string, body?: unknown): Promise<T> {
    const headers = await getHeaders();

    const options: RequestInit = {
        method,
        headers,
        ...(body ? { body: JSON.stringify(body) } : {}),
    };

    const response = await fetch(url, options);

    await redirectOnUnauthorized(response);

    return await parseResponse<T>(response);
}

async function getHeaders(): Promise<Record<string, string>> {
    const token = await getSession();

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
}

async function redirectOnUnauthorized(response: Response) {
    if (response.status === 401) {
        redirect("/api/auth/logout");
    }
}

async function parseResponse<T>(response: Response): Promise<T> {
    if (response.status === 204) {
        return {} as T;
    }

    let data;
    try {
        data = await response.json();
    } catch {
        throw new Error("Invalid JSON response from server");
    }

    if (!response.ok) {
        const errorMsg = data.errors || data.error || response.statusText;
        throw new Error(errorMsg);
    }

    return data as T;
}