import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CoinService } from "../utils/coins.service"

export const useSetLocalFavs = () => {
    const queryClient = useQueryClient();
    return useMutation(CoinService.setLocalFavs, {
        onSuccess: (favs) => {
            queryClient.setQueryData(['coinFavs'], favs)
        }
    })
}