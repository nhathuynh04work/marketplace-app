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

export type GlobalCategory = {
	id: number;
	name: string;
	slug: string;
	description?: string;
	ancestry: string | null;
};

export type Product = {
	id: number;
	name: string;
	description: string | null;
	price: string; 
	stock_quantity: number;
	status: "draft" | "active" | "archived";
	category_id: number;
	shop_category_id?: number;
	images: string[];
	created_at: string;
	category?: GlobalCategory;
	shop_category?: ShopCategory;
};

export type VendorStatus = {
	has_shop: boolean;
	shop: Shop | null;
};
