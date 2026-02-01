"use client";

import { useState } from "react";
import { VendorStatus } from "@/types/vendor";
import { AccountSidebar } from "./account-sidebar";
import { ProfileTab } from "./profile-tab";
import { VendorTab } from "./vendor-tab";
import { logoutAction } from "@/app/actions/auth";
import { ShopRegistrationForm } from "../vendor/shop-registration-form";

export default function AccountTabs({
    vendorStatus,
}: {
    vendorStatus: VendorStatus;
}) {
    const [activeTab, setActiveTab] = useState<"profile" | "vendor">("profile");

    const handleLogout = async () => {
        await logoutAction();
    };

    return (
        <div className="flex flex-col md:flex-row gap-8">
            <AccountSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                hasShop={vendorStatus.has_shop}
                onLogout={handleLogout}
            />

            <main className="flex-1 min-w-0">
                {activeTab === "profile" && <ProfileTab />}

                {activeTab === "vendor" && (
                    <>
                        {vendorStatus.has_shop && vendorStatus.shop ? (
                            <VendorTab shop={vendorStatus.shop} />
                        ) : (
                            <ShopRegistrationForm />
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
