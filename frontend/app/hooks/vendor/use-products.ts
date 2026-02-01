import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
	getVendorProducts,
	getVendorProduct,
	createProduct,
	updateProduct,
	deleteProduct,
} from "@/app/actions/vendor/products";
import { Product } from "@/types/vendor";

export const useVendorProducts = () => {
	return useQuery<Product[], Error>({
		queryKey: ["vendor", "products"],
		queryFn: getVendorProducts,
	});
};

export const useVendorProduct = (id: number) => {
	return useQuery<Product, Error>({
		queryKey: ["vendor", "products", id],
		queryFn: () => getVendorProduct({ id }),
		enabled: !!id,
	});
};

export const useCreateProduct = () => {
	const queryClient = useQueryClient();

	return useMutation<Product, Error, { data: FormData }>({
		mutationFn: createProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["vendor", "products"] });
		},
	});
};

export const useUpdateProduct = () => {
	const queryClient = useQueryClient();

	return useMutation<Product, Error, { id: number; data: FormData }>({
		mutationFn: updateProduct,
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["vendor", "products"] });
			queryClient.invalidateQueries({ queryKey: ["vendor", "products", data.id] });
		},
	});
};

export const useDeleteProduct = () => {
	const queryClient = useQueryClient();

	return useMutation<void, Error, { id: number }>({
		mutationFn: deleteProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["vendor", "products"] });
		},
	});
};
