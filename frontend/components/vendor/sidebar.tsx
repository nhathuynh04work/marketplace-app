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
	ArrowRightLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Shop } from "@/types/vendor";
import { logoutAction } from "@/app/actions/auth";

const sidebarLinks = [
	{ href: "/vendor", label: "Dashboard", icon: LayoutDashboard },
	{ href: "/vendor/products", label: "Products", icon: Package },
	{ href: "/vendor/orders", label: "Orders", icon: ShoppingBag },
	{ href: "/vendor/customers", label: "Customers", icon: Users },
	{ href: "/vendor/analytics", label: "Analytics", icon: BarChart3 },
	{ href: "/vendor/settings", label: "Settings", icon: Settings },
];

interface VendorSidebarProps {
	shop: Shop;
}

export function VendorSidebar({ shop }: VendorSidebarProps) {
	const pathname = usePathname();

	const handleLogout = async () => {
		await logoutAction();
	};

	return (
		<aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
			<div className="flex h-full flex-col">
				{/* Header / Logo */}
				<div className="flex h-16 items-center border-b border-sidebar-border px-6">
					<Link
						href="/vendor"
						className="flex items-center gap-2 font-bold text-sidebar-foreground text-xl">
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
											? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
											: "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
									)}>
									<Icon className="h-4 w-4" />
									{link.label}
								</Link>
							);
						})}
					</nav>
				</div>

				<div className="border-t border-sidebar-border p-4 bg-sidebar">
					<div className="group flex items-center justify-between gap-3 mb-4 rounded-lg border border-sidebar-border bg-background p-3 shadow-sm hover:shadow-md transition-all">
						<div className="flex items-center gap-3 overflow-hidden">
							<Avatar className="h-9 w-9 border border-border">
								<AvatarFallback className="bg-primary/10 text-primary font-bold">
									{shop.name.charAt(0).toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<div className="flex flex-col overflow-hidden">
								<span className="truncate text-sm font-semibold leading-tight">
									{shop.name}
								</span>
								<span className="truncate text-xs text-muted-foreground">
									Vendor Account
								</span>
							</div>
						</div>

						{/* 2-Way Switch Icon */}
						<Button
							variant="ghost"
							size="icon"
							asChild
							className="h-8 w-8 shrink-0 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full"
							title="Switch to Marketplace">
							<Link href="/">
								<ArrowRightLeft className="h-4 w-4" />
							</Link>
						</Button>
					</div>

					<Button
						variant="ghost"
						onClick={handleLogout}
						className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10">
						<LogOut className="mr-2 h-4 w-4" />
						Log out
					</Button>
				</div>
			</div>
		</aside>
	);
}
