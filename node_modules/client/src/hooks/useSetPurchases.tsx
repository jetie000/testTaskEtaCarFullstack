import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CoinService } from "../utils/coins.service"

export const useSetPurchases = () => {
    const queryClient = useQueryClient();

    return useMutation(CoinService.setPurchases, {
        onSuccess: (purchs) => {
            queryClient.setQueryData( ['purchases'], purchs)
        }
    })
}