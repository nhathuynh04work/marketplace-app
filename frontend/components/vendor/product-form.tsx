"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Product, ShopCategory, GlobalCategory } from "@/types/vendor";
import {
	useCreateProduct,
	useUpdateProduct,
} from "@/app/hooks/vendor/use-products";
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_ROUTES } from "@/lib/routes";

const productSchema = z.object({
	name: z.string().min(1, "Product name is required"),
	description: z.string().optional(),
	price: z.string().min(1, "Price is required"),
	stock_quantity: z.string().min(1, "Stock quantity is required"),
	status: z.enum(["draft", "active", "archived"]),
	shop_category_id: z.string().optional(),
	category_id: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
	product?: Product;
	shopCategories?: ShopCategory[];
	globalCategories?: GlobalCategory[];
}

export function ProductForm({
	product,
	shopCategories = [],
	globalCategories = [],
}: ProductFormProps) {
	const router = useRouter();
	const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
	const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();

	const form = useForm<ProductFormValues>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			name: product?.name || "",
			description: product?.description || "",
			price: product?.price?.toString() || "",
			stock_quantity: product?.stock_quantity?.toString() || "0",
			status: product?.status || "draft",
			shop_category_id: product?.shop_category_id?.toString() || "",
			category_id: product?.category_id?.toString() || "",
		},
	});

	const isPending = isCreating || isUpdating;

	function onSubmit(values: ProductFormValues) {
		const formData = new FormData();
		formData.append("product[name]", values.name);
		if (values.description) {
			formData.append("product[description]", values.description);
		}
		formData.append("product[price]", values.price);
		formData.append("product[stock_quantity]", values.stock_quantity);
		formData.append("product[status]", values.status);
		if (values.shop_category_id) {
			formData.append("product[shop_category_id]", values.shop_category_id);
		}
		if (values.category_id) {
			formData.append("product[category_id]", values.category_id);
		}

		if (product) {
			updateProduct(
				{ id: product.id, data: formData },
				{
					onSuccess: () => {
						toast.success("Product updated successfully");
						router.push(APP_ROUTES.VENDOR_PRODUCTS);
					},
					onError: (err) => toast.error(err.message),
				},
			);
		} else {
			createProduct(
				{ data: formData },
				{
					onSuccess: () => {
						toast.success("Product created successfully");
						router.push(APP_ROUTES.VENDOR_PRODUCTS);
						form.reset();
					},
					onError: (err) => toast.error(err.message),
				},
			);
		}
	}

	return (
		<Card className="max-w-2xl">
			<CardHeader>
				<CardTitle>
					{product ? "Edit Product" : "New Product"}
				</CardTitle>
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
									<FormLabel>Product Name</FormLabel>
									<FormControl>
										<Input
											placeholder="e.g. Wireless Headphones"
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
											placeholder="Describe your product..."
											rows={4}
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Optional product description
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

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
								name="stock_quantity"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Stock Quantity</FormLabel>
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

						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Status</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select status" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="draft">
												Draft
											</SelectItem>
											<SelectItem value="active">
												Active
											</SelectItem>
											<SelectItem value="archived">
												Archived
											</SelectItem>
										</SelectContent>
									</Select>
									<FormDescription>
										Product visibility status
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="shop_category_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Shop Category</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select category" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="">
													None
												</SelectItem>
												{shopCategories.map((cat) => (
													<SelectItem
														key={cat.id}
														value={cat.id.toString()}>
														{cat.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormDescription>
											Your shop's category
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="category_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Global Category</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select category" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="">
													None
												</SelectItem>
												{globalCategories.map((cat) => (
													<SelectItem
														key={cat.id}
														value={cat.id.toString()}>
														{cat.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormDescription>
											Marketplace category
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="flex gap-4">
							<Button
								type="button"
								variant="outline"
								onClick={() => router.push(APP_ROUTES.VENDOR_PRODUCTS)}
								disabled={isPending}>
								Cancel
							</Button>
							<Button
								type="submit"
								className="flex-1"
								disabled={isPending}>
								{isPending
									? "Saving..."
									: product
										? "Update Product"
										: "Create Product"}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
