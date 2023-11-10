import { CoinService } from "../utils/coins.service"
import { useQuery } from '@tanstack/react-query';

export const useLocalFavs = () => {
    const { isLoading, data: response, isSuccess} = useQuery(
        ['coinFavs'],
         () => CoinService.getLocalFavs());
    return {isLoading, data: response, isSuccess};
}