"use server";

import { fetchQuery, fetchMutation } from "@/lib/action-utils";
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
	return fetchQuery<Product[]>("/vendor/products");
}

export async function getVendorProduct({ id }: GetProductParams): Promise<Product> {
	return fetchQuery<Product>(`/vendor/products/${id}`);
}

export async function createProduct({ data }: CreateProductParams): Promise<Product> {
	return fetchMutation<Product>("/vendor/products", {
		method: "POST",
		body: data,
	});
}

export async function updateProduct({ id, data }: UpdateProductParams): Promise<Product> {
	return fetchMutation<Product>(`/vendor/products/${id}`, {
		method: "PUT",
		body: data,
	});
}

export async function deleteProduct({ id }: DeleteProductParams): Promise<void> {
	return fetchMutation<void>(`/vendor/products/${id}`, {
		method: "DELETE",
	});
}
