import ProfileTabs from "@/components/profile/profile-tabs";
import { getVendorStatus } from "@/app/actions/vendor";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
	const session = await getSession();

	if (!session) {
		redirect("/login");
	}

	const vendorStatus = await getVendorStatus();

	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto py-10 px-4">
				<h1 className="text-3xl font-bold tracking-tight mb-8">
					Account Settings
				</h1>
				<ProfileTabs vendorStatus={vendorStatus} />
			</div>
		</div>
	);
}
