"use server";

import { fetchQuery, fetchMutation } from "@/lib/action-utils";
import { VendorStatus, Shop } from "@/types/vendor";

interface RegisterShopParams {
    data: FormData;
}

interface UpdateShopParams {
    data: FormData;
}

export async function getVendorStatus(): Promise<VendorStatus> {
    return fetchQuery<VendorStatus>("/shops/status");
}

export async function getVendorShop(): Promise<Shop> {
    return fetchQuery<Shop>("/vendor/shop");
}

export async function registerShop({ data }: RegisterShopParams): Promise<Shop> {
    const response = await fetchMutation<{ shop: Shop }>("/shops", {
        method: "POST",
        body: data,
    });
    return response.shop;
}

export async function updateShop({ data }: UpdateShopParams): Promise<Shop> {
    return fetchMutation<Shop>("/vendor/shop", {
        method: "PUT",
        body: data,
    });
}
