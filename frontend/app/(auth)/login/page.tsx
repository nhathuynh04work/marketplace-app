"use client";

import { useActionState, useEffect } from "react";
import { loginAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const [state, action, isPending] = useActionState(loginAction, null);
    const router = useRouter();

	useEffect(() => {
		if (state?.status === "success") {
			toast.success("Welcome back!");
			router.push("/");
		}
	}, [state, router]);

	return (
		<div className="flex h-screen items-center justify-center bg-slate-50">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Enter your email below to login to your account.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form action={action} className="grid gap-4">
						{state?.status === "error" && !state.fieldErrors && (
							<div className="text-sm text-red-500 font-medium">
								{state.message}
							</div>
						)}

						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								name="email"
								type="email"
								className={
									state?.fieldErrors?.email
										? "border-red-500"
										: ""
								}
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								name="password"
								type="password"
								className={
									state?.fieldErrors?.password
										? "border-red-500"
										: ""
								}
							/>
						</div>

						<Button type="submit" disabled={isPending}>
							{isPending ? "Logging in..." : "Login"}
						</Button>
					</form>
				</CardContent>
				<CardFooter className="flex justify-center">
					<p className="text-sm text-muted-foreground">
						Don&apos;t have an account?{" "}
						<Link
							href="/signup"
							className="text-primary hover:underline">
							Sign up
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
