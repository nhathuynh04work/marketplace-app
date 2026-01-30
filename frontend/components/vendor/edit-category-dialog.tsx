"use client";

import { updateShopCategory, deleteShopCategory } from "@/app/actions/vendor";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ShopCategory } from "@/types/vendor";
import { FormState } from "@/types/form";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

interface EditCategoryDialogProps {
	shopId: number;
	category: ShopCategory;
}

const initialState: FormState = { status: "idle", message: "" };

export function EditCategoryDialog({
	shopId,
	category,
}: EditCategoryDialogProps) {
	const [open, setOpen] = useState(false);
	const updateAction = updateShopCategory.bind(null, category.id, shopId);
	const [state, formAction, isPending] = useActionState(
		updateAction,
		initialState,
	);

	const handleDelete = async () => {
		if (!confirm("Are you sure? This cannot be undone.")) return;

		const res = await deleteShopCategory(shopId, category.id);
		if (res.status === "success") {
			toast.success(res.message);
		} else {
			toast.error(res.message);
		}
	};

	useEffect(() => {
		if (state.status === "success") {
			toast.success(state.message);
			setOpen(false);
		} else if (state.status === "error") {
			toast.error(state.message);
		}
	}, [state]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="ghost" size="icon" className="h-8 w-8">
					<Pencil className="h-4 w-4" />
					<span className="sr-only">Edit</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit Category</DialogTitle>
					<DialogDescription>
						Make changes to your shop category here.
					</DialogDescription>
				</DialogHeader>
				<form action={formAction} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="edit-name">Name</Label>
						<Input
							id="edit-name"
							name="name"
							defaultValue={category.name}
							required
						/>
						{state.fieldErrors?.name && (
							<p className="text-sm text-destructive">
								{state.fieldErrors.name[0]}
							</p>
						)}
					</div>
					<div className="flex items-center space-x-2">
						<Checkbox
							id="edit-active"
							name="is_active"
							defaultChecked={category.is_active}
						/>
						<Label htmlFor="edit-active" className="cursor-pointer">
							Visible in shop
						</Label>
					</div>
					<DialogFooter className="gap-2 sm:gap-0">
						<Button
							type="button"
							variant="destructive"
							size="icon"
							onClick={handleDelete}
							title="Delete Category">
							<Trash2 className="h-4 w-4" />
						</Button>
						<Button type="submit" disabled={isPending}>
							{isPending && (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							)}
							Save changes
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
