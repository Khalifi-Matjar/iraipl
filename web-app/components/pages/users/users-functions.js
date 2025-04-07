import axios from 'axios';
import { LOCAL_STORAGE_TOKEN_KEY } from '../../../utils';

export const getUsersNonKolektor = () =>
    axios({
        method: 'get',
        url: '/api/authentication/get-users-non-kolektor',
        headers: {
            Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
        },
    });

export const addUserNonKolektor = ({ email, name, roleUserId, password }) =>
    axios({
        method: 'post',
        url: '/api/authentication/add-user',
        data: { email, name, roleUserId, password },
        headers: {
            Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
        },
    });

export const updateUserNonKolektor = (
    { email, name, roleUserId, password },
    userId
) =>
    axios({
        method: 'post',
        url: `/api/authentication/update-user?id=${userId}`,
        data: { email, name, roleUserId, password },
        headers: {
            Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
        },
    });
