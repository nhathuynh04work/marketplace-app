import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	registerShop,
	updateShop,
} from "@/app/actions/vendor/shops";
import {  Shop } from "@/types/vendor";

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
