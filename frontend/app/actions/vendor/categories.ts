"use server";

import { fetchQuery, fetchMutation } from "@/lib/action-utils";
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
    return fetchQuery<ShopCategory[]>("/vendor/categories");
}

export async function getShopCategory(id: string | number): Promise<ShopCategory> {
    return fetchQuery<ShopCategory>(`/vendor/categories/${id}`);
}

export async function createShopCategory({ name }: CreateCategoryParams): Promise<ShopCategory> {
    return fetchMutation<ShopCategory>("/vendor/categories", {
        method: "POST",
        body: JSON.stringify({ name }),
    });
}

export async function updateShopCategory({ id, name }: UpdateCategoryParams): Promise<ShopCategory> {
    return fetchMutation<ShopCategory>(`/vendor/categories/${id}`, {
        method: "PUT",
        body: JSON.stringify({ name }),
    });
}

export async function deleteShopCategory({ id }: DeleteCategoryParams): Promise<void> {
    return fetchMutation<void>(`/vendor/categories/${id}`, {
        method: "DELETE",
    });
}

export async function getGlobalCategories(): Promise<GlobalCategory[]> {
    return fetchQuery<GlobalCategory[]>("/categories");
}
