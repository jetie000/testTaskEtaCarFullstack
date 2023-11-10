import { CoinService } from "../utils/coins.service"
import { useQuery } from '@tanstack/react-query';

export const usePurchases = () => {
    const { isLoading, data: response, isSuccess} = useQuery(
        ['purchases'],
         () => CoinService.getPurchases());
    return {isLoading, data: response, isSuccess};
}