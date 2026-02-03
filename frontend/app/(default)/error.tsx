"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const router = useRouter();

	useEffect(() => {
		// If it's an authentication error, redirect to home
		if (error.message === "Unauthorized") {
			router.push("/");
			router.refresh();
		}
	}, [error, router]);

	// For unauthorized errors, show nothing (we're redirecting)
	if (error.message === "Unauthorized") {
		return null;
	}

	// For other errors, show an error message
	return (
		<div className="flex min-h-[400px] flex-col items-center justify-center">
			<h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
			<p className="text-muted-foreground mb-4">{error.message}</p>
			<button
				onClick={() => reset()}
				className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
				Try again
			</button>
		</div>
	);
}
