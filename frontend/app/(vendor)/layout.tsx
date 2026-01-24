import { redirect } from "next/navigation";
import { VendorSidebar } from "@/components/vendor/sidebar";
import { getVendorStatus } from "@/app/actions/vendor";
import { getSession } from "@/lib/session";

export default async function VendorLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getSession();

	if (!session) {
		redirect("/auth/login");
	}

	const vendorStatus = await getVendorStatus();

	if (!vendorStatus.has_shop || !vendorStatus.shop) {
		redirect("/account?tab=vendor");
	}

	return (
		<div className="flex min-h-screen w-full bg-sidebar text-sidebar-foreground">
			<VendorSidebar shop={vendorStatus.shop} />
			<main className="flex-1 pl-64">
				<div className="container mx-auto p-8 max-w-7xl">
					{children}
				</div>
			</main>
		</div>
	);
}
