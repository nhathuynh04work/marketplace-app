"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CartButton() {
	return (
		<Button
			variant="ghost"
			size="icon"
			className="hidden sm:flex">
			<ShoppingCart className="h-5 w-5" />
			<span className="sr-only">Cart</span>
		</Button>
	);
}
