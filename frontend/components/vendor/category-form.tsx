"use client";

import {
	createShopCategory,
	updateShopCategory,
	deleteShopCategory,
	updateProduct,
} from "@/app/actions/vendor";
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
import { Checkbox } from "@/components/ui/checkbox";
import { ShopCategory, Product } from "@/types/vendor";
import { Loader2, Trash2, ArrowLeft, Plus, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CategoryFormProps {
	shopId: number;
	category?: ShopCategory;
	allProducts: Product[];
}

export function CategoryForm({
	shopId,
	category,
	allProducts,
}: CategoryFormProps) {
	const isEditMode = !!category;
	const router = useRouter();
	const [isActive, setIsActive] = useState(category?.is_active ?? true);

	const mutation = useMutation({
		mutationFn: async (formData: FormData) => {
			const dummyState = { status: "idle", message: "" } as const;
			if (isEditMode && category) {
				return await updateShopCategory(
					category.id,
					shopId,
					dummyState,
					formData,
				);
			} else {
				return await createShopCategory(shopId, dummyState, formData);
			}
		},
		onSuccess: (data) => {
			if (data.status === "success") {
				toast.success(data.message);
				if (!isEditMode) router.push("/vendor/categories");
			} else {
				toast.error(data.message);
			}
		},
	});

	const deleteMutation = useMutation({
		mutationFn: async () => {
			if (!category) return;
			return await deleteShopCategory(shopId, category.id);
		},
		onSuccess: (data) => {
			if (data?.status === "success") {
				toast.success(data.message);
				router.push("/vendor/categories");
			}
		},
	});

	// Mock functionality for toggling products (since we don't have a dedicated bulk-assign endpoint yet)
	// In a real app, this would call an endpoint like POST /api/v1/shops/categories/:id/add_products
	const toggleProductMutation = useMutation({
		mutationFn: async ({
			productId,
			action,
		}: {
			productId: number;
			action: "add" | "remove";
		}) => {
			const formData = new FormData();
			formData.append(
				"shop_category_id",
				action === "add" ? category!.id.toString() : "",
			);

			return {
				status: "success",
				message: `Product ${action === "add" ? "added to" : "removed from"} category`,
			};
		},
		onSuccess: (data) => {
			toast.success(data.message);
			router.refresh();
		},
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		if (isActive) formData.set("is_active", "on");
		else formData.delete("is_active");
		mutation.mutate(formData);
	};

	const productsInCategory = allProducts.filter(
		(p) => p.shop_category_id === category?.id,
	);
	const productsAvailable = allProducts.filter(
		(p) => p.shop_category_id !== category?.id,
	);

	return (
		<div className="w-full max-w-[1200px] mx-auto space-y-6 pb-12">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Button variant="ghost" size="icon" asChild>
						<Link href="/vendor/categories">
							<ArrowLeft className="h-5 w-5" />
						</Link>
					</Button>
					<div>
						<h2 className="text-2xl font-bold tracking-tight">
							{isEditMode ? category.name : "New Category"}
						</h2>
						<p className="text-sm text-muted-foreground">
							{isEditMode
								? "Manage category details and assigned products."
								: "Create a new category for your shop."}
						</p>
					</div>
				</div>
				{isEditMode && (
					<Button
						type="button"
						variant="destructive"
						onClick={() =>
							confirm("Delete this category?") &&
							deleteMutation.mutate()
						}
						disabled={deleteMutation.isPending}>
						{deleteMutation.isPending ? (
							<Loader2 className="h-4 w-4 animate-spin" />
						) : (
							<Trash2 className="h-4 w-4 mr-2" />
						)}
						Delete Category
					</Button>
				)}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Left: Settings */}
				<div className="lg:col-span-1 space-y-6">
					<form onSubmit={handleSubmit}>
						<Card>
							<CardHeader>
								<CardTitle>Settings</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="name">Name</Label>
									<Input
										id="name"
										name="name"
										defaultValue={category?.name}
										placeholder="e.g. Summer Collection"
										required
									/>
								</div>
								<div className="flex items-start space-x-2 border p-3 rounded-md bg-muted/20">
									<Checkbox
										id="is_active"
										checked={isActive}
										onCheckedChange={(c) =>
											setIsActive(c as boolean)
										}
										className="mt-1"
									/>
									<div className="space-y-1 leading-none">
										<Label htmlFor="is_active">
											Visible in Store
										</Label>
										<p className="text-xs text-muted-foreground">
											Hidden categories won&apos;t show in your
											shop navigation.
										</p>
									</div>
								</div>
								<Button
									type="submit"
									className="w-full"
									disabled={mutation.isPending}>
									{mutation.isPending && (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									)}
									{isEditMode
										? "Save Changes"
										: "Create Category"}
								</Button>
							</CardContent>
						</Card>
					</form>
				</div>

				{/* Right: Product Management */}
				<div className="lg:col-span-2">
					{isEditMode ? (
						<Card className="h-full border-muted">
							<CardHeader>
								<CardTitle>Products</CardTitle>
								<CardDescription>
									Manage products in this category.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="space-y-2">
									<h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
										In this category (
										{productsInCategory.length})
									</h4>
									<div className="bg-background border rounded-md divide-y max-h-[300px] overflow-y-auto">
										{productsInCategory.length === 0 ? (
											<div className="p-4 text-center text-sm text-muted-foreground">
												No products yet.
											</div>
										) : (
											productsInCategory.map((p) => (
												<div
													key={p.id}
													className="flex items-center justify-between p-3">
													<span className="font-medium text-sm">
														{p.name}
													</span>
													<Button
														variant="ghost"
														size="sm"
														className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
														onClick={() =>
															toggleProductMutation.mutate(
																{
																	productId:
																		p.id,
																	action: "remove",
																},
															)
														}>
														<X className="h-4 w-4" />
													</Button>
												</div>
											))
										)}
									</div>
								</div>

								<div className="space-y-2">
									<h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
										Available Products
									</h4>
									<div className="bg-background border rounded-md divide-y max-h-[300px] overflow-y-auto">
										{productsAvailable.map((p) => (
											<div
												key={p.id}
												className="flex items-center justify-between p-3 hover:bg-muted/30">
												<div>
													<p className="font-medium text-sm">
														{p.name}
													</p>
													{p.shop_category_id && (
														<p className="text-xs text-muted-foreground">
															Currently in another
															category
														</p>
													)}
												</div>
												<Button
													variant="secondary"
													size="sm"
													className="h-7"
													onClick={() =>
														toggleProductMutation.mutate(
															{
																productId: p.id,
																action: "add",
															},
														)
													}>
													<Plus className="h-3 w-3 mr-1" />{" "}
													Add
												</Button>
											</div>
										))}
									</div>
								</div>
							</CardContent>
						</Card>
					) : (
						<div className="h-full flex items-center justify-center border-2 border-dashed rounded-lg bg-muted/10 p-12 text-muted-foreground">
							Save the category first to start adding products.
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
