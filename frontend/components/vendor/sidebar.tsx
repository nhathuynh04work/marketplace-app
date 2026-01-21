"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	LayoutDashboard,
	Package,
	ShoppingBag,
	Settings,
	Store,
	LogOut,
	Users,
	BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sidebarLinks = [
	{ href: "/vendor", label: "Dashboard", icon: LayoutDashboard },
	{ href: "/vendor/products", label: "Products", icon: Package },
	{ href: "/vendor/orders", label: "Orders", icon: ShoppingBag },
	{ href: "/vendor/customers", label: "Customers", icon: Users },
	{ href: "/vendor/analytics", label: "Analytics", icon: BarChart3 },
	{ href: "/vendor/settings", label: "Settings", icon: Settings },
];

export function VendorSidebar() {
	const pathname = usePathname();

	return (
		<aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card">
			<div className="flex h-full flex-col">
				{/* Header / Logo */}
				<div className="flex h-16 items-center border-b px-6">
					<Link
						href="/"
						className="flex items-center gap-2 font-bold text-primary text-xl">
						<Store className="h-6 w-6" />
						<span>VendorPortal</span>
					</Link>
				</div>

				{/* Navigation */}
				<div className="flex-1 overflow-y-auto py-6 px-4">
					<nav className="space-y-1.5">
						{sidebarLinks.map((link) => {
							const Icon = link.icon;
							const isActive = pathname === link.href;

							return (
								<Link
									key={link.href}
									href={link.href}
									className={cn(
										"flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
										isActive
											? "bg-primary text-primary-foreground"
											: "text-muted-foreground hover:bg-muted hover:text-foreground",
									)}>
									<Icon className="h-4 w-4" />
									{link.label}
								</Link>
							);
						})}
					</nav>
				</div>

				{/* Footer / User Profile */}
				<div className="border-t p-4">
					<div className="flex items-center gap-3 mb-4 px-2">
						<div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
							<span className="text-xs font-bold text-primary">
								VP
							</span>
						</div>
						<div className="flex-1 overflow-hidden">
							<p className="truncate text-sm font-medium">
								My Shop
							</p>
							<p className="truncate text-xs text-muted-foreground">
								vendor@example.com
							</p>
						</div>
					</div>
					<Button
						variant="outline"
						className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10">
						<LogOut className="mr-2 h-4 w-4" />
						Sign Out
					</Button>
				</div>
			</div>
		</aside>
	);
}
