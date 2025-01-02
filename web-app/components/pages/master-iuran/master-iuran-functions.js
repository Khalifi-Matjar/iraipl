import axios from 'axios';
import { LOCAL_STORAGE_TOKEN_KEY } from '../../../utils';
import isNull from 'lodash/isNull';

export const saveMasterIuran =
    (iuranMasterId, callback) =>
    ({ iuranName, requireCollector }) => {
        axios({
            method: 'post',
            url: isNull(iuranMasterId) ? '/api/master-iuran/add' : `/api/master-iuran/edit?id=${iuranMasterId}`,
            data: {
                iuranName,
                requireCollector,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
            },
        }).then((response) => {
            callback(response.data);
        });
    };

export const getIuran = (callback, id) => {
    axios({
        method: 'get',
        url: `/api/master-iuran/find${id ? `?id=${id}` : ''}`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
        },
    })
        .then((response) => {
            callback(response.data);
        })
        .catch((error) => void console.error('error retrieving iuran', error));
};
