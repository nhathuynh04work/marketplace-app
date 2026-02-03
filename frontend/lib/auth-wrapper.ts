"use server";

import { deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

type ErrorWithStatus = Error & {
    status?: number;
};

export async function withAuth<T>(
    action: () => Promise<T>,
    redirectUrl: string = "/auth/login?expired=true"
): Promise<T> {
    try {
        return await action();
    } catch (error) {
        if (error instanceof Error) {
            const errorWithStatus = error as ErrorWithStatus;
            if (errorWithStatus.status === 401) {
                console.warn("[withAuth] 401 Unauthorized - clearing session and redirecting");
                await deleteSession();
                redirect(redirectUrl);
            }
        }

        throw error;
    }
}
