"use server";

import { apiFetch } from "@/lib/api";
import { VendorStatus, Shop } from "@/types/vendor";

export async function getVendorStatus() {
	return await apiFetch<VendorStatus>("/vendor/status");
}

export async function registerShop(formData: FormData) {
	return await apiFetch<Shop>("/shops", {
		method: "POST",
		body: formData,
	});
}
