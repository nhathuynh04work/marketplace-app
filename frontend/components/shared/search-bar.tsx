"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBar() {
	return (
		<div className="flex-1 max-w-2xl mx-auto hidden md:block">
			<div className="relative">
				<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input
					type="search"
					placeholder="Search for products..."
					className="w-full bg-secondary/50 pl-9 rounded-full"
				/>
			</div>
		</div>
	);
}

export function MobileSearchBar() {
	return (
		<div className="md:hidden px-4 pb-4">
			<div className="relative">
				<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input
					type="search"
					placeholder="Search..."
					className="w-full bg-secondary/50 pl-9 rounded-full"
				/>
			</div>
		</div>
	);
}
