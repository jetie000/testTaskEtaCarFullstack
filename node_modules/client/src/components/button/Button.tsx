import styles from './button.module.scss'
import React from 'react'

interface ButtonProps {
    size?: 'small' | 'medium' | 'large';
    children: JSX.Element[] | JSX.Element | string;
    isGrow?: boolean;
    type?: 'default' | 'circle' | 'round';
    onClick?: () => void;
}

function Button({ children, size = 'small', isGrow = false, type = 'default', onClick }: ButtonProps) {
    const stylesBtn = [styles[size], styles[type], (isGrow ? styles.grow : '')].join(' ')
    return (
        <button className={stylesBtn} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;