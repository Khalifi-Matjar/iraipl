import axios from 'axios';
import isNull from 'lodash/isNull';
import { LOCAL_STORAGE_TOKEN_KEY } from '../../../utils';

export const mutatePenduduk = (id, callback) => (value) => {
    axios({
        method: 'post',
        url: `${isNull(id) ? '/api/penduduk/add' : `/api/penduduk/update?id=${id}`}`,
        data: { ...value },
        headers: {
            Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
        },
    }).then((response) => {
        callback(response.data);
    });
};

export const deletePenduduk = (id, callback) => {
    axios({
        method: 'delete',
        url: `/api/penduduk/delete?id=${id}`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
        },
    }).then((response) => {
        callback(response.data);
    });
};

export const listPenduduk = (callback) => {
    axios({
        method: 'get',
        url: '/api/penduduk/find',
        headers: {
            Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
        },
    }).then((response) => void callback(response.data.penduduk));
};

export const findPenduduk = (id, callback) => {
    axios({
        method: 'get',
        url: `/api/penduduk/find?id=${id}`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
        },
    }).then((response) => void callback(response.data.penduduk));
};

export const pushRetribution = (id, callback) => (value, resetForm) => {
    axios({
        method: 'post',
        url: `/api/penduduk/push-retribution?id=${id}`,
        data: { ...value },
        headers: {
            Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
        },
    }).then((response) => {
        callback(response.data);
        resetForm();
    });
};

export const deleteRetribution = (id, callback) => {
    axios({
        method: 'delete',
        url: `/api/penduduk/delete-retribution?id=${id}`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
        },
    })
        .then((response) => void callback(response.data))
        .catch((error) => console.error(error));
};
