"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Store } from "lucide-react";
import { Shop } from "@/types/vendor";

interface VendorTabProps {
	shop: Shop;
}

export function VendorTab({ shop }: VendorTabProps) {
	const router = useRouter();

	return (
		<Card>
			<CardHeader>
				<CardTitle>My Shop: {shop.name}</CardTitle>
				<CardDescription>
					Manage your products and orders.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="rounded-lg border p-4 bg-secondary/20">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium">Shop Status</p>
							<p className="text-2xl font-bold text-green-500">
								Active
							</p>
						</div>
						<Store className="h-8 w-8 text-muted-foreground" />
					</div>
				</div>
				<Button
					className="w-full"
					onClick={() => router.push("/vendor")}>
					Go to Shop Dashboard
				</Button>
			</CardContent>
		</Card>
	);
}
