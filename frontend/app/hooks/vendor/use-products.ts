import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
	getVendorProducts,
	createProduct,
	updateProduct,
	deleteProduct,
} from "@/app/actions/vendor/products";
import { toast } from "sonner";

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
			toast.success("Product created successfully");
		},
		onError: (error) => {
			toast.error(error.message || "Failed to create product");
		},
	});
};

export const useUpdateProduct = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: number; data: FormData }) =>
			updateProduct(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["vendor", "products"] });
			toast.success("Product updated successfully");
		},
	});
};
