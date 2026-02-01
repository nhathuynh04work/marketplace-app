import Link from "next/link";
import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/lib/routes";

export function AuthButtons() {
	return (
		<div className="flex items-center gap-2">
			<Link href={APP_ROUTES.LOGIN}>
				<Button variant="ghost">Log in</Button>
			</Link>
			<Link href={APP_ROUTES.SIGNUP}>
				<Button>Sign up</Button>
			</Link>
		</div>
	);
}
