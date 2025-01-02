import axios from 'axios';
import isNull from 'lodash/isNull';
import { LOCAL_STORAGE_TOKEN_KEY } from '../../../utils';

export const mutateData = (id, callback) => (value) => {
    axios({
        method: 'post',
        url: `${isNull(id) ? '/api/master-iuran/add' : `/api/master-iuran/update?id=${id}`}`,
        data: { ...value },
        headers: {
            Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
        },
    }).then((response) => {
        callback(response.data);
    });
};

export const deleteData = (id, callback) => {
    axios({
        method: 'delete',
        url: `/api/master-iuran/delete?id=${id}`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
        },
    }).then((response) => {
        callback(response.data);
    });
};

export const listData = (callback) => {
    axios({
        method: 'get',
        url: '/api/master-iuran/find',
        headers: {
            Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
        },
    }).then((response) => void callback(response.data.iuran));
};

export const findData = (id, callback) => {
    axios({
        method: 'get',
        url: `/api/master-iuran/find?id=${id}`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
        },
    }).then((response) => void callback(response.data.iuran));
};
