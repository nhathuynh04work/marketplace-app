"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useRegisterShop } from "@/app/hooks/vendor/use-shops";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const shopSchema = z.object({
	name: z.string().min(3, "Shop name must be at least 3 characters"),
	description: z.string().optional(),
});

type ShopFormValues = z.infer<typeof shopSchema>;

export function ShopRegistrationForm() {
	const router = useRouter();
	const { mutate: registerShop, isPending } = useRegisterShop();

	const form = useForm<ShopFormValues>({
		resolver: zodResolver(shopSchema),
		defaultValues: {
			name: "",
			description: "",
		},
	});

	function onSubmit(values: ShopFormValues) {
		const formData = new FormData();
		formData.append("shop[name]", values.name);
		if (values.description) {
			formData.append("shop[description]", values.description);
		}

		registerShop(
			{ data: formData },
			{
				onSuccess: () => {
					toast.success("Shop registered successfully!");
					router.push("/vendor/dashboard");
				},
				onError: (error) => {
					toast.error(error.message || "Failed to register shop");
				},
			},
		);
	}

	return (
		<Card className="w-full max-w-lg mx-auto">
			<CardHeader>
				<CardTitle>Register your Shop</CardTitle>
				<CardDescription>
					Start selling on our marketplace today.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Shop Name</FormLabel>
									<FormControl>
										<Input
											placeholder="My Awesome Store"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Tell us about your shop..."
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Optional description for your shop
										profile.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							className="w-full"
							disabled={isPending}>
							{isPending ? "Registering..." : "Register Shop"}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
