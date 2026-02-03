"use server";

import { API_URLS } from "@/lib/routes";
import { getSession } from "@/lib/session";
import { Product } from "@/types/vendor";
import { redirect } from "next/navigation";

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
	const token = await getSession();
	const response = await fetch(API_URLS.VENDOR.PRODUCTS, {
		headers: {
			"Authorization": `Bearer ${token}`,
		},
	});

	const data = await response.json() as { products: Product[] } | { errors: string };

	if (!response.ok) {
		if (response.status === 401) {
			redirect("/api/auth/logout");
		}
		const errorData = data as { errors: string };
		throw new Error(errorData.errors || "Failed to fetch products");
	}
	
	return (data as { products: Product[] }).products;
}

export async function getVendorProduct({ id }: GetProductParams): Promise<Product> {
	const token = await getSession();
	const response = await fetch(`${API_URLS.VENDOR.PRODUCTS}/${id}`, {
		headers: {
			"Authorization": `Bearer ${token}`,
		},
	});

	const data = await response.json() as { product: Product } | { errors: string };

	if (!response.ok) {
		if (response.status === 401) {
			redirect("/api/auth/logout");
		}
		const errorData = data as { errors: string };
		throw new Error(errorData.errors || "Failed to fetch product");
	}
	
	return (data as { product: Product }).product;
}

export async function createProduct({ data }: CreateProductParams): Promise<Product> {
	const token = await getSession();
	const response = await fetch(API_URLS.VENDOR.PRODUCTS, {
		method: "POST",
		headers: {
			"Authorization": `Bearer ${token}`,
		},
		body: data,
	});

	const responseData = await response.json() as { product: Product } | { errors: string };

	if (!response.ok) {
		if (response.status === 401) {
			redirect("/api/auth/logout");
		}
		const errorData = responseData as { errors: string };
		throw new Error(errorData.errors || "Failed to create product");
	}
	
	return (responseData as { product: Product }).product;
}

export async function updateProduct({ id, data }: UpdateProductParams): Promise<Product> {
	const token = await getSession();
	const response = await fetch(`${API_URLS.VENDOR.PRODUCTS}/${id}`, {
		method: "PUT",
		headers: {
			"Authorization": `Bearer ${token}`,
		},
		body: data,
	});

	const responseData = await response.json() as { product: Product } | { errors: string };

	if (!response.ok) {
		if (response.status === 401) {
			redirect("/api/auth/logout");
		}
		const errorData = responseData as { errors: string };
		throw new Error(errorData.errors || "Failed to update product");
	}
	
	return (responseData as { product: Product }).product;
}

export async function deleteProduct({ id }: DeleteProductParams): Promise<void> {
	const token = await getSession();
	const response = await fetch(`${API_URLS.VENDOR.PRODUCTS}/${id}`, {
		method: "DELETE",
		headers: {
			"Authorization": `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		if (response.status === 401) {
			redirect("/api/auth/logout");
		}
		const data = await response.json() as { errors: string };
		throw new Error(data.errors || "Failed to delete product");
	}
}
