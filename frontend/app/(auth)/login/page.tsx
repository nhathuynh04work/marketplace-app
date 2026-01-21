"use client";

import { useActionState, useEffect } from "react";
import { loginAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Store } from "lucide-react"; 

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
		<div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
			{/* Left Side: Blue/Purple Gradient */}
			<div className="hidden bg-linear-to-br from-blue-900 to-indigo-950 lg:flex flex-col justify-between p-10 text-white">
				<div className="flex items-center gap-2 text-lg font-medium">
					<Store className="h-6 w-6" />
					<span>Marketplace Inc</span>
				</div>
				<div className="space-y-4">
					<div className="inline-block rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-200 backdrop-blur-sm">
						Vendor Portal
					</div>
					<blockquote className="space-y-2 max-w-lg">
						<p className="text-3xl font-bold leading-tight">
							&quot;Manage your shop, track orders, and grow your
							business all in one place.&quot;
						</p>
					</blockquote>
				</div>
				<div className="flex items-center gap-4 text-sm text-blue-200">
					<div className="flex -space-x-2">
						<div className="h-8 w-8 rounded-full border-2 border-indigo-900 bg-gray-500"></div>
						<div className="h-8 w-8 rounded-full border-2 border-indigo-900 bg-gray-400"></div>
						<div className="h-8 w-8 rounded-full border-2 border-indigo-900 bg-gray-300"></div>
					</div>
					<p>Trusted by 5,000+ vendors</p>
				</div>
			</div>

			{/* Right Side: Form */}
			<div className="flex items-center justify-center py-12 bg-background">
				<div className="mx-auto grid w-87.5 gap-6">
					<div className="grid gap-2 text-center">
						<h1 className="text-3xl font-bold">Login</h1>
						<p className="text-balance text-muted-foreground">
							Enter your email below to login to your account
						</p>
					</div>

					<form action={action} className="grid gap-4">
						{state?.status === "error" && !state.fieldErrors && (
							<div className="text-sm text-destructive font-medium">
								{state.message}
							</div>
						)}

						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="m@example.com"
								required
								className={
									state?.fieldErrors?.email
										? "border-destructive"
										: ""
								}
							/>
						</div>

						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
								<Link
									href="/forgot-password"
									className="ml-auto inline-block text-sm underline">
									Forgot your password?
								</Link>
							</div>
							<Input
								id="password"
								name="password"
								type="password"
								required
								className={
									state?.fieldErrors?.password
										? "border-destructive"
										: ""
								}
							/>
						</div>

						<Button
							type="submit"
							className="w-full"
							disabled={isPending}>
							{isPending ? "Logging in..." : "Login"}
						</Button>
					</form>

					<div className="mt-4 text-center text-sm">
						Don&apos;t have an account?{" "}
						<Link
							href="/signup"
							className="underline hover:text-primary">
							Sign up
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
