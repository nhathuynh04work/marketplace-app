"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { signupAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignupPage() {
	const [state, action, isPending] = useActionState(signupAction, null);
	const router = useRouter();

    useEffect(() => {
        if (state?.status === "success") {
            toast.success("Account created! Welcome aboard.");
            router.push("/");
        }
    }, [state, router]);

	return (
		<div className="flex h-screen items-center justify-center bg-slate-50">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">Create Account</CardTitle>
					<CardDescription>
						Enter your email below to create your new account.
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
							{state?.fieldErrors?.email && (
								<p className="text-xs text-red-500">
									{state.fieldErrors.email[0]}
								</p>
							)}
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
							{state?.fieldErrors?.password && (
								<p className="text-xs text-red-500">
									{state.fieldErrors.password[0]}
								</p>
							)}
						</div>

						<Button type="submit" disabled={isPending}>
							{isPending ? "Creating account..." : "Sign Up"}
						</Button>
					</form>
				</CardContent>
				<CardFooter className="flex justify-center">
					<p className="text-sm text-muted-foreground">
						Already have an account?{" "}
						<Link
							href="/login"
							className="text-primary hover:underline">
							Login
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
