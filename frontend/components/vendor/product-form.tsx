"use client";

import { createProduct, updateProduct } from "@/app/actions/vendor";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GlobalCategory, ShopCategory, Product } from "@/types/vendor";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

interface ProductFormProps {
	shopCategories: ShopCategory[];
	globalCategories: GlobalCategory[];
	product?: Product;
}

export function ProductForm({
	shopCategories,
	globalCategories,
	product,
}: ProductFormProps) {
	const isEditMode = !!product;
	const router = useRouter();

	const mutation = useMutation({
		mutationFn: async (formData: FormData) => {
			const prevState = { status: "idle", message: "" } as const;
			if (isEditMode && product) {
				return await updateProduct(product.id, prevState, formData);
			} else {
				return await createProduct(prevState, formData);
			}
		},
		onSuccess: (data) => {
			if (data.status === "success") {
				toast.success(data.message);
				if (!isEditMode) {
					router.push("/vendor/products");
				}
			} else {
				toast.error(data.message);
			}
		},
		onError: () => {
			toast.error("Something went wrong. Please try again.");
		},
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		mutation.mutate(formData);
	};

	const getError = (field: string) => {
		if (
			mutation.data?.status === "error" &&
			mutation.data.fieldErrors?.[field]
		) {
			return mutation.data.fieldErrors[field][0];
		}
		return null;
	};

	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardHeader>
				<CardTitle>
					{isEditMode ? "Edit Product" : "Product Details"}
				</CardTitle>
				<CardDescription>
					{isEditMode
						? "Update your product information."
						: "Fill in the details to add a new product."}
				</CardDescription>
			</CardHeader>
			<form onSubmit={handleSubmit}>
				<CardContent className="space-y-6">
					{/* Name */}
					<div className="space-y-2">
						<Label htmlFor="name">Product Name</Label>
						<Input
							id="name"
							name="name"
							defaultValue={product?.name}
							placeholder="e.g. Classic White T-Shirt"
							required
						/>
						{getError("name") && (
							<p className="text-sm text-destructive">
								{getError("name")}
							</p>
						)}
					</div>

					{/* Description */}
					<div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<Textarea
							id="description"
							name="description"
							defaultValue={product?.description || ""}
							placeholder="Describe your product..."
							className="min-h-[100px]"
						/>
						{getError("description") && (
							<p className="text-sm text-destructive">
								{getError("description")}
							</p>
						)}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{/* Price */}
						<div className="space-y-2">
							<Label htmlFor="price">Price ($)</Label>
							<Input
								id="price"
								name="price"
								type="number"
								step="0.01"
								min="0"
								defaultValue={product?.price}
								placeholder="0.00"
								required
							/>
							{getError("price") && (
								<p className="text-sm text-destructive">
									{getError("price")}
								</p>
							)}
						</div>

						{/* Stock */}
						<div className="space-y-2">
							<Label htmlFor="stock_quantity">
								Stock Quantity
							</Label>
							<Input
								id="stock_quantity"
								name="stock_quantity"
								type="number"
								min="0"
								defaultValue={product?.stock_quantity}
								placeholder="10"
								required
							/>
							{getError("stock_quantity") && (
								<p className="text-sm text-destructive">
									{getError("stock_quantity")}
								</p>
							)}
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{/* Global Category */}
						<div className="space-y-2">
							<Label htmlFor="category_id">
								Marketplace Category
							</Label>
							<select
								id="category_id"
								name="category_id"
								required
								defaultValue={product?.category_id || ""}
								className={cn(
									"flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
								)}>
								<option value="">Select a category</option>
								{globalCategories.map((cat) => (
									<option key={cat.id} value={cat.id}>
										{cat.name}
									</option>
								))}
							</select>
							{getError("category_id") && (
								<p className="text-sm text-destructive">
									{getError("category_id")}
								</p>
							)}
						</div>

						{/* Shop Category */}
						<div className="space-y-2">
							<Label htmlFor="shop_category_id">
								Your Shop Category
							</Label>
							<select
								id="shop_category_id"
								name="shop_category_id"
								defaultValue={product?.shop_category_id || ""}
								className={cn(
									"flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
								)}>
								<option value="">None</option>
								{shopCategories.map((cat) => (
									<option key={cat.id} value={cat.id}>
										{cat.name}
									</option>
								))}
							</select>
						</div>
					</div>

					{/* Status */}
					<div className="space-y-2">
						<Label htmlFor="status">Status</Label>
						<select
							id="status"
							name="status"
							defaultValue={product?.status || "draft"}
							className={cn(
								"flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
							)}>
							<option value="draft">Draft (Hidden)</option>
							<option value="active">Active (Visible)</option>
							<option value="archived">Archived</option>
						</select>
					</div>
				</CardContent>
				<CardFooter>
					<Button
						type="submit"
						className="w-full"
						disabled={mutation.isPending}>
						{mutation.isPending ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								{isEditMode ? "Updating..." : "Creating..."}
							</>
						) : (
							<>
								<Save className="mr-2 h-4 w-4" />
								{isEditMode
									? "Update Product"
									: "Create Product"}
							</>
						)}
					</Button>
				</CardFooter>
			</form>
		</Card>
	);
}
