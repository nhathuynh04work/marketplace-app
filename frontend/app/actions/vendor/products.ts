"use server";

import { railsApi } from "@/lib/rails-api";
import { API_URLS } from "@/lib/routes";
import { Product } from "@/types/vendor";

interface CreateProductParams {
	name: string;
	description?: string;
	price: string;
	stock_quantity: string;
	status: "draft" | "active" | "archived";
	shop_category_id?: string | null;
	category_id?: string | null;
}

interface UpdateProductParams {
	id: number;
	name: string;
	description?: string;
	price: string;
	stock_quantity: string;
	status: "draft" | "active" | "archived";
	shop_category_id?: string | null;
	category_id?: string | null;
}

interface DeleteProductParams {
	id: number;
}

interface GetProductParams {
	id: number;
}

export async function getVendorProducts(): Promise<Product[]> {
	const data = await railsApi.get<{ products: Product[] }>(API_URLS.VENDOR.PRODUCTS);
	return data.products;
}

export async function getVendorProduct({ id }: GetProductParams): Promise<Product> {
	const data = await railsApi.get<{ product: Product }>(`${API_URLS.VENDOR.PRODUCTS}/${id}`);
	return data.product;
}

export async function createProduct(params: CreateProductParams): Promise<Product> {
	const responseData = await railsApi.post<{ product: Product }>(API_URLS.VENDOR.PRODUCTS, {
		product: {
			name: params.name,
			description: params.description,
			price: params.price,
			stock_quantity: params.stock_quantity,
			status: params.status,
			shop_category_id: params.shop_category_id,
			category_id: params.category_id,
		},
	});
	return responseData.product;
}

export async function updateProduct(params: UpdateProductParams): Promise<Product> {
	const responseData = await railsApi.put<{ product: Product }>(`${API_URLS.VENDOR.PRODUCTS}/${params.id}`, {
		product: {
			name: params.name,
			description: params.description,
			price: params.price,
			stock_quantity: params.stock_quantity,
			status: params.status,
			shop_category_id: params.shop_category_id,
			category_id: params.category_id,
		},
	});
	return responseData.product;
}

export async function deleteProduct({ id }: DeleteProductParams): Promise<void> {
	await railsApi.del<void>(`${API_URLS.VENDOR.PRODUCTS}/${id}`);
}
