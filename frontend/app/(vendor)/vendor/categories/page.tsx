import { getShopCategories, getVendorStatus } from "@/app/actions/vendor";
import { CreateCategoryForm } from "@/components/vendor/create-category-form";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default async function VendorCategoriesPage() {
	const { has_shop, shop } = await getVendorStatus();

	if (!has_shop || !shop) {
		return <div>Store not found.</div>;
	}

	const categories = await getShopCategories(shop.id);

	return (
		<div className="space-y-8">
			{/* Header */}
			<div>
				<h2 className="text-3xl font-bold tracking-tight">
					Shop Categories
				</h2>
				<p className="text-muted-foreground">
					Manage the custom categories displayed on your shop page.
				</p>
			</div>

			<div className="grid gap-8 md:grid-cols-3">
				{/* Left Column: List of Categories */}
				<div className="md:col-span-2 space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Your Categories</CardTitle>
							<CardDescription>
								You have {categories.length} custom categories.
							</CardDescription>
						</CardHeader>
						<CardContent>
							{categories.length === 0 ? (
								<div className="text-center py-8 text-muted-foreground bg-muted/30 rounded-lg border-dashed border">
									No categories found. Create one to get
									started!
								</div>
							) : (
								<div className="space-y-2">
									{categories.map((category) => (
										<div
											key={category.id}
											className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
											<span className="font-medium">
												{category.name}
											</span>
											<div className="flex items-center gap-2">
												{category.is_active ? (
													<Badge
														variant="default"
														className="bg-green-600 hover:bg-green-700">
														Active
													</Badge>
												) : (
													<Badge variant="secondary">
														Draft
													</Badge>
												)}
											</div>
										</div>
									))}
								</div>
							)}
						</CardContent>
					</Card>
				</div>

				{/* Right Column: Create Form */}
				<div>
					<CreateCategoryForm shopId={shop.id} />
				</div>
			</div>
		</div>
	);
}
