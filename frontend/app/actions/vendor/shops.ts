"use server";

import { apiFetch } from "@/lib/api";
import { VendorStatus, Shop } from "@/types/vendor";

interface RegisterShopParams {
	data: FormData;
}

export async function getVendorStatus() {
	return await apiFetch<VendorStatus>("/vendor/status");
}

export async function registerShop({ data }: RegisterShopParams) {
	return await apiFetch<Shop>("/shops", {
		method: "POST",
		body: data,
	});
}
