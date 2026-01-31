import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { registerShop, getVendorStatus } from "@/app/actions/vendor/shops";

export const useVendorStatus = () => {
	return useQuery({
		queryKey: ["vendor", "status"],
		queryFn: () => getVendorStatus(),
	});
};

export const useRegisterShop = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: registerShop,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["vendor", "status"] });
		},
	});
};
