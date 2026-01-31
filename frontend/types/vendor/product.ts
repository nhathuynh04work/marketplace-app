import { ShopCategory } from "./category";

export interface Product {
	id: number;
	name: string;
	slug: string;
	description: string;
	price: number;
	stock_quantity: number;
	status: string;

	shop_category?: ShopCategory;
	images?: string[];
}
