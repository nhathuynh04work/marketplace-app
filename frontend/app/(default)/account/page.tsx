"use client";

import { useVendorStatus } from "@/app/hooks/vendor/use-shops";
import AccountTabs from "@/components/account/account-tabs";

export default function AccountPage() {
	const { data: vendorStatus, isLoading, error } = useVendorStatus();

	if (isLoading) {
		return (
			<div className="container mx-auto py-10 px-4">
				<h1 className="text-3xl font-bold tracking-tight mb-8">
					Account Settings
				</h1>
				<div className="flex items-center justify-center py-8">
					<div className="text-muted-foreground">Loading...</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="container mx-auto py-10 px-4">
				<h1 className="text-3xl font-bold tracking-tight mb-8">
					Account Settings
				</h1>
				<div className="flex items-center justify-center py-8">
					<div className="text-destructive">
						Failed to load account information. Please try again.
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto py-10 px-4">
			<h1 className="text-3xl font-bold tracking-tight mb-8">
				Account Settings
			</h1>
			<AccountTabs vendorStatus={vendorStatus!} />
		</div>
	);
}
