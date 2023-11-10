import React from "react";
import styles from './modal.module.scss'
import { ReactElement } from "react";

function Modal({ children, setModalPurpose, setResponse, isHeader }: { setResponse: Function, setModalPurpose: Function, children: ReactElement[] | ReactElement, isHeader: boolean }) {

    return (
        <div className={styles.shadow}
            onClick={
                () => {
                    isHeader === true ?
                        setModalPurpose('mycoins') :
                        setModalPurpose('')
                    setResponse('')
                }
            }>
            <div className={styles.popup} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default Modal;