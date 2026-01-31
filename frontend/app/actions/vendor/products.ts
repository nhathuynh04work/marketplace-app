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

export async function getVendorProducts() {
	return await apiFetch<Product[]>("/vendor/products");
}

export async function createProduct({ data }: CreateProductParams) {
	return await apiFetch<Product>("/vendor/products", {
		method: "POST",
		body: data,
	});
}

export async function updateProduct({ id, data }: UpdateProductParams) {
	return await apiFetch<Product>(`/vendor/products/${id}`, {
		method: "PUT",
		body: data,
	});
}

export async function deleteProduct({ id }: DeleteProductParams) {
	return await apiFetch(`/vendor/products/${id}`, {
		method: "DELETE",
	});
}
