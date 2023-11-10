import React from "react";
import ICoin from "@/interfaces/Coin.interface";
import styles from './header.module.scss'
import { useNavigate } from 'react-router-dom';
import { variables } from "../../variables";

function CoinSearchItem({ coin }: { coin: ICoin }) {
    const navigate = useNavigate();
    
    return (
        <div className={styles.item + ' ' + styles.coin_search} key={coin.id} onClick={() => navigate('/coin/' + coin.id)}>
            <img className={styles.coin_img} loading="lazy"
                src={variables.COIN_ICONS_API_URL + coin.symbol.toLowerCase()}
                alt={coin.id} />
            <div>
                {coin.name}
            </div>
            <div className={styles.price}>
                {Number(coin.priceUsd).toFixed(2)}$
            </div>
        </div>
    );
}

export default CoinSearchItem;