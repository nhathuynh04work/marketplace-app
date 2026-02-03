"use server";

import { apiFetch } from "@/lib/api";
import { Product } from "@/types/vendor";

interface CreateProductParams {
	data: FormData;
}

interface UpdateProductParams {
	id: number;
	data: FormData;
}

interface DeleteProductParams {
	id: number;
}

interface GetProductParams {
	id: number;
}

export async function getVendorProducts(): Promise<Product[]> {
	const response = await apiFetch<{ products: Product[] }>("/vendor/products", {
		requiresAuth: true,
	});
	return response.products;
}

export async function getVendorProduct({ id }: GetProductParams): Promise<Product> {
	const response = await apiFetch<{ product: Product }>(`/vendor/products/${id}`, {
		requiresAuth: true,
	});
	return response.product;
}

export async function createProduct({ data }: CreateProductParams): Promise<Product> {
	const response = await apiFetch<{ product: Product }>("/vendor/products", {
		method: "POST",
		body: data,
		requiresAuth: true,
	});
	return response.product;
}

export async function updateProduct({ id, data }: UpdateProductParams): Promise<Product> {
	const response = await apiFetch<{ product: Product }>(`/vendor/products/${id}`, {
		method: "PUT",
		body: data,
		requiresAuth: true,
	});
	return response.product;
}

export async function deleteProduct({ id }: DeleteProductParams): Promise<void> {
	await apiFetch<void>(`/vendor/products/${id}`, {
		method: "DELETE",
		requiresAuth: true,
	});
}
