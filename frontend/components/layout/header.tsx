import Link from "next/link";
import { Search, ShoppingCart, User, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSession } from "@/lib/session";

export default async function Header() {
	const session = await getSession();
	const isLoggedIn = !!session;

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
			<div className="container mx-auto flex h-16 items-center px-4 gap-4">
				{/* Logo */}
				<Link
					href="/"
					className="flex items-center gap-2 text-xl font-bold text-primary">
					<Store className="h-6 w-6" />
					<span>Marketplace</span>
				</Link>

				{/* Search Bar - Takes up remaining space */}
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

				{/* Right Actions */}
				<div className="flex items-center gap-4">
					<Button
						variant="ghost"
						size="icon"
						className="hidden sm:flex">
						<ShoppingCart className="h-5 w-5" />
						<span className="sr-only">Cart</span>
					</Button>

					{isLoggedIn ? (
						// Logged In State: Avatar / Profile Link
						<div className="flex items-center gap-2">
							<Link href="/profile">
								<Button
									variant="secondary"
									size="icon"
									className="rounded-full">
									<User className="h-5 w-5" />
									<span className="sr-only">Profile</span>
								</Button>
							</Link>
						</div>
					) : (
						// Not Logged In State: Auth Buttons
						<div className="flex items-center gap-2">
							<Link href="/login">
								<Button variant="ghost">Log in</Button>
							</Link>
							<Link href="/signup">
								<Button>Sign up</Button>
							</Link>
						</div>
					)}
				</div>
			</div>

			{/* Mobile Search Bar (Visible only on small screens) */}
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
		</header>
	);
}
