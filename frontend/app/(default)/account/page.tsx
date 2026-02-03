import { getVendorStatus } from "@/app/actions/vendor/shops";
import AccountTabs from "@/components/account/account-tabs";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export default async function AccountPage() {
	let vendorStatus;
	let error = false;

	try {
		vendorStatus = await getVendorStatus();
	} catch (e) {
		// Re-throw redirect errors to allow navigation to happen
		if (isRedirectError(e)) {
			throw e;
		}
		error = true;
		console.error("Failed to load vendor status:", e);
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
