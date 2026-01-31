"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Product, ShopCategory } from "@/types/vendor";

import {
	useCreateProduct,
	useUpdateProduct,
} from "@/app/hooks/vendor/use-products";
import { useShopCategories } from "@/app/hooks/vendor/use-categories";

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
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const productSchema = z.object({
	name: z.string().min(1, "Name is required"),
	description: z.string().min(1, "Description is required"),
	price: z.coerce.number().min(0, "Price must be positive"),
	stock: z.coerce.number().int().min(0, "Stock must be a positive integer"),
	shop_category_id: z.string().min(1, "Category is required"),
	images: z.any().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
	existingProduct?: Product;
}

export function ProductForm({ existingProduct }: ProductFormProps) {
	const router = useRouter();

	const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
	const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();
	const { data: categoriesData, isLoading: isLoadingCategories } =
		useShopCategories();

	const categories: ShopCategory[] = Array.isArray(categoriesData)
		? categoriesData
		: categoriesData?.data || [];

	const isSubmitting = isCreating || isUpdating;

	const form = useForm<ProductFormValues>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			name: existingProduct?.name || "",
			description: existingProduct?.description || "",

			price: existingProduct?.price || 0,
			stock: existingProduct?.stock || 0,
			shop_category_id:
				existingProduct?.shop_category_id?.toString() || "",
		},
	});

	function onSubmit(values: ProductFormValues) {
		const formData = new FormData();
		formData.append("product[name]", values.name);
		formData.append("product[description]", values.description);
		formData.append("product[price]", values.price.toString());
		formData.append("product[stock]", values.stock.toString());
		formData.append("product[shop_category_id]", values.shop_category_id);

		const mutationOptions = {
			onSuccess: () => {
				const action = existingProduct ? "updated" : "created";
				toast.success(`Product ${action} successfully`);
				router.push("/vendor/products");
			},
			onError: (err: Error) => {
				toast.error(err.message || "Something went wrong");
			},
		};

		if (existingProduct) {
			updateProduct(
				{ id: existingProduct.id, data: formData },
				mutationOptions,
			);
		} else {
			createProduct({ data: formData }, mutationOptions);
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>
					{existingProduct ? "Edit Product" : "New Product"}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6">
						{/* Name */}
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Product Name</FormLabel>
									<FormControl>
										<Input
											placeholder="Wireless Earbuds"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Price & Stock */}
						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="price"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Price</FormLabel>
										<FormControl>
											<Input
												type="number"
												step="0.01"
												placeholder="0.00"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="stock"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Stock</FormLabel>
										<FormControl>
											<Input
												type="number"
												placeholder="0"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* Category */}
						<FormField
							control={form.control}
							name="shop_category_id"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
										disabled={isLoadingCategories}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a category" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{categories.map((cat) => (
												<SelectItem
													key={cat.id}
													value={cat.id.toString()}>
													{cat.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Description */}
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											className="min-h-[120px]"
											placeholder="Product details..."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Saving..." : "Save Product"}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
