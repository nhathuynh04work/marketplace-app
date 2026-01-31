import { GlobalCategory, ShopCategory } from "./category";

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
