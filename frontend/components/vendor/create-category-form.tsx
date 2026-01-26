"use client";

import { createShopCategory } from "@/app/actions/vendor";
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
import { Checkbox } from "@/components/ui/checkbox";
import { FormState } from "@/types/form";
import { Loader2, Plus } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

interface CreateCategoryFormProps {
	shopId: number;
}

const initialState: FormState = {
	status: "idle",
	message: "",
};

export function CreateCategoryForm({ shopId }: CreateCategoryFormProps) {
	const createCategoryWithId = createShopCategory.bind(null, shopId);

	const [state, formAction, isPending] = useActionState(
		createCategoryWithId,
		initialState,
	);

	useEffect(() => {
		if (state.status === "success") {
			toast.success(state.message);
		} else if (state.status === "error") {
			toast.error(state.message);
		}
	}, [state]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Add New Category</CardTitle>
				<CardDescription>
					Create a category to organize your products.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form action={formAction} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name">Category Name</Label>
						<Input
							id="name"
							name="name"
							placeholder="e.g. Summer Sale, New Arrivals"
							required
						/>
						{/* FIX: TypeScript now knows state is not null */}
						{state.fieldErrors?.name && (
							<p className="text-sm text-destructive">
								{state.fieldErrors.name[0]}
							</p>
						)}
					</div>

					<div className="flex items-center space-x-2">
						<Checkbox
							id="is_active"
							name="is_active"
							defaultChecked
						/>
						<Label
							htmlFor="is_active"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
							Visible in shop
						</Label>
					</div>

					<Button
						type="submit"
						disabled={isPending}
						className="w-full">
						{isPending ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Creating...
							</>
						) : (
							<>
								<Plus className="mr-2 h-4 w-4" />
								Create Category
							</>
						)}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
