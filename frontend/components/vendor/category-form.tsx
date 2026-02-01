"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ShopCategory, Product } from "@/types/vendor";
import {
	useCreateShopCategory,
	useUpdateShopCategory,
} from "@/app/hooks/vendor/use-categories";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const categorySchema = z.object({
	name: z.string().min(1, "Name is required"),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface CategoryFormProps {
	category?: ShopCategory;
	allProducts?: Product[];
}

export function CategoryForm({ category, allProducts }: CategoryFormProps) {
	const router = useRouter();
	const { mutate: createCategory, isPending: isCreating } = useCreateShopCategory();
	const { mutate: updateCategory, isPending: isUpdating } = useUpdateShopCategory();

	const form = useForm<CategoryFormValues>({
		resolver: zodResolver(categorySchema),
		defaultValues: {
			name: category?.name || "",
		},
	});

	const isPending = isCreating || isUpdating;

	function onSubmit(values: CategoryFormValues) {
		if (category) {
			updateCategory(
				{ id: category.id, name: values.name },
				{
					onSuccess: () => {
						toast.success("Category updated successfully");
						router.push("/vendor/categories");
					},
					onError: (err) => toast.error(err.message),
				},
			);
		} else {
			createCategory(
				{ name: values.name },
				{
					onSuccess: () => {
						toast.success("Category created successfully");
						router.push("/vendor/categories");
						form.reset();
					},
					onError: (err) => toast.error(err.message),
				},
			);
		}
	}

	return (
		<Card className="max-w-md">
			<CardHeader>
				<CardTitle>
					{category ? "Edit Category" : "New Category"}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category Name</FormLabel>
									<FormControl>
										<Input
											placeholder="e.g. Electronics"
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
							disabled={isPending}>
							{isPending ? "Saving..." : "Save Category"}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
