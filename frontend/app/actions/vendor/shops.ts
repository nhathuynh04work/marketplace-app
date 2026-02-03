"use server";

import { API_URLS } from "@/lib/routes";
import { getSession } from "@/lib/session";
import { VendorStatus, Shop } from "@/types/vendor";
import { redirect } from "next/navigation";

interface RegisterShopParams {
    data: FormData;
}

interface UpdateShopParams {
    data: FormData;
}

export async function getVendorStatus(): Promise<VendorStatus> {
    const token = await getSession();
    const response = await fetch(API_URLS.VENDOR.STATUS, {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        if (response.status === 401) {
            redirect("/api/auth/logout");
        }
        throw new Error("Failed to fetch vendor status");
    }

    const data = await response.json() as VendorStatus;
    
    return data;
}

export async function getVendorShop(): Promise<Shop> {
    const token = await getSession();
    const response = await fetch(API_URLS.VENDOR.STATUS, {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    const data = await response.json() as { has_shop: boolean; shop: Shop | null };
    
    if (!response.ok) {
        if (response.status === 401) {
            redirect("/api/auth/logout");
        }
        throw new Error("Failed to fetch shop");
    }

    if (!data.shop) {
        throw new Error("Shop not found");
    }
    
    return data.shop;
}

export async function registerShop({ data }: RegisterShopParams): Promise<Shop> {
    const token = await getSession();
    const response = await fetch(API_URLS.VENDOR.ROOT, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        body: data,
    });

    const responseData = await response.json() as { shop?: Shop; errors?: string };

    if (!response.ok) {
        if (response.status === 401) {
            redirect("/api/auth/logout");
        }
        throw new Error(responseData.errors || "Failed to register shop");
    }
    
    return responseData.shop as Shop;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function updateShop({ data }: UpdateShopParams): Promise<Shop> {
    // Note: Backend doesn't have a shop update endpoint yet
    // This is a placeholder that needs to be implemented on the backend
    throw new Error("Shop update endpoint not implemented on backend");
}
