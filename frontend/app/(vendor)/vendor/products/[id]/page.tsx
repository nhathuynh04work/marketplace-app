import {
	getGlobalCategories,
	getShopCategories,
	getVendorStatus,
	getVendorProduct,
} from "@/app/actions/vendor";
import { ProductForm } from "@/components/vendor/product-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { APP_ROUTES } from "@/lib/routes";
import { notFound } from "next/navigation";

interface EditProductPageProps {
	params: Promise<{ id: string }>;
}

export default async function EditProductPage({
	params,
}: EditProductPageProps) {
	const { id } = await params;
	const { has_shop } = await getVendorStatus();

	if (!has_shop) return <div>Store not found.</div>;

	// Fetch all data in parallel
	const [shopCategories, globalCategories, product] = await Promise.all([
		getShopCategories(),
		getGlobalCategories(),
		getVendorProduct({ id: parseInt(id) }),
	]);

	if (!product) {
		notFound();
	}

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
					Edit Product
				</h2>
				<p className="text-muted-foreground">
					Update details for {product.name}.
				</p>
			</div>

			<ProductForm
				shopCategories={shopCategories}
				globalCategories={globalCategories}
				product={product}
			/>
		</div>
	);
}
