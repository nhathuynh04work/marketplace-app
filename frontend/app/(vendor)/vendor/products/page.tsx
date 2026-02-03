import { getVendorProducts } from "@/app/actions/vendor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Plus, Package, Pencil } from "lucide-react";
import Link from "next/link";
import { APP_ROUTES } from "@/lib/routes";

export default async function VendorProductsPage() {
	const products = await getVendorProducts();

	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-3xl font-bold tracking-tight">
						Products
					</h2>
					<p className="text-muted-foreground">
						Manage your product inventory.
					</p>
				</div>
				<Button asChild>
					<Link href={APP_ROUTES.VENDOR_PRODUCTS_NEW}>
						<Plus className="mr-2 h-4 w-4" />
						Add Product
					</Link>
				</Button>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Inventory</CardTitle>
					<CardDescription>
						You have {products.length} products in your store.
					</CardDescription>
				</CardHeader>
				<CardContent>
					{products.length === 0 ? (
						<div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground bg-muted/20 rounded-lg border-dashed border">
							<Package className="h-10 w-10 mb-4 opacity-50" />
							<h3 className="text-lg font-medium">
								No products yet
							</h3>
							<p className="mb-4 text-sm">
								Get started by creating your first product.
							</p>
							<Button variant="outline" asChild>
								<Link href={APP_ROUTES.VENDOR_PRODUCTS_NEW}>
									Create Product
								</Link>
							</Button>
						</div>
					) : (
						<div className="rounded-md border">
							<div className="grid grid-cols-12 gap-4 border-b bg-muted/50 p-4 text-sm font-medium">
								<div className="col-span-5">Product</div>
								<div className="col-span-2">Price</div>
								<div className="col-span-2">Stock</div>
								<div className="col-span-2">Status</div>
								<div className="col-span-1 text-right">
									Actions
								</div>
							</div>
							<div className="divide-y">
								{products.map((product) => (
									<div
										key={product.id}
										className="grid grid-cols-12 gap-4 p-4 items-center text-sm hover:bg-muted/30 transition-colors">
										<div className="col-span-5 font-medium">
											{product.name}
										</div>
										<div className="col-span-2">
											$
											{parseFloat(product.price).toFixed(
												2,
											)}
										</div>
										<div className="col-span-2">
											{product.stock_quantity}
										</div>
										<div className="col-span-2">
											<Badge
												variant={
													product.status === "active"
														? "default"
														: product.status ===
															  "draft"
															? "secondary"
															: "outline"
												}>
												{product.status}
											</Badge>
										</div>
										{/* Added Edit Action */}
										<div className="col-span-1 text-right">
											<Button
												variant="ghost"
												size="icon"
												asChild>
												<Link
													href={`${APP_ROUTES.VENDOR_PRODUCTS}/${product.id}`}>
													<Pencil className="h-4 w-4 text-muted-foreground" />
													<span className="sr-only">
														Edit
													</span>
												</Link>
											</Button>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
