import Link from "next/link";
import { Store } from "lucide-react";

export default function Footer() {
	return (
		<footer className="border-t bg-background">
			<div className="container mx-auto px-4 py-8 md:py-12">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-4">
					<div className="space-y-4">
						<Link
							href="/"
							className="flex items-center gap-2 text-xl font-bold text-primary">
							<Store className="h-6 w-6" />
							<span>Marketplace</span>
						</Link>
						<p className="text-sm text-muted-foreground">
							The best place to buy and sell products online. Join
							our community today.
						</p>
					</div>
					<div>
						<h3 className="mb-4 text-sm font-semibold">About</h3>
						<ul className="space-y-2 text-sm text-muted-foreground">
							<li>
								<Link
									href="#"
									className="hover:text-foreground">
									Our Story
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="hover:text-foreground">
									Careers
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="hover:text-foreground">
									Press
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="mb-4 text-sm font-semibold">Support</h3>
						<ul className="space-y-2 text-sm text-muted-foreground">
							<li>
								<Link
									href="#"
									className="hover:text-foreground">
									Help Center
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="hover:text-foreground">
									Terms of Service
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="hover:text-foreground">
									Privacy Policy
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="mb-4 text-sm font-semibold">Connect</h3>
						<ul className="space-y-2 text-sm text-muted-foreground">
							<li>
								<Link
									href="#"
									className="hover:text-foreground">
									Twitter
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="hover:text-foreground">
									Instagram
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="hover:text-foreground">
									GitHub
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
					© {new Date().getFullYear()} Marketplace Inc. All rights
					reserved.
				</div>
			</div>
		</footer>
	);
}
