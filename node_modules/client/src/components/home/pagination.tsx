import React from "react";
import { Link, useLocation } from 'react-router-dom';
import styles from './home.module.scss';
import { variables } from '../../variables';
import { trpc } from '../../utils/trpc';

function Pagination() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    let page = Number(searchParams.get('page')) || 1;
    const coinsPage = trpc.getAll.useQuery({ page: page, limit: variables.POPULAR_COIN_NUM });

    return (
        <div data-testid='pagination' id='pagination' className={styles.pagination}>
            {coinsPage.isSuccess &&
                <>
                    <Link className={page === 1 ? styles.disabled : ''} to={'?page=1'}>
                        &lt;&lt;
                    </Link>
                    <Link className={page === 1 ? styles.disabled : ''} to={'?page=' + ((page - 1) || 1)}>
                        &lt;
                    </Link>
                    <Link to={''}>
                        {page}
                    </Link>
                    <Link className={page === variables.LAST_PAGE ? styles.disabled : ''} to={'?page=' + ((page + 1) || 1)}>
                        &gt;
                    </Link>
                    <Link className={page === variables.LAST_PAGE ? styles.disabled : ''} to={'?page=' + variables.LAST_PAGE}>
                        &gt;&gt;
                    </Link>
                </>
            }
        </div>
    );
}

export default Pagination;