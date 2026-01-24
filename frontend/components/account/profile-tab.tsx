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

export function ProfileTab() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Profile Information</CardTitle>
				<CardDescription>Update your personal details.</CardDescription>
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
	);
}
