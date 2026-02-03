import { getVendorStatus } from "@/app/actions/vendor";
import { ShopRegistrationForm } from "@/components/vendor/shop-registration-form";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	DollarSign,
	Package,
	ShoppingBag,
	Users,
} from "lucide-react";

// Mock Data
const MOCK_STATS = [
	{
		title: "Total Revenue",
		value: "$45,231.89",
		change: "+20.1% from last month",
		icon: DollarSign,
	},
	{
		title: "Active Orders",
		value: "+573",
		change: "+201 since last hour",
		icon: ShoppingBag,
	},
	{
		title: "Products",
		value: "24",
		change: "+12 new this week",
		icon: Package,
	},
	{
		title: "Active Customers",
		value: "2,350",
		change: "+180 this month",
		icon: Users,
	},
];

const RECENT_ORDERS = [
	{
		id: "ORD-721",
		customer: "Alice Freeman",
		product: "Wireless Headphones",
		amount: "$199.00",
		status: "Completed",
		date: "Today, 10:23 AM",
	},
	{
		id: "ORD-720",
		customer: "Bob Smith",
		product: "Mechanical Keyboard",
		amount: "$120.50",
		status: "Processing",
		date: "Today, 09:12 AM",
	},
	{
		id: "ORD-719",
		customer: "Charlie Brown",
		product: "Gaming Mouse",
		amount: "$59.00",
		status: "Shipped",
		date: "Yesterday",
	},
	{
		id: "ORD-718",
		customer: "David Wilson",
		product: "4K Monitor",
		amount: "$350.00",
		status: "Completed",
		date: "Yesterday",
	},
	{
		id: "ORD-717",
		customer: "Eva Green",
		product: "USB-C Hub",
		amount: "$45.00",
		status: "Processing",
		date: "Jan 20, 2024",
	},
];

export default async function VendorDashboard() {
	const { has_shop, shop } = await getVendorStatus();

	// CASE 1: No Shop -> Show Registration (Centered in the layout)
	if (!has_shop) {
		return (
			<div className="flex h-[80vh] items-center justify-center">
				<div className="w-full max-w-lg">
					<ShopRegistrationForm />
				</div>
			</div>
		);
	}

	// CASE 2: Dashboard
	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-3xl font-bold tracking-tight">
						Dashboard
					</h2>
					<p className="text-muted-foreground">
						Welcome back to {shop?.name}. Here&apos;s what&apos;s
						happening today.
					</p>
				</div>
				<div className="flex items-center space-x-2">
					<Button>Download Report</Button>
				</div>
			</div>

			{/* Stats Grid */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{MOCK_STATS.map((stat, i) => {
					const Icon = stat.icon;
					return (
						<Card key={i}>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									{stat.title}
								</CardTitle>
								<Icon className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">
									{stat.value}
								</div>
								<p className="text-xs text-muted-foreground">
									{stat.change}
								</p>
							</CardContent>
						</Card>
					);
				})}
			</div>

			{/* Main Content Grid */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
				{/* Simple Analytics Chart Area */}
				<Card className="col-span-4">
					<CardHeader>
						<CardTitle>Overview</CardTitle>
						<CardDescription>
							Monthly revenue overview for the current year.
						</CardDescription>
					</CardHeader>
					<CardContent className="pl-2">
						<div className="h-[300px] w-full flex items-end justify-between px-4 gap-2">
							{/* CSS-only Bar Chart Visualization */}
							{[
								35, 45, 20, 60, 55, 75, 50, 65, 80, 70, 90, 100,
							].map((height, i) => (
								<div
									key={i}
									className="flex flex-col items-center gap-2 flex-1 group">
									<div
										className="w-full bg-primary/20 hover:bg-primary transition-all rounded-t-sm relative"
										style={{ height: `${height}%` }}>
										<div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-sm">
											${height * 100}
										</div>
									</div>
									<span className="text-[10px] text-muted-foreground uppercase">
										{
											[
												"Jan",
												"Feb",
												"Mar",
												"Apr",
												"May",
												"Jun",
												"Jul",
												"Aug",
												"Sep",
												"Oct",
												"Nov",
												"Dec",
											][i]
										}
									</span>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Recent Orders List */}
				<Card className="col-span-3">
					<CardHeader>
						<CardTitle>Recent Sales</CardTitle>
						<CardDescription>
							You made 265 sales this month.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-8">
							{RECENT_ORDERS.map((order) => (
								<div
									key={order.id}
									className="flex items-center">
									<div className="space-y-1 flex-1">
										<p className="text-sm font-medium leading-none">
											{order.customer}
										</p>
										<p className="text-xs text-muted-foreground">
											{order.product}
										</p>
									</div>
									<div className="flex flex-col items-end gap-1">
										<div className="font-medium">
											{order.amount}
										</div>
										<div
											className={
												`text-[10px] px-2 py-0.5 rounded-full font-medium ` +
												(order.status === "Completed"
													? "bg-green-500/10 text-green-500"
													: order.status ===
														  "Processing"
														? "bg-blue-500/10 text-blue-500"
														: "bg-yellow-500/10 text-yellow-500")
											}>
											{order.status}
										</div>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
