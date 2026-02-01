import {
	getGlobalCategories,
	getShopCategories,
	getVendorStatus,
} from "@/app/actions/vendor";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { APP_ROUTES } from "@/lib/routes";
import { ProductForm } from "@/components/vendor/product-form";

export default async function NewProductPage() {
	const { has_shop } = await getVendorStatus();

	if (!has_shop) {
		return <div>Store not found.</div>;
	}

	const [shopCategories, globalCategories] = await Promise.all([
		getShopCategories(),
		getGlobalCategories(),
	]);

	return (
		<div className="space-y-6">
			<div>
				<Button
					variant="ghost"
					size="sm"
					asChild
					className="mb-4 pl-0 hover:bg-transparent hover:text-primary">
					<Link href={APP_ROUTES.VENDOR_PRODUCTS}>
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Products
					</Link>
				</Button>
				<h2 className="text-3xl font-bold tracking-tight">
					Add New Product
				</h2>
				<p className="text-muted-foreground">
					Create a new product listing for your shop.
				</p>
			</div>

			<ProductForm
				shopCategories={shopCategories}
				globalCategories={globalCategories}
			/>
		</div>
	);
}
