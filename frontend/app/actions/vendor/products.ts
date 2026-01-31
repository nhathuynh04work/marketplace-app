"use server";

import { apiFetch } from "@/lib/api";
import { Product } from "@/types/vendor";

export async function getVendorProducts() {
	return await apiFetch<Product[]>("/vendor/products");
}

export async function createProduct(formData: FormData) {
	return await apiFetch<Product>("/vendor/products", {
		method: "POST",
		body: formData,
	});
}

export async function updateProduct(id: number, formData: FormData) {
	return await apiFetch<Product>(`/vendor/products/${id}`, {
		method: "PUT",
		body: formData,
	});
}

export async function deleteProduct(id: number) {
	return await apiFetch(`/vendor/products/${id}`, {
		method: "DELETE",
	});
}
