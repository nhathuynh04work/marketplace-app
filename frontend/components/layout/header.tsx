"use server";

import { getSession } from "@/lib/session";
import { getVendorStatus } from "@/app/actions/vendor/shops";
import { Logo } from "@/components/shared/logo";
import { SearchBar, MobileSearchBar } from "@/components/shared/search-bar";
import { CartButton } from "@/components/shared/cart-button";
import { AuthButtons } from "@/components/shared/auth-buttons";
import { UserMenu } from "@/components/shared/user-menu";

export default async function Header() {
	const session = await getSession();
	const isLoggedIn = !!session;
	
	let vendorStatus = null;
	if (isLoggedIn) {
		try {
			vendorStatus = await getVendorStatus();
		} catch {
			vendorStatus = { has_shop: false, shop: null };
		}
	}

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
			<div className="container mx-auto flex h-16 items-center px-4 gap-4">
				<Logo />
				<SearchBar />
				<div className="flex items-center gap-4">
					<CartButton />
					{isLoggedIn ? (
						<UserMenu vendorStatus={vendorStatus!} />
					) : (
						<AuthButtons />
					)}
				</div>
			</div>
			<MobileSearchBar />
		</header>
	);
}
