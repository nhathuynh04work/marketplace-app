"use server";

import { apiFetch } from "@/lib/api";
import { ShopCategory, GlobalCategory } from "@/types/vendor";

interface CreateCategoryParams {
    name: string;
}

interface UpdateCategoryParams {
    id: number;
    name: string;
}

interface DeleteCategoryParams {
    id: number;
}

export async function getShopCategories(): Promise<ShopCategory[]> {
    return apiFetch<ShopCategory[]>("/vendor/categories", {
        requiresAuth: true,
    });
}

export async function getShopCategory(id: string | number): Promise<ShopCategory> {
    return apiFetch<ShopCategory>(`/vendor/categories/${id}`, {
        requiresAuth: true,
    });
}

export async function createShopCategory({ name }: CreateCategoryParams): Promise<ShopCategory> {
    return apiFetch<ShopCategory>("/vendor/categories", {
        method: "POST",
        body: JSON.stringify({ name }),
        requiresAuth: true,
    });
}

export async function updateShopCategory({ id, name }: UpdateCategoryParams): Promise<ShopCategory> {
    return apiFetch<ShopCategory>(`/vendor/categories/${id}`, {
        method: "PUT",
        body: JSON.stringify({ name }),
        requiresAuth: true,
    });
}

export async function deleteShopCategory({ id }: DeleteCategoryParams): Promise<void> {
    await apiFetch<void>(`/vendor/categories/${id}`, {
        method: "DELETE",
        requiresAuth: true,
    });
}

export async function getGlobalCategories(): Promise<GlobalCategory[]> {
    return apiFetch<GlobalCategory[]>("/categories", {
        requiresAuth: true,
    });
}
