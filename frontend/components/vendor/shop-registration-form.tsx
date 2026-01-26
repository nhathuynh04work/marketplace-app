"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { registerShop } from "@/app/actions/vendor";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
	name: z.string().min(3, "Shop name must be at least 3 characters").max(50),
	description: z.string().max(500).optional(),
});

type ShopFormValues = z.infer<typeof formSchema>;

export default function ShopRegistrationForm() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<ShopFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			description: "",
		},
	});

	async function onSubmit(values: ShopFormValues) {
		setIsLoading(true);
		const formData = new FormData();
		formData.append("name", values.name);
		if (values.description)
			formData.append("description", values.description);

		const result = await registerShop(
			{ status: "idle", message: "" },
			formData,
		);

		setIsLoading(false);

		if (result.status === "success") {
			toast.success(result.message);
			router.refresh();
		} else {
			toast.error(result.message);

			if (result.fieldErrors) {
				Object.entries(result.fieldErrors).forEach(
					([field, errors]) => {
						if (errors && errors.length > 0) {
							form.setError(field as keyof ShopFormValues, {
								message: errors[0],
							});
						}
					},
				);
			}
		}
	}

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Register your Shop</CardTitle>
				<CardDescription>
					Start selling your products on our marketplace today.
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
											placeholder="Acme Store"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										This will be your unique public store
										name.
									</FormDescription>
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
											placeholder="Best products in town..."
											className="resize-none"
											rows={4}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							className="w-full"
							disabled={isLoading}>
							{isLoading ? "Creating Shop..." : "Register Shop"}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
