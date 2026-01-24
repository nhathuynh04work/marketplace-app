"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ShopRegistrationForm from "@/components/vendor/shop-registration-form";
import { Store, User, LogOut } from "lucide-react";
import { deleteSession } from "@/lib/session";
import { useRouter } from "next/navigation";
import { VendorStatus } from "@/types/vendor";

export default function AccountTabs({
	vendorStatus,
}: {
	vendorStatus: VendorStatus;
}) {
	const [activeTab, setActiveTab] = useState<"profile" | "vendor">("profile");
	const router = useRouter();

	const handleLogout = async () => {
		await deleteSession();
		router.refresh();
		router.push("/");
	};

	return (
		<div className="flex flex-col md:flex-row gap-8">
			{/* Sidebar Navigation */}
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
					{vendorStatus.has_shop ? "My Shop" : "Register as Vendor"}
				</Button>
				<Button
					variant="ghost"
					className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
					onClick={handleLogout}>
					<LogOut className="mr-2 h-4 w-4" />
					Log out
				</Button>
			</aside>

			{/* Main Content Area */}
			<main className="flex-1 min-w-0">
				{activeTab === "profile" && (
					<Card>
						<CardHeader>
							<CardTitle>Profile Information</CardTitle>
							<CardDescription>
								Update your personal details.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									defaultValue="user@example.com"
									disabled
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="name">Display Name</Label>
								<Input id="name" placeholder="Your name" />
							</div>
							<Button>Save Changes</Button>
						</CardContent>
					</Card>
				)}

				{activeTab === "vendor" && (
					<>
						{vendorStatus.has_shop ? (
							<Card>
								<CardHeader>
									<CardTitle>
										My Shop: {vendorStatus.shop?.name}
									</CardTitle>
									<CardDescription>
										Manage your products and orders.
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="rounded-lg border p-4 bg-secondary/20">
										<div className="flex items-center justify-between">
											<div>
												<p className="text-sm font-medium">
													Shop Status
												</p>
												<p className="text-2xl font-bold text-green-500">
													Active
												</p>
											</div>
											<Store className="h-8 w-8 text-muted-foreground" />
										</div>
									</div>
									<Button
										className="w-full"
										onClick={() =>
											router.push("/vendor")
										}>
										Go to Shop Dashboard
									</Button>
								</CardContent>
							</Card>
						) : (
							<ShopRegistrationForm />
						)}
					</>
				)}
			</main>
		</div>
	);
}
