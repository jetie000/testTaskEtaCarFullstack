import React, { useCallback, useState } from "react";
import Button from "../button/Button";
import styles from './header.module.scss'
import CoinSearchItem from "./coinSearchItem";
import ICoin from "@/interfaces/Coin.interface";
import { trpc } from "../../utils/trpc";
import { variables } from "../../variables";

function Search() {
    const [searchPage, setSearchPage] = useState(1);
    const [searchVal, setSearchVal] = useState('');
    const coinsSearch = trpc.searchAll.useQuery({ page: searchPage, searchStr: searchVal });
    
    let coins: ICoin[] = coinsSearch.data || [];

    const handleSearchClick = useCallback(() => {
        setSearchVal((document.getElementById('searchInput') as HTMLInputElement).value);
        coins = coinsSearch.data || [];
    }, [setSearchVal, coinsSearch]);
    
    const showMore = useCallback(() => {
        setSearchPage(searchPage + 1);
        coins = coinsSearch.data || [];
    }, [setSearchPage, coinsSearch]);
    
    const toogleSearch = () => {
        setSearchPage(1);
        setSearchVal('');
        (document.getElementById('searchInput') as HTMLInputElement).value = '';
        if (document.getElementById(styles.hidden)?.style.visibility != 'visible')
            document.getElementById(styles.hidden)!.style.visibility = 'visible';
        else
            document.getElementById(styles.hidden)!.style.visibility = 'hidden';
    }

    const keyDownHandler = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter')
            handleSearchClick();
    }

    return (
        <>
            <div data-testid='search-shown' id={styles.shown} onClick={toogleSearch}>
                <img src={'/search.svg'} alt='search' />
                <div>
                    Search
                </div>
            </div>
            <div data-testid='seacrh-hidden' id={styles.hidden}>
                <div className={styles.item}>
                    <Button type="circle" onClick={handleSearchClick}>
                        <img src='/search.svg' alt={'search'} />
                    </Button>
                    <input id='searchInput' type="text" onKeyDown={keyDownHandler}/>
                    <Button type="circle" onClick={toogleSearch}>
                        <img src="/x-lg.svg" alt="close" />
                    </Button>
                </div>
                {coins?.length > 0 &&
                    <div data-testid='search-coins' className={styles.items}>
                        {coins?.length > 0 ? coins.slice(0, coins.length - 1).map(coin =>
                            <CoinSearchItem key={coin.id} coin={coin} />
                        ) :
                            (searchVal != '' ?
                                <div className={styles.nores}>
                                    No results
                                </div> :
                                <></>)
                        }
                    </div>
                }
                {
                    coins?.length - (searchPage * (variables.COINS_PER_SEARCH - 1)) > 0 &&
                    <Button type="circle" size="medium" onClick={showMore}>
                        Show more
                    </Button>
                }
            </div>
        </>
    );
}

export default Search;