export interface Product {
	id: number;
	name: string;
	description: string;
	price: number;
	stock: number;
	status: "draft" | "active" | "archived";
	shop_id: number;
	category_id: number;
	shop_category_id: number;
	images: string[];
	created_at: string;
	updated_at: string;
}
