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
	const response = await fetchQuery<{ products: Product[] }>("/vendor/products");
	return response.products;
}

export async function getVendorProduct({ id }: GetProductParams): Promise<Product> {
	const response = await fetchQuery<{ product: Product }>(`/vendor/products/${id}`);
	return response.product;
}

export async function createProduct({ data }: CreateProductParams): Promise<Product> {
	const response = await fetchMutation<{ product: Product }>("/vendor/products", {
		method: "POST",
		body: data,
	});
	return response.product;
}

export async function updateProduct({ id, data }: UpdateProductParams): Promise<Product> {
	const response = await fetchMutation<{ product: Product }>(`/vendor/products/${id}`, {
		method: "PUT",
		body: data,
	});
	return response.product;
}

export async function deleteProduct({ id }: DeleteProductParams): Promise<void> {
	return fetchMutation<void>(`/vendor/products/${id}`, {
		method: "DELETE",
	});
}
