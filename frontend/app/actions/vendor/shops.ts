"use server";

import { railsApi } from "@/lib/rails-api";
import { API_URLS } from "@/lib/routes";
import { VendorStatus, Shop } from "@/types/vendor";

interface RegisterShopParams {
    name: string;
    description?: string;
}

interface UpdateShopParams {
    name: string;
    description?: string;
}

export async function getVendorStatus(): Promise<VendorStatus> {
    return await railsApi.get<VendorStatus>(API_URLS.VENDOR.STATUS);
}

export async function getVendorShop(): Promise<Shop> {
    const data = await railsApi.get<{ has_shop: boolean; shop: Shop | null }>(API_URLS.VENDOR.STATUS);
    
    if (!data.shop) {
        throw new Error("Shop not found");
    }
    
    return data.shop;
}

export async function registerShop(params: RegisterShopParams): Promise<Shop> {
    const responseData = await railsApi.post<{ shop: Shop }>(API_URLS.VENDOR.ROOT, {
        shop: {
            name: params.name,
            description: params.description,
        },
    });
    return responseData.shop;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function updateShop(params: UpdateShopParams): Promise<Shop> {
    // Note: Backend doesn't have a shop update endpoint yet
    // This is a placeholder that needs to be implemented on the backend
    throw new Error("Shop update endpoint not implemented on backend");
}
