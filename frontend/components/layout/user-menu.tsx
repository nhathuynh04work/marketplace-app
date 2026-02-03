"use client";

import Link from "next/link";
import { User, Store, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VendorStatus } from "@/types/vendor";
import { logoutAction } from "@/app/actions/auth";
import { APP_ROUTES } from "@/lib/routes";

interface UserMenuProps {
	vendorStatus: VendorStatus;
}

export function UserMenu({ vendorStatus }: UserMenuProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="relative h-8 w-8 rounded-full">
					<Avatar className="h-8 w-8">
						<AvatarImage src="/avatars/01.png" alt="@user" />
						<AvatarFallback>U</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">
							My Account
						</p>
						<p className="text-xs leading-none text-muted-foreground">
							User Settings
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />

				{/* Profile Link */}
				<DropdownMenuItem asChild>
					<Link href={APP_ROUTES.ACCOUNT}>
						<User className="mr-2 h-4 w-4" />
						Profile
					</Link>
				</DropdownMenuItem>

				{/* Vendor Switch Link */}
				<DropdownMenuItem asChild>
					{vendorStatus.has_shop ? (
						<Link href="/vendor">
							<Store className="mr-2 h-4 w-4" />
							My Shop Dashboard
						</Link>
					) : (
						<Link href={`${APP_ROUTES.ACCOUNT}?tab=vendor`}>
							<Store className="mr-2 h-4 w-4" />
							Sell on Marketplace
						</Link>
					)}
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				{/* Logout Action */}
				<DropdownMenuItem
					className="text-red-600 focus:text-red-600 focus:bg-red-50"
					onClick={() => logoutAction()}>
					<LogOut className="mr-2 h-4 w-4" />
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
