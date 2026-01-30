"use server";

import { apiFetch } from "@/lib/api";
import { API_ROUTES } from "@/lib/routes";
import { FormState } from "@/types/form";
import {
	Shop,
	ShopCategory,
	VendorStatus,
	Product,
	GlobalCategory,
} from "@/types/vendor";
import { revalidatePath } from "next/cache";

export async function getVendorStatus(): Promise<VendorStatus> {
	const { result } = await apiFetch<VendorStatus>(API_ROUTES.VENDOR.STATUS, {
		requiresAuth: true,
		cache: "no-store",
	});

	if (!result.success || !result.data) {
		return { has_shop: false, shop: null };
	}

	return result.data;
}

export async function registerShop(
	prevState: FormState,
	formData: FormData,
): Promise<FormState> {
	const rawData = {
		shop: {
			name: formData.get("name"),
			description: formData.get("description"),
		},
	};

	const { result } = await apiFetch<Shop>(API_ROUTES.VENDOR.ROOT, {
		method: "POST",
		requiresAuth: true,
		body: JSON.stringify(rawData),
	});

	if (!result.success) {
		return {
			status: "error",
			message: result.message || "Failed to create shop",
			fieldErrors:
				typeof result.errors === "object"
					? (result.errors as Record<string, string[]>)
					: undefined,
		};
	}

	revalidatePath("/vendor");
	return { status: "success", message: "Shop registered successfully!" };
}

export async function getShopCategories(
	shopId: number,
): Promise<ShopCategory[]> {
	const { result } = await apiFetch<ShopCategory[]>(
		`/shops/${shopId}/categories`,
		{ requiresAuth: true, cache: "no-store" },
	);

	if (!result.success || !result.data) return [];
	return result.data;
}

export async function createShopCategory(
	shopId: number,
	prevState: FormState,
	formData: FormData,
): Promise<FormState> {
	const rawData = {
		shop_category: {
			name: formData.get("name"),
			is_active: formData.get("is_active") === "on",
		},
	};

	const { result } = await apiFetch<ShopCategory>(
		`/shops/${shopId}/categories`,
		{
			method: "POST",
			requiresAuth: true,
			body: JSON.stringify(rawData),
		},
	);

	if (!result.success) {
		return {
			status: "error",
			message: result.message || "Failed to create category",
			fieldErrors:
				typeof result.errors === "object"
					? (result.errors as Record<string, string[]>)
					: undefined,
		};
	}

	revalidatePath("/vendor/categories");
	return { status: "success", message: "Category created successfully!" };
}

export async function getVendorProducts(): Promise<Product[]> {
	const { result } = await apiFetch<{ products: Product[] }>(
		API_ROUTES.VENDOR.PRODUCTS,
		{
			requiresAuth: true,
			cache: "no-store",
		},
	);

	if (!result.success || !result.data) {
		return [];
	}

	return result.data.products;
}

export async function getGlobalCategories(): Promise<GlobalCategory[]> {
	const { result } = await apiFetch<GlobalCategory[]>(
		API_ROUTES.CATEGORIES.ROOT,
		{
			cache: "force-cache",
			next: { revalidate: 3600 },
		},
	);

	if (!result.success || !result.data) {
		return [];
	}

	return result.data;
}

export async function createProduct(
	prevState: FormState,
	formData: FormData,
): Promise<FormState> {
	const rawData = {
		product: {
			name: formData.get("name"),
			description: formData.get("description"),
			price: formData.get("price"),
			stock_quantity: formData.get("stock_quantity"),
			status: formData.get("status"),
			category_id: formData.get("category_id"),
			shop_category_id: formData.get("shop_category_id"),
		},
	};

	const { result } = await apiFetch<{ product: Product }>(
		API_ROUTES.VENDOR.PRODUCTS,
		{
			method: "POST",
			requiresAuth: true,
			body: JSON.stringify(rawData),
		},
	);

	if (!result.success) {
		return {
			status: "error",
			message: result.message || "Failed to create product",
			fieldErrors:
				typeof result.errors === "object"
					? (result.errors as Record<string, string[]>)
					: undefined,
		};
	}

	revalidatePath("/vendor/products");
	return { status: "success", message: "Product created successfully!" };
}

export async function updateShopCategory(
	categoryId: number,
	shopId: number,
	prevState: FormState,
	formData: FormData,
): Promise<FormState> {
	const rawData = {
		shop_category: {
			name: formData.get("name"),
			is_active: formData.get("is_active") === "on",
		},
	};

	const { result } = await apiFetch<ShopCategory>(
		`/shops/${shopId}/categories/${categoryId}`,
		{
			method: "PUT", // or PATCH
			requiresAuth: true,
			body: JSON.stringify(rawData),
		},
	);

	if (!result.success) {
		return {
			status: "error",
			message: result.message || "Failed to update category",
			fieldErrors:
				typeof result.errors === "object"
					? (result.errors as Record<string, string[]>)
					: undefined,
		};
	}

	revalidatePath("/vendor/categories");
	return { status: "success", message: "Category updated successfully!" };
}

export async function deleteShopCategory(
	shopId: number,
	categoryId: number,
): Promise<FormState> {
	const { result } = await apiFetch(
		`/shops/${shopId}/categories/${categoryId}`,
		{
			method: "DELETE",
			requiresAuth: true,
		},
	);

	if (!result.success) {
		return {
			status: "error",
			message: result.message || "Failed to delete category",
		};
	}

	revalidatePath("/vendor/categories");
	return { status: "success", message: "Category deleted successfully!" };
}

export async function getVendorProduct(id: string): Promise<Product | null> {
	const { result } = await apiFetch<{ product: Product }>(
		`${API_ROUTES.VENDOR.PRODUCTS}/${id}`,
		{ requiresAuth: true, cache: "no-store" },
	);

	if (!result.success || !result.data) return null;
	return result.data.product;
}

export async function updateProduct(
	productId: number,
	prevState: FormState,
	formData: FormData,
): Promise<FormState> {
	const rawData = {
		product: {
			name: formData.get("name"),
			description: formData.get("description"),
			price: formData.get("price"),
			stock_quantity: formData.get("stock_quantity"),
			status: formData.get("status"),
			category_id: formData.get("category_id"),
			shop_category_id: formData.get("shop_category_id"),
		},
	};

	const { result } = await apiFetch<{ product: Product }>(
		`${API_ROUTES.VENDOR.PRODUCTS}/${productId}`,
		{
			method: "PATCH",
			requiresAuth: true,
			body: JSON.stringify(rawData),
		},
	);

	if (!result.success) {
		return {
			status: "error",
			message: result.message || "Failed to update product",
			fieldErrors:
				typeof result.errors === "object"
					? (result.errors as Record<string, string[]>)
					: undefined,
		};
	}

	revalidatePath("/vendor/products");
	revalidatePath(`/vendor/products/${productId}`);
	return { status: "success", message: "Product updated successfully!" };
}
