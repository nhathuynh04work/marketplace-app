export type Shop = {
	id: number;
	name: string;
	slug: string;
	description: string | null;
};

export type ShopCategory = {
	id: number;
	name: string;
	is_active: boolean;
	display_order: number;
	created_at?: string;
};

export type VendorStatus = {
	has_shop: boolean;
	shop: Shop | null;
};
