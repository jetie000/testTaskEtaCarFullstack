import React from "react";
import styles from './header.module.scss'
import { trpc } from "../../utils/trpc";
import { variables } from "../../variables";
import ICoin from "@/interfaces/Coin.interface";

function PopularCoins() {

    const coinsPopular = trpc.getAll.useQuery({ page: 1, limit: variables.POPULAR_COIN_NUM });

    return (
        <div id={styles.popular}>
            {coinsPopular.isSuccess &&
                coinsPopular.data?.data.map((coin: ICoin) =>
                    <div key={coin.id}>
                        <div>#{coin.rank}</div>
                        <img loading="lazy"
                            src={variables.COIN_ICONS_API_URL + (coin.symbol.toLowerCase() != '' ? coin.symbol.toLowerCase() : 'notfound')}
                            alt={coin.id}
                        />
                        <div>
                            {coin.symbol} - {Number(coin.priceUsd) < 0.01
                                ? parseFloat(Number(coin.priceUsd).toPrecision(2))
                                : Number(coin.priceUsd).toFixed(2)}$
                        </div>
                    </div>)
            }
        </div>
    );
}

export default PopularCoins;