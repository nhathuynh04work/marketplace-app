

export type ShopCategory = {
	id: number;
	name: string;
	is_active: boolean;
	display_order: number;
	created_at: string;
};

export type GlobalCategory = {
	id: number;
	name: string;
	slug: string;
	description?: string;
	ancestry: string | null;
};
