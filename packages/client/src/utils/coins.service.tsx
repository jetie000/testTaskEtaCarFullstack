import { ICoinCase } from "../../../server/interfaces/ICoinCase";
import { variables } from "../variables"

export const CoinService = {

    getLocalFavs() {
        return JSON.parse(localStorage.getItem(variables.FAV_COINS)!) as string[] || [];
    },
    setLocalFavs: async (favs: string[]): Promise<string[]> => {
        localStorage.setItem(variables.FAV_COINS, JSON.stringify(favs));
        console.log(favs)
        return favs;
    },
    getPurchases() {
        return JSON.parse(localStorage.getItem(variables.USER_COINS)!) as ICoinCase[] || [];
    },
    setPurchases: async (purchs: ICoinCase[]): Promise<ICoinCase[]> => {
        localStorage.setItem(variables.USER_COINS, JSON.stringify(purchs));
        return purchs;
    },
}
