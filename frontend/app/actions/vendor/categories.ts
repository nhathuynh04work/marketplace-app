"use server";

import { API_URLS } from "@/lib/routes";
import { getSession } from "@/lib/session";
import { ShopCategory, GlobalCategory } from "@/types/vendor";
import { redirect } from "next/navigation";

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
    const token = await getSession();
    const response = await fetch(API_URLS.VENDOR.CATEGORIES, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    const data = await response.json() as ShopCategory[] | { errors: string };

    if (!response.ok) {
        if (response.status === 401) {
            redirect("/api/auth/logout");
        }
        const errorData = data as { errors: string };
        throw new Error(errorData.errors || "Failed to fetch categories");
    }
    
    return data as ShopCategory[];
}

export async function getShopCategory(id: string | number): Promise<ShopCategory> {
    const token = await getSession();
    const response = await fetch(`${API_URLS.VENDOR.CATEGORIES}/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    const data = await response.json() as ShopCategory | { errors: string };

    if (!response.ok) {
        if (response.status === 401) {
            redirect("/api/auth/logout");
        }
        const errorData = data as { errors: string };
        throw new Error(errorData.errors || "Failed to fetch category");
    }
    
    return data as ShopCategory;
}

export async function createShopCategory({ name }: CreateCategoryParams): Promise<ShopCategory> {
    const token = await getSession();
    const response = await fetch(API_URLS.VENDOR.CATEGORIES, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ shop_category: { name } }),
    });

    const data = await response.json() as ShopCategory | { errors: string };

    if (!response.ok) {
        if (response.status === 401) {
            redirect("/api/auth/logout");
        }
        const errorData = data as { errors: string };
        throw new Error(errorData.errors || "Failed to create category");
    }
    
    return data as ShopCategory;
}

export async function updateShopCategory({ id, name }: UpdateCategoryParams): Promise<ShopCategory> {
    const token = await getSession();
    const response = await fetch(`${API_URLS.VENDOR.CATEGORIES}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ shop_category: { name } }),
    });

    const data = await response.json() as ShopCategory | { errors: string };

    if (!response.ok) {
        if (response.status === 401) {
            redirect("/api/auth/logout");
        }
        const errorData = data as { errors: string };
        throw new Error(errorData.errors || "Failed to update category");
    }
    
    return data as ShopCategory;
}

export async function deleteShopCategory({ id }: DeleteCategoryParams): Promise<void> {
    const token = await getSession();
    const response = await fetch(`${API_URLS.VENDOR.CATEGORIES}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        if (response.status === 401) {
            redirect("/api/auth/logout");
        }
        const data = await response.json() as { errors: string };
        throw new Error(data.errors || "Failed to delete category");
    }
}

export async function getGlobalCategories(): Promise<GlobalCategory[]> {
    const response = await fetch(API_URLS.CATEGORIES.ROOT, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json() as GlobalCategory[] | { errors: string };

    if (!response.ok) {
        const errorData = data as { errors: string };
        throw new Error(errorData.errors || "Failed to fetch global categories");
    }
    
    return data as GlobalCategory[];
}
