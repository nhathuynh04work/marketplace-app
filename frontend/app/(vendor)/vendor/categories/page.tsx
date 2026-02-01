// frontend/app/(vendor)/vendor/categories/page.tsx

import { getShopCategories, getVendorStatus } from "@/app/actions/vendor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Plus, Folder, ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function VendorCategoriesPage() {
	const { has_shop } = await getVendorStatus();

	if (!has_shop) return <div>Store not found.</div>;

	const categories = await getShopCategories();

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-3xl font-bold tracking-tight">
						Categories
					</h2>
					<p className="text-muted-foreground">
						Organize your products.
					</p>
				</div>
				<Button asChild>
					{/* Link to new page */}
					<Link href="/vendor/categories/new">
						<Plus className="mr-2 h-4 w-4" />
						New Category
					</Link>
				</Button>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Your Categories</CardTitle>
					<CardDescription>
						Manage how products are grouped in your shop.
					</CardDescription>
				</CardHeader>
				<CardContent>
					{categories.length === 0 ? (
						<div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground bg-muted/20 rounded-lg border-dashed border">
							<Folder className="h-10 w-10 mb-4 opacity-50" />
							<h3 className="text-lg font-medium">
								No categories yet
							</h3>
							<Button variant="link" asChild className="mt-2">
								<Link href="/vendor/categories/new">
									Create one now
								</Link>
							</Button>
						</div>
					) : (
						<div className="divide-y border rounded-md">
							{categories.map((category) => (
								<Link
									key={category.id}
									href={`/vendor/categories/${category.id}`}
									className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors group">
									<div className="flex items-center gap-4">
										<div className="p-2 bg-muted rounded-full group-hover:bg-background transition-colors">
											<Folder className="h-4 w-4 text-muted-foreground" />
										</div>
										<div>
											<p className="font-medium">
												{category.name}
											</p>
											<p className="text-xs text-muted-foreground">
												{/* Placeholder for future product count */}
												0 products
											</p>
										</div>
									</div>
									<div className="flex items-center gap-4">
										{category.is_active ? (
											<Badge
												variant="outline"
												className="text-green-600 border-green-600/20 bg-green-50">
												Active
											</Badge>
										) : (
											<Badge variant="secondary">
												Hidden
											</Badge>
										)}
										<ChevronRight className="h-4 w-4 text-muted-foreground" />
									</div>
								</Link>
							))}
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
