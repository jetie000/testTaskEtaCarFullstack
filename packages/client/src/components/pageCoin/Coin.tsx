import React from "react";
import styles from './coin.module.scss';
import ICoin from '@/interfaces/Coin.interface';
import { variables } from '../../variables';
import Graph from './graph';
import Modal from '../modal/modal';
import { useEffect, useState } from 'react';
import AddCoinModalContent from '../modal/addCoinModalContent';
import { Link, useParams } from 'react-router-dom';
import { trpc } from '../../utils/trpc';
import { useLocalFavs } from "../../hooks/useLocalFavs";
import { useSetLocalFavs } from "../../hooks/useSetLocalFavs";
import Button from "../button/Button";

function CoinPage() {
    let { id } = useParams();
    const coinResponse = trpc.getById.useQuery({ id: id || '1' }); 
    let coin: ICoin = (coinResponse as { data: { data: ICoin } }).data?.data;

    const [modalPurpose, setModalPurpose] = useState('');
    const [responseAdd, setResponseAdd] = useState('')

    const favCoinsLocal = useLocalFavs().data;
    const setFavCoinsLocal = useSetLocalFavs();

    const addFavCoin = (coinId: string) => {
        setFavCoinsLocal.mutate((favCoinsLocal || []).concat(coinId));
    }
    const removeFavCoin = (coinId: string) => {
        setFavCoinsLocal.mutate((favCoinsLocal || []).filter(coin => coin != coinId));
    }

    return (
        <div className={styles.wrapper} >
            {
                (coinResponse.isSuccess) ?
                    <div data-testid='coin-page' className={styles.coin}>
                        <div className={styles.wrapper_left}>
                            <div className={styles.coin_title}>
                                <h1># {coin.rank}</h1>
                                <img
                                    className={styles.fav_img}
                                    src={(favCoinsLocal || []).find(coinId => coinId === coin.id)
                                        ? "/star-fill.svg"
                                        : "/star.svg"}
                                    alt="starfill"
                                    onClick={(favCoinsLocal || []).find(coinId => coinId === coin.id)
                                        ? () => removeFavCoin(coin.id)
                                        : () => addFavCoin(coin.id)
                                    } />
                            </div>
                            <div className={styles.coin_title}>
                                <img loading="lazy"
                                    src={variables.COIN_ICONS_API_URL + (coin.symbol.toLowerCase() != '' ? coin.symbol.toLowerCase() : 'notfound')}
                                    alt={coin.id}
                                />
                                <h1>{coin.name}</h1>
                                <h2>{coin.symbol}</h2>
                            </div>
                            <h1>
                                Price: {Number(coin.priceUsd) < 0.01
                                    ? parseFloat(Number(coin.priceUsd).toPrecision(2))
                                    : Number(coin.priceUsd).toFixed(2)}$
                            </h1>
                            <h3 className={styles.coin_info}>
                                <div>
                                    Market cap:
                                </div>
                                <div>
                                    {Number(coin.marketCapUsd) === 0
                                        ? '-'
                                        : Math.abs(Number(coin.marketCapUsd)) < 0.01
                                            ? Math.abs(Number(coin.marketCapUsd)).toPrecision(2)
                                            : Math.abs(Number(coin.marketCapUsd)).toFixed(2) + '$'}
                                </div>
                            </h3>
                            <h3 >
                                <div className={styles.coin_info}>
                                    <div>
                                        Circulating supply:
                                    </div>
                                    <div>
                                        {Number(coin.supply) === 0
                                            ? '-'
                                            : Number(coin.supply) < 1
                                                ? Number(coin.supply).toPrecision(2)
                                                : Number(coin.supply).toFixed(0) + ' ' + coin.symbol}
                                    </div>
                                </div>
                                {Number(coin?.maxSupply) > 0 &&
                                    <input id={styles.supply_input} value={Number(coin.supply)} max={Number(coin.maxSupply)} type="range" disabled />
                                }
                            </h3>
                            <h3 >
                                <div className={styles.coin_info}>
                                    <div>
                                        Max supply:
                                    </div>
                                    <div>
                                        {Number(coin.maxSupply) === 0
                                            ? '-'
                                            : Number(coin.maxSupply) < 1
                                                ? Number(coin.maxSupply).toPrecision(2)
                                                : Number(coin.maxSupply).toFixed(0) + ' ' + coin.symbol}
                                    </div>
                                </div>
                            </h3>
                            <Button size="large" type="circle" onClick={() => setModalPurpose('add')}>
                                Add
                            </Button>
                        </div>
                        <Graph coin={coin} />
                    </div> :
                    (coinResponse.isError ?
                        <h1 className={styles.no_coin_error}>
                            <div>Incorrect Coin Id</div>
                            <Link to={'/'}>Go back</Link>
                        </h1> :
                        <h1 className={styles.no_coin_error}>
                            <div>Loading...</div>
                        </h1>
                    )
            }
            {modalPurpose === 'add' &&
                <Modal setModalPurpose={setModalPurpose} setResponse={setResponseAdd} isHeader={false}>
                    <AddCoinModalContent coin={coin} responseAdd={responseAdd} setResponseAdd={setResponseAdd} />
                    <></>
                </Modal>
            }
        </div >
    );
}

export default CoinPage;