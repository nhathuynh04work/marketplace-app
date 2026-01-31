import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
	getShopCategories,
	createShopCategory,
	deleteShopCategory,
} from "@/app/actions/vendor/categories";
import { toast } from "sonner";

export const useShopCategories = () => {
	return useQuery({
		queryKey: ["vendor", "categories"],
		queryFn: () => getShopCategories(),
	});
};

export const useCreateShopCategory = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createShopCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["vendor", "categories"],
			});
			toast.success("Category created");
		},
	});
};

export const useDeleteShopCategory = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteShopCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["vendor", "categories"],
			});
			toast.success("Category deleted");
		},
	});
};
