"use server";

import { railsApi } from "@/lib/rails-api";
import { API_URLS } from "@/lib/routes";
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
    return await railsApi.get<ShopCategory[]>(API_URLS.VENDOR.CATEGORIES);
}

export async function getShopCategory(id: string | number): Promise<ShopCategory> {
    return await railsApi.get<ShopCategory>(`${API_URLS.VENDOR.CATEGORIES}/${id}`);
}

export async function createShopCategory({ name }: CreateCategoryParams): Promise<ShopCategory> {
    return await railsApi.post<ShopCategory>(API_URLS.VENDOR.CATEGORIES, { 
        shop_category: { name } 
    });
}

export async function updateShopCategory({ id, name }: UpdateCategoryParams): Promise<ShopCategory> {
    return await railsApi.put<ShopCategory>(`${API_URLS.VENDOR.CATEGORIES}/${id}`, { 
        shop_category: { name } 
    });
}

export async function deleteShopCategory({ id }: DeleteCategoryParams): Promise<void> {
    return await railsApi.del<void>(`${API_URLS.VENDOR.CATEGORIES}/${id}`);
}

export async function getGlobalCategories(): Promise<GlobalCategory[]> {
    return await railsApi.get<GlobalCategory[]>(API_URLS.CATEGORIES.ROOT);
}
