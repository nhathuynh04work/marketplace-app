import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	createShopCategory,
	updateShopCategory,
	deleteShopCategory,
} from "@/app/actions/vendor/categories";
import { ShopCategory } from "@/types/vendor";

export const useCreateShopCategory = () => {
	const queryClient = useQueryClient();

	return useMutation<ShopCategory, Error, { name: string }>({
		mutationFn: createShopCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["vendor", "categories"],
			});
		},
	});
};

export const useUpdateShopCategory = () => {
	const queryClient = useQueryClient();

	return useMutation<ShopCategory, Error, { id: number; name: string }>({
		mutationFn: updateShopCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["vendor", "categories"],
			});
		},
	});
};

export const useDeleteShopCategory = () => {
	const queryClient = useQueryClient();

	return useMutation<void, Error, { id: number }>({
		mutationFn: deleteShopCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["vendor", "categories"],
			});
		},
	});
};
