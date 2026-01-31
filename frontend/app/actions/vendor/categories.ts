"use server";

import { apiFetch } from "@/lib/api";
import { ShopCategory, GlobalCategory } from "@/types/vendor";

export async function getShopCategories() {
	return await apiFetch<ShopCategory[]>("/vendor/categories");
}

export async function createShopCategory(data: { name: string }) {
	return await apiFetch<ShopCategory>("/vendor/categories", {
		method: "POST",
		body: JSON.stringify(data),
		headers: { "Content-Type": "application/json" },
	});
}

export async function deleteShopCategory(id: number) {
	return await apiFetch(`/vendor/categories/${id}`, {
		method: "DELETE",
	});
}

export async function getGlobalCategories() {
	return await apiFetch<GlobalCategory[]>("/categories");
}
