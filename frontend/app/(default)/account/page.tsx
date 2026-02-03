import { getVendorStatus } from "@/app/actions/vendor/shops";
import AccountTabs from "@/components/account/account-tabs";

export default async function AccountPage() {
    const vendorStatus = await getVendorStatus();

	return (
		<div className="container mx-auto py-10 px-4">
			<h1 className="text-3xl font-bold tracking-tight mb-8">
				Account Settings
			</h1>
			<AccountTabs vendorStatus={vendorStatus!} />
		</div>
	);
}
