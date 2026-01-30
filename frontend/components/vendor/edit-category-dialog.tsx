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
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

interface EditCategoryDialogProps {
	shopId: number;
	category: ShopCategory;
}

export function EditCategoryDialog({
	shopId,
	category,
}: EditCategoryDialogProps) {
	const [open, setOpen] = useState(false);

	const updateMutation = useMutation({
		mutationFn: async (formData: FormData) => {
			return await updateShopCategory(
				category.id,
				shopId,
				{ status: "idle", message: "" },
				formData,
			);
		},
		onSuccess: (data) => {
			if (data.status === "success") {
				toast.success(data.message);
				setOpen(false);
			} else {
				toast.error(data.message);
			}
		},
		onError: () => {
			toast.error("An unexpected error occurred");
		},
	});

	const deleteMutation = useMutation({
		mutationFn: async () => {
			return await deleteShopCategory(shopId, category.id);
		},
		onSuccess: (data) => {
			if (data.status === "success") {
				toast.success(data.message);
				setOpen(false);
			} else {
				toast.error(data.message);
			}
		},
	});

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		updateMutation.mutate(formData);
	};

	const handleDelete = () => {
		if (confirm("Are you sure? This cannot be undone.")) {
			deleteMutation.mutate();
		}
	};

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

				{/* Standard HTML Form submitting to our handler */}
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="edit-name">Name</Label>
						<Input
							id="edit-name"
							name="name"
							defaultValue={category.name}
							required
						/>
						{/* Note: If you want field validation errors from the server 
                           displayed here, you would check updateMutation.data?.fieldErrors
                        */}
						{updateMutation.data?.status === "error" &&
							updateMutation.data.fieldErrors?.name && (
								<p className="text-sm text-destructive">
									{updateMutation.data.fieldErrors.name[0]}
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
							disabled={
								deleteMutation.isPending ||
								updateMutation.isPending
							}
							title="Delete Category">
							{deleteMutation.isPending ? (
								<Loader2 className="h-4 w-4 animate-spin" />
							) : (
								<Trash2 className="h-4 w-4" />
							)}
						</Button>
						<Button
							type="submit"
							disabled={
								updateMutation.isPending ||
								deleteMutation.isPending
							}>
							{updateMutation.isPending && (
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
