import { redirect } from "next/navigation";
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

	return <>{children}</>;
}
