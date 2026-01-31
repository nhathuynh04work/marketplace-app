"use server";

import { apiFetch } from "@/lib/api";
import { ShopCategory, GlobalCategory } from "@/types/vendor";

interface CreateCategoryParams {
	name: string;
}

interface DeleteCategoryParams {
	id: number;
}

export async function getShopCategories() {
	return await apiFetch<ShopCategory[]>("/vendor/categories");
}

export async function createShopCategory({ name }: CreateCategoryParams) {
	return await apiFetch<ShopCategory>("/vendor/categories", {
		method: "POST",
		body: JSON.stringify({ name }),
		headers: { "Content-Type": "application/json" },
	});
}

export async function deleteShopCategory({ id }: DeleteCategoryParams) {
	return await apiFetch(`/vendor/categories/${id}`, {
		method: "DELETE",
	});
}

export async function getGlobalCategories() {
	return await apiFetch<GlobalCategory[]>("/categories");
}
