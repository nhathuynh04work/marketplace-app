import {
	getShopCategory,
	getVendorProducts,
} from "@/app/actions/vendor";
import { CategoryForm } from "@/components/vendor/category-form";
import { notFound } from "next/navigation";

interface PageProps {
	params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({ params }: PageProps) {
	const { id } = await params;

	const [category, allProducts] = await Promise.all([
		getShopCategory(id),
		getVendorProducts(),
	]);

	if (!category) {
		notFound();
	}

	return (
		<CategoryForm
			category={category}
			allProducts={allProducts}
		/>
	);
}
