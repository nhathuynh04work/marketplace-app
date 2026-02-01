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
    return fetchQuery<VendorStatus>("/vendor/status");
}

export async function getVendorShop(): Promise<Shop> {
    return fetchQuery<Shop>("/vendor/shop");
}

export async function registerShop({ data }: RegisterShopParams): Promise<Shop> {
    return fetchMutation<Shop>("/shops", {
        method: "POST",
        body: data,
    });
}

export async function updateShop({ data }: UpdateShopParams): Promise<Shop> {
    return fetchMutation<Shop>("/vendor/shop", {
        method: "PUT",
        body: data,
    });
}
