"use client";

import Link from "next/link";
import { FormEvent } from "react";
import { useSignup } from "@/app/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Store, Rocket } from "lucide-react"; 
import { APP_ROUTES } from "@/lib/routes";

export default function SignupPage() {
	const router = useRouter();
	const signupMutation = useSignup();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		signupMutation.mutate(
			{ email, password },
			{
				onSuccess: () => {
					toast.success("Account created! Welcome aboard.");
					router.push("/");
				},
				onError: (error: Error & { fieldErrors?: Record<string, string[]> }) => {
					if (!error.fieldErrors) {
						toast.error(error.message || "Signup failed. Please try again.");
					}
				},
			}
		);
	};

	const fieldErrors = signupMutation.error && (signupMutation.error as Error & { fieldErrors?: Record<string, string[]> }).fieldErrors
		? (signupMutation.error as Error & { fieldErrors?: Record<string, string[]> }).fieldErrors
		: undefined;

	return (
		<div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
			{/* Left Side: Orange/Red Gradient */}
			<div className="hidden bg-gradient-to-br from-orange-900 to-red-950 lg:flex flex-col justify-between p-10 text-white">
				<div className="flex items-center gap-2 text-lg font-medium">
					<Store className="h-6 w-6" />
					<span>Marketplace Inc</span>
				</div>

				<div className="space-y-4">
					<div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/20 backdrop-blur-sm text-orange-200 mb-4">
						<Rocket className="h-6 w-6" />
					</div>
					<blockquote className="space-y-2">
						<p className="text-3xl font-bold leading-tight">
							&quot;Start your journey today. Join the fastest growing
							marketplace community.&quot;
						</p>
					</blockquote>
				</div>

				<div className="grid grid-cols-2 gap-4 text-sm text-orange-200">
					<div>
						<p className="font-bold text-white text-lg">2M+</p>
						<p>Monthly Visitors</p>
					</div>
					<div>
						<p className="font-bold text-white text-lg">$0</p>
						<p>To Open Shop</p>
					</div>
				</div>
			</div>

			{/* Right Side: Form */}
			<div className="flex items-center justify-center py-12 bg-background">
				<div className="mx-auto grid w-[350px] gap-6">
					<div className="grid gap-2 text-center">
						<h1 className="text-3xl font-bold">
							Create an account
						</h1>
						<p className="text-balance text-muted-foreground">
							Enter your email below to create your account
						</p>
					</div>

				<form onSubmit={handleSubmit} className="grid gap-4">
					{signupMutation.error && !(signupMutation.error as Error & { fieldErrors?: Record<string, string[]> }).fieldErrors && (
						<div className="text-sm text-destructive font-medium">
							{signupMutation.error.message}
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
									fieldErrors?.email
										? "border-destructive"
										: ""
								}
							/>
							{fieldErrors?.email && (
								<p className="text-xs text-destructive">
									{fieldErrors.email[0]}
								</p>
							)}
						</div>

						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								name="password"
								type="password"
								required
								className={
									fieldErrors?.password
										? "border-destructive"
										: ""
								}
							/>
							{fieldErrors?.password && (
								<p className="text-xs text-destructive">
									{fieldErrors.password[0]}
								</p>
							)}
						</div>

						<Button
							type="submit"
							className="w-full"
							disabled={signupMutation.isPending}>
							{signupMutation.isPending ? "Creating account..." : "Sign Up"}
						</Button>
					</form>

					<div className="mt-4 text-center text-sm">
						Already have an account?{" "}
						<Link
							href={APP_ROUTES.LOGIN}
							className="underline hover:text-primary">
							Login
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
