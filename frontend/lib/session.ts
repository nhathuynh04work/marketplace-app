import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "session_token";

export async function createSession(token: string) {
	const cookieStore = await cookies();
	cookieStore.set(SESSION_COOKIE_NAME, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		maxAge: 60 * 60 * 24 * 7, // 1 week
		path: "/",
		sameSite: "lax",
	});
}

export async function deleteSession() {
	const cookieStore = await cookies();
	cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getSession() {
	const cookieStore = await cookies();
	return cookieStore.get(SESSION_COOKIE_NAME)?.value;
}
