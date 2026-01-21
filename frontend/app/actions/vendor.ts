"use server";

import { API_URL } from "@/lib/api";
import { getSession } from "@/lib/session";
import { APIResponse } from "@/types/api";
import { FormState } from "@/types/form";
import { revalidatePath } from "next/cache";

export type Shop = {
	id: number;
	name: string;
	slug: string;
	description: string | null;
};

export type VendorStatus = {
	has_shop: boolean;
	shop: Shop | null;
};

export async function getVendorStatus(): Promise<VendorStatus> {
	const token = await getSession();

	const res = await fetch(`${API_URL}/shops/check`, {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		cache: "no-store",
	});

	if (!res.ok) {
		return { has_shop: false, shop: null };
	}

	const data: APIResponse<VendorStatus> = await res.json();
	return data.data || { has_shop: false, shop: null };
}

export async function registerShop(prevState: FormState, formData: FormData) {
	const token = await getSession();

	const rawData = {
		shop: {
			name: formData.get("name"),
			description: formData.get("description"),
		},
	};

	const res = await fetch(`${API_URL}/shops`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(rawData),
	});

	const data: APIResponse = await res.json();

	if (!res.ok) {
		return {
			success: false,
			message: data.message || "Failed to create shop",
			errors: data.errors,
		};
	}

	revalidatePath("/vendor");
	return { success: true, message: "Shop registered successfully!" };
}
