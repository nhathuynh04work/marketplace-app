import { Button } from "@/components/ui/button";
import { User, Store, LogOut } from "lucide-react";

interface AccountSidebarProps {
	activeTab: "profile" | "vendor";
	setActiveTab: (tab: "profile" | "vendor") => void;
	hasShop: boolean;
	onLogout: () => void;
}

export function AccountSidebar({
	activeTab,
	setActiveTab,
	hasShop,
	onLogout,
}: AccountSidebarProps) {
	return (
		<aside className="w-full md:w-64 space-y-2 shrink-0">
			<Button
				variant={activeTab === "profile" ? "secondary" : "ghost"}
				className="w-full justify-start"
				onClick={() => setActiveTab("profile")}>
				<User className="mr-2 h-4 w-4" />
				My Profile
			</Button>
			<Button
				variant={activeTab === "vendor" ? "secondary" : "ghost"}
				className="w-full justify-start"
				onClick={() => setActiveTab("vendor")}>
				<Store className="mr-2 h-4 w-4" />
				{hasShop ? "My Shop" : "Register as Vendor"}
			</Button>
			<Button
				variant="ghost"
				className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
				onClick={onLogout}>
				<LogOut className="mr-2 h-4 w-4" />
				Log out
			</Button>
		</aside>
	);
}
