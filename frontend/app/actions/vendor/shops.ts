"use server";

import { apiFetch } from "@/lib/api";
import { VendorStatus, Shop } from "@/types/vendor";

interface RegisterShopParams {
    data: FormData;
}

interface UpdateShopParams {
    data: FormData;
}

export async function getVendorStatus(): Promise<VendorStatus> {
    return apiFetch<VendorStatus>("/shops/status", {
        requiresAuth: true,
    });
}

export async function getVendorShop(): Promise<Shop> {
    return apiFetch<Shop>("/vendor/shop", {
        requiresAuth: true,
    });
}

export async function registerShop({ data }: RegisterShopParams): Promise<Shop> {
    const response = await apiFetch<{ shop: Shop }>("/shops", {
        method: "POST",
        body: data,
        requiresAuth: true,
    });
    return response.shop;
}

export async function updateShop({ data }: UpdateShopParams): Promise<Shop> {
    return apiFetch<Shop>("/vendor/shop", {
        method: "PUT",
        body: data,
        requiresAuth: true,
    });
}
