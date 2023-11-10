import React from "react";
import styles from './header.module.scss'
import { useState } from 'react';
import ICoin from '@/interfaces/Coin.interface';
import MyCoins from '../mycoins/MyCoins';
import Modal from '../modal/modal';
import AddCoinModalContent from "../modal/addCoinModalContent";
import { Link } from 'react-router-dom';
import Button from "../button/Button";
import Search from "./search";
import PopularCoins from "./popularCoins";

function Header() {
    const [modalPurpose, setModalPurpose] = useState('');
    const [responseAdd, setResponseAdd] = useState('');
    const [currCoin, setCurrCoin] = useState<ICoin>();

    const toogleBurger = () => {

        const body = document.querySelector('body');
        const burgerItem = document.getElementById('burger');
        const menu = document.querySelector('nav');
        const cover = document.querySelector('.cover');
        if (burgerItem?.classList.contains(styles.header_burger_active)) {
            menu?.classList.remove(styles.nav_active);
            burgerItem.classList.remove(styles.header_burger_active);
            body?.classList.remove(styles.body_burger_active);
            cover?.classList.remove(styles.cover_active);
        }
        else {
            menu?.classList.add(styles.nav_active);
            burgerItem?.classList.add(styles.header_burger_active);
            body?.classList.add(styles.body_burger_active);
            cover?.classList.add(styles.cover_active);
        }
    }

    return (
        <div className={styles.header}>
            <div onClick={toogleBurger} className="cover"></div>
            <div id='burger' className={styles.burger} onClick={toogleBurger}>
                <span className={styles.burger_line}></span>
                <span className={styles.burger_line}></span>
                <span className={styles.burger_line}></span>
            </div>
            <h2 className={styles.title}>
                <Link to={'/'}>
                    Cryptocurrency by jetie
                </Link>
            </h2>
            <nav>
                <div data-testid='header-mycoins' className={styles.mycoins_link}>
                    <Button type="round" size="medium" onClick={() => setModalPurpose('mycoins')}>
                        My coins
                    </Button>
                </div>
                <Search />
                <PopularCoins />
            </nav>
            {
                modalPurpose === 'mycoins' &&
                <Modal setResponse={setResponseAdd} setModalPurpose={setModalPurpose} isHeader={false}>
                    <MyCoins setModalPurpose={setModalPurpose} setCurrCoin={setCurrCoin} />
                </Modal>
            }
            {(currCoin && modalPurpose === 'add') &&
                <Modal setModalPurpose={setModalPurpose} setResponse={setResponseAdd} isHeader={true}>
                    <AddCoinModalContent coin={currCoin} responseAdd={responseAdd} setResponseAdd={setResponseAdd} />
                </Modal>
            }
        </div >
    );
}

export default Header;