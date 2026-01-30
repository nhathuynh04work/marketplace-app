"use client";

import { createProduct, updateProduct } from "@/app/actions/vendor";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GlobalCategory, ShopCategory, Product } from "@/types/vendor";
import { Loader2, Save, X, Upload, Image as ImageIcon } from "lucide-react";
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
		<form
			onSubmit={handleSubmit}
			className="w-full max-w-[1200px] mx-auto pb-12">
			{/* Header Actions */}
			<div className="flex items-center justify-between mb-8 sticky top-0 bg-background/95 py-4 z-10 border-b backdrop-blur-sm">
				<div className="space-y-1">
					<h2 className="text-2xl font-bold tracking-tight">
						{isEditMode ? product.name : "New Product"}
					</h2>
					<p className="text-sm text-muted-foreground">
						{isEditMode
							? "Manage product details and settings."
							: "Add a new product to your inventory."}
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						type="button"
						onClick={() => router.back()}
						disabled={mutation.isPending}>
						<X className="mr-2 h-4 w-4" />
						Discard
					</Button>
					<Button type="submit" disabled={mutation.isPending}>
						{mutation.isPending ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Saving...
							</>
						) : (
							<>
								<Save className="mr-2 h-4 w-4" />
								Save Product
							</>
						)}
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
				{/* Left Column: Main Info (8 cols) */}
				<div className="lg:col-span-8 space-y-8">
					<Card>
						<CardHeader>
							<CardTitle>General Information</CardTitle>
							<CardDescription>
								Basic details about your product.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
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

							<div className="space-y-2">
								<Label htmlFor="description">Description</Label>
								<Textarea
									id="description"
									name="description"
									defaultValue={product?.description || ""}
									placeholder="Describe your product..."
									className="min-h-[160px] resize-y"
								/>
								{getError("description") && (
									<p className="text-sm text-destructive">
										{getError("description")}
									</p>
								)}
							</div>
						</CardContent>
					</Card>

					{/* Image Upload Placeholder */}
					<Card>
						<CardHeader>
							<CardTitle>Media</CardTitle>
							<CardDescription>
								Upload images for your product gallery.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer group">
								<div className="p-4 bg-muted rounded-full mb-4 group-hover:bg-background transition-colors">
									<Upload className="h-6 w-6 text-muted-foreground" />
								</div>
								<h3 className="text-lg font-medium">
									Click to upload image
								</h3>
								<p className="text-sm text-muted-foreground mt-1 max-w-xs">
									SVG, PNG, JPG or GIF (max. 800x400px)
								</p>
								<p className="text-xs text-amber-600 mt-4 font-medium">
									* Image upload functionality coming soon
								</p>
							</div>

							{/* Mockup of uploaded images */}
							<div className="grid grid-cols-4 sm:grid-cols-5 gap-4 mt-6">
								{[1, 2].map((i) => (
									<div
										key={i}
										className="aspect-square bg-muted rounded-md flex items-center justify-center border relative group">
										<ImageIcon className="h-8 w-8 text-muted-foreground/30" />
										<div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center rounded-md cursor-pointer">
											<X className="h-4 w-4 text-white" />
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Pricing & Inventory</CardTitle>
						</CardHeader>
						<CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-2">
								<Label htmlFor="price">Price ($)</Label>
								<div className="relative">
									<span className="absolute left-3 top-2.5 text-muted-foreground">
										$
									</span>
									<Input
										id="price"
										name="price"
										type="number"
										step="0.01"
										min="0"
										className="pl-7"
										defaultValue={product?.price}
										placeholder="0.00"
										required
									/>
								</div>
								{getError("price") && (
									<p className="text-sm text-destructive">
										{getError("price")}
									</p>
								)}
							</div>

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
						</CardContent>
					</Card>
				</div>

				{/* Right Column: Sidebar (4 cols) */}
				<div className="lg:col-span-4 space-y-8">
					<Card>
						<CardHeader>
							<CardTitle>Status</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="status">
										Product Status
									</Label>
									<select
										id="status"
										name="status"
										defaultValue={
											product?.status || "draft"
										}
										className={cn(
											"flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
										)}>
										<option value="draft">Draft</option>
										<option value="active">Active</option>
										<option value="archived">
											Archived
										</option>
									</select>
									<p className="text-xs text-muted-foreground">
										Draft products are hidden from your
										store.
									</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Organization</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
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

							<div className="space-y-2">
								<Label htmlFor="shop_category_id">
									Shop Category
								</Label>
								<select
									id="shop_category_id"
									name="shop_category_id"
									defaultValue={
										product?.shop_category_id || ""
									}
									className={cn(
										"flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
									)}>
									<option value="">Uncategorized</option>
									{shopCategories.map((cat) => (
										<option key={cat.id} value={cat.id}>
											{cat.name}
										</option>
									))}
								</select>
								<p className="text-xs text-muted-foreground">
									Organize products within your own shop.
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</form>
	);
}
