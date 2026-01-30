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
import { FormState } from "@/types/form";
import { GlobalCategory, ShopCategory, Product } from "@/types/vendor";
import { Loader2, Save } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface ProductFormProps {
	shopCategories: ShopCategory[];
	globalCategories: GlobalCategory[];
	product?: Product; // Optional: if present, it's Edit mode
}

const initialState: FormState = { status: "idle", message: "" };

export function ProductForm({
	shopCategories,
	globalCategories,
	product,
}: ProductFormProps) {
	const isEditMode = !!product;
	const router = useRouter();

	// Bind ID if editing, otherwise standard create action
	const action = isEditMode
		? updateProduct.bind(null, product.id)
		: createProduct;

	const [state, formAction, isPending] = useActionState(action, initialState);

	useEffect(() => {
		if (state.status === "success") {
			toast.success(state.message);
			if (!isEditMode) {
				router.push("/vendor/products");
			}
		} else if (state.status === "error") {
			toast.error(state.message);
		}
	}, [state, router, isEditMode]);

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
			<form action={formAction}>
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
						{state.fieldErrors?.name && (
							<p className="text-sm text-destructive">
								{state.fieldErrors.name[0]}
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
						{state.fieldErrors?.description && (
							<p className="text-sm text-destructive">
								{state.fieldErrors.description[0]}
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
							{state.fieldErrors?.price && (
								<p className="text-sm text-destructive">
									{state.fieldErrors.price[0]}
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
							{state.fieldErrors?.stock_quantity && (
								<p className="text-sm text-destructive">
									{state.fieldErrors.stock_quantity[0]}
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
							{state.fieldErrors?.category_id && (
								<p className="text-sm text-destructive">
									{state.fieldErrors.category_id[0]}
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
							{state.fieldErrors?.shop_category_id && (
								<p className="text-sm text-destructive">
									{state.fieldErrors.shop_category_id[0]}
								</p>
							)}
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
						disabled={isPending}>
						{isPending ? (
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
