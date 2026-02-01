import Link from "next/link";
import { Store } from "lucide-react";
import { APP_ROUTES } from "@/lib/routes";

export function Logo() {
	return (
		<Link
			href={APP_ROUTES.HOME}
			className="flex items-center gap-2 text-xl font-bold text-primary">
			<Store className="h-6 w-6" />
			<span>Marketplace</span>
		</Link>
	);
}
