import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
	getShopCategories,
	createShopCategory,
	updateShopCategory,
	deleteShopCategory,
	getGlobalCategories,
} from "@/app/actions/vendor/categories";
import { ShopCategory, GlobalCategory } from "@/types/vendor";

export const useShopCategories = () => {
	return useQuery<ShopCategory[], Error>({
		queryKey: ["vendor", "categories"],
		queryFn: getShopCategories,
	});
};

export const useGlobalCategories = () => {
	return useQuery<GlobalCategory[], Error>({
		queryKey: ["global", "categories"],
		queryFn: getGlobalCategories,
	});
};

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
