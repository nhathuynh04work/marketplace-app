import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
	getVendorProducts,
	createProduct,
	updateProduct,
	deleteProduct,
} from "@/app/actions/vendor/products";

export const useVendorProducts = () => {
	return useQuery({
		queryKey: ["vendor", "products"],
		queryFn: () => getVendorProducts(),
	});
};

export const useCreateProduct = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["vendor", "products"] });
		},
	});
};

export const useUpdateProduct = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["vendor", "products"] });
		},
	});
};

export const useDeleteProduct = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["vendor", "products"] });
		},
	});
};
