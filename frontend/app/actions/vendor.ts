"use server";

import { apiFetch } from "@/lib/api";
import { API_ROUTES } from "@/lib/routes";
import { FormState } from "@/types/form";
import { Shop, VendorStatus } from "@/types/vendor";
import { revalidatePath } from "next/cache";

export async function getVendorStatus(): Promise<VendorStatus> {
	const { result } = await apiFetch<VendorStatus>(API_ROUTES.VENDOR.STATUS, {
		requiresAuth: true,
		cache: "no-store",
	});

	if (!result.success || !result.data) {
		return { has_shop: false, shop: null };
	}

	return result.data;
}

export async function registerShop(
	prevState: FormState,
	formData: FormData,
): Promise<FormState> {
	const rawData = {
		shop: {
			name: formData.get("name"),
			description: formData.get("description"),
		},
	};

	const { result } = await apiFetch<Shop>(API_ROUTES.VENDOR.ROOT, {
		method: "POST",
		requiresAuth: true,
		body: JSON.stringify(rawData),
	});

	if (!result.success) {
		return {
			status: "error",
			message: result.message || "Failed to create shop",
			fieldErrors:
				typeof result.errors === "object"
					? (result.errors as Record<string, string[]>)
					: undefined,
		};
	}

	revalidatePath("/vendor");
	return { status: "success", message: "Shop registered successfully!" };
}
