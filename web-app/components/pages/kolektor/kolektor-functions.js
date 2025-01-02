import axios from 'axios';
import isNull from 'lodash/isNull';
import { LOCAL_STORAGE_TOKEN_KEY } from '../../../utils';

export const mutateData = (id, callback) => (value) => {
    axios({
        method: 'post',
        url: `${isNull(id) ? '/api/kolektor/add' : `/api/kolektor/update?id=${id}`}`,
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
        url: `/api/kolektor/delete?id=${id}`,
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
        url: '/api/kolektor/find',
        headers: {
            Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
        },
    }).then((response) => void callback(response.data.kolektor));
};

export const findData = (id, callback) => {
    axios({
        method: 'get',
        url: `/api/kolektor/find?id=${id}`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
        },
    }).then((response) => void callback(response.data.kolektor));
};

export const resetPassword = (id, callback) => (value) => {
    axios({
        method: 'post',
        url: `/api/kolektor/reset-password?id=${id}`,
        data: { ...value },
        headers: {
            Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
        },
    }).then((response) => {
        callback(response.data);
    });
};
