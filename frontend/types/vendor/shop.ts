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
