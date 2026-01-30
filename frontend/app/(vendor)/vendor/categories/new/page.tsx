import { getVendorStatus } from "@/app/actions/vendor";
import { CategoryForm } from "@/components/vendor/category-form";

export default async function NewCategoryPage() {
	const { has_shop, shop } = await getVendorStatus();
	if (!has_shop || !shop) return <div>Store not found.</div>;

	return <CategoryForm shopId={shop.id} />;
}
