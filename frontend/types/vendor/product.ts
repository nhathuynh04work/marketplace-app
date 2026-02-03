import { ShopCategory, GlobalCategory } from "./category";
import { Shop } from "./shop";

export interface Product {
	id: number;
	name: string;
	slug: string;
	description: string | null;
	price: string;
	stock_quantity: number;
	status: "draft" | "active" | "archived";
	shop?: Shop;
	category?: GlobalCategory | null;
	shop_category?: ShopCategory | null;
	images: Array<{
		id: number;
		url: string;
		filename: string;
	}>;
}
