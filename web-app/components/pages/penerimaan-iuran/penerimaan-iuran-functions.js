import axios from 'axios';
import { LOCAL_STORAGE_TOKEN_KEY } from '../../../utils';

export const listData = (searchParams) => {
    const url = new URL(`${location.origin}/api/penerimaan-iuran/find`);
    url.search = new URLSearchParams({
        ...(searchParams ? searchParams : {}),
    });

    return axios({
        method: 'get',
        url,
        headers: {
            Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
        },
    });
};
