import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	registerShop,
	getVendorStatus,
	getVendorShop,
	updateShop,
} from "@/app/actions/vendor/shops";
import { VendorStatus, Shop } from "@/types/vendor";

export const useVendorStatus = () => {
	return useQuery<VendorStatus, Error>({
		queryKey: ["vendor", "status"],
		queryFn: getVendorStatus,
	});
};

export const useVendorShop = () => {
	return useQuery<Shop, Error>({
		queryKey: ["vendor", "shop"],
		queryFn: getVendorShop,
	});
};

export const useRegisterShop = () => {
	const queryClient = useQueryClient();

	return useMutation<Shop, Error, { data: FormData }>({
		mutationFn: registerShop,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["vendor", "status"] });
			queryClient.invalidateQueries({ queryKey: ["vendor", "shop"] });
		},
	});
};

export const useUpdateShop = () => {
	const queryClient = useQueryClient();

	return useMutation<Shop, Error, { data: FormData }>({
		mutationFn: updateShop,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["vendor", "shop"] });
		},
	});
};
