import React from "react";
import ICoin from '@/interfaces/Coin.interface';
import styles from './mycoins.module.scss'
import { variables } from '../../variables';
import { ICoinCase } from '@/interfaces/ICoinCase';
import { trpc } from '../../utils/trpc';
import { useLocalFavs } from "../../hooks/useLocalFavs";
import { useSetLocalFavs } from "../../hooks/useSetLocalFavs";
import { usePurchases } from "../../hooks/usePurchases";
import { useSetPurchases } from "../../hooks/useSetPurchases";
import Button from "../button/Button";
function MyCoins({ setCurrCoin, setModalPurpose }: { setCurrCoin: Function, setModalPurpose: Function }) {

    const favCoinsLocal: string[] | undefined = useLocalFavs().data;
    const setFavCoinsLocal = useSetLocalFavs();

    const purchasesLocal: ICoinCase[] | undefined = usePurchases().data;
    const setPurchasesLocal = useSetPurchases(); 

    const favCoinsResponse = trpc.getByIds.useQuery({ ids: (favCoinsLocal || []).join(',') }); 
    const purchCoinsResponse = trpc.getByIds.useQuery({ ids: (purchasesLocal?.map(purchLocal => purchLocal.id) || []).join(',') })

    let total = 0;

    const addFavCoin = (coinId: string) => {
        setFavCoinsLocal.mutate((favCoinsLocal || []).concat(coinId));
    }
    const removeFavCoin = (coinId: string) => {
        setFavCoinsLocal.mutate((favCoinsLocal || []).filter(coin => coin != coinId));
    }
    const removePurchase = (index: number) => {
        setPurchasesLocal.mutate((purchasesLocal || []).slice(0, index).concat((purchasesLocal || []).slice(index + 1)));
    }

    (purchasesLocal || [])
        .forEach((purchCoin) => (total +=
            (Number((purchCoinsResponse.data?.data as ICoin[])
                ?.find(coin => coin.id === purchCoin.id)!.priceUsd) - Number(purchCoin.priceUsd)) * purchCoin.coinNum));

    return (
            <div data-testid='purchase-mycoins' className={styles.my_coins}>
                <h1>My coins</h1>
                {
                    favCoinsResponse.isSuccess ? (
                        favCoinsResponse.data.data?.length > 0 ?
                            (favCoinsResponse.data?.data as ICoin[]).map(favCoin =>
                                <div className={styles.fav_item} key={favCoin.id}>
                                    <div onClick={(favCoinsLocal || []).find(coinId => coinId === favCoin.id)
                                        ? () => removeFavCoin(favCoin.id)
                                        : () => addFavCoin(favCoin.id)
                                    }>
                                        <img className={styles.fav} src={(favCoinsLocal || []).find(coinId => coinId === favCoin.id) ? "/star-fill.svg" : "/star.svg"} alt="starfill" />
                                    </div>
                                    <img loading="lazy"
                                        src={variables.COIN_ICONS_API_URL + (favCoin.symbol.toLowerCase() != '' ? favCoin.symbol.toLowerCase() : 'notfound')}
                                        alt={favCoin.id}
                                    />
                                    <h4>
                                        {favCoin.symbol}
                                    </h4>
                                    <h4>
                                        Price: {Number(favCoin.priceUsd) < 0.01
                                            ? parseFloat(Number(favCoin.priceUsd).toPrecision(2))
                                            : Number(favCoin.priceUsd).toFixed(2)}$
                                    </h4>
                                    <Button type="round" onClick={() => { setCurrCoin(favCoin); setModalPurpose('add') }}>
                                        Add
                                    </Button>
                                </div>) :
                            <h4>You haven't favourite coins yet</h4>)
                        :
                        <h4>Error</h4>
                }
                <h1>My purchases</h1>
                {
                    purchCoinsResponse.isSuccess ? (
                        purchCoinsResponse.data.data?.length > 0 ?
                            (purchasesLocal as ICoinCase[]).map((purchCoin, index) => {
                                let coinFromApi = (purchCoinsResponse.data?.data as ICoin[]).find(coin => coin.id === purchCoin.id)!;
                                return <div className={styles.purch_wrapper} key={coinFromApi.id + purchCoin.coinNum + purchCoin.priceUsd}>
                                    <div data-testid='sell-btn-wrapper' className={styles.purch_item}>
                                        <img loading="lazy"
                                            src={variables.COIN_ICONS_API_URL + (coinFromApi.symbol.toLowerCase() != '' ? coinFromApi.symbol.toLowerCase() : 'notfound')}
                                            alt={coinFromApi.id}
                                        />
                                        <h4>
                                            {coinFromApi.symbol}
                                        </h4>
                                        <h4>
                                            Price: {Number(coinFromApi.priceUsd) < 0.01
                                                ? parseFloat(Number(coinFromApi.priceUsd).toPrecision(2))
                                                : Number(coinFromApi.priceUsd).toFixed(2)}$
                                        </h4>
                                        <Button type="round" onClick={() => removePurchase(index)}>
                                            Sell
                                        </Button>
                                    </div>
                                    <div className={styles.purch_item}>
                                        <h4>
                                            Coins bought: {purchCoin.coinNum}
                                        </h4>
                                        <h4>
                                            Initial Price: {Number(purchCoin.priceUsd) < 0.01
                                                ? parseFloat(Number(purchCoin.priceUsd).toPrecision(2))
                                                : Number(purchCoin.priceUsd).toFixed(2)}$
                                        </h4>
                                    </div>
                                    <div className={styles.purch_item}>
                                        <h4>
                                            {Number(coinFromApi.priceUsd) - Number(purchCoin.priceUsd) > 0
                                                ? 'Gain: '
                                                : 'Loss: '
                                            }
                                        </h4>
                                        <h3>
                                            {((Math.abs(Number(coinFromApi.priceUsd) - Number(purchCoin.priceUsd))) * purchCoin.coinNum) < 0.1
                                                ? parseFloat(((Math.abs(Number(coinFromApi.priceUsd) - Number(purchCoin.priceUsd))) * purchCoin.coinNum).toPrecision(3))
                                                : ((Math.abs(Number(coinFromApi.priceUsd) - Number(purchCoin.priceUsd))) * purchCoin.coinNum).toFixed(3)}$
                                        </h3>
                                    </div>
                                </div>
                            }) :
                            <h4>You haven't purchases</h4>)
                        :
                        <h4>Error</h4>
                }
                <h2 className={styles.purch_item + ' ' + styles.total}>
                    Total: {Math.abs(total) < 0.1
                        ? total.toPrecision(3)
                        : total.toFixed(3)
                    }$
                </h2>
            </div>
    );
}

export default MyCoins;