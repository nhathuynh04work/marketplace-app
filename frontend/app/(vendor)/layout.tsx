import { VendorSidebar } from "@/components/vendor/sidebar";

export default function VendorLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen bg-background">
			<VendorSidebar />
			<main className="pl-64">
				<div className="container mx-auto p-8">{children}</div>
			</main>
		</div>
	);
}
