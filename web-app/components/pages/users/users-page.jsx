import React, { useContext, useEffect, useState } from 'react';
import isNull from 'lodash/isNull';
import { Button } from '@mui/material';
import { LocalTable } from '../../organisms/local-table';
import { MasterPage } from '../master-page';
import { useUsers } from './users-hooks';
import { SnackbarContext } from '../../context/snackbar-context';
import { UsersFormDialog } from './users-form-dialog';

export const Users = () => {
    const [isOpenForm, setIsOpenForm] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const snackbar = useContext(SnackbarContext);
    const {
        tblColDef,
        getUsersNonKolektor,
        usersNonKolektor,
        setUsersNonKolektor,
        addUserNonKolektor,
        updateUserNonKolektor,
        formDef,
        formValue,
        setFormValue,
    } = useUsers({
        onRowButtonClick: (userDetails) => {
            setSelectedId(userDetails.id);
            setIsOpenForm(true);
        },
    });

    const fetchUsersData = () => {
        getUsersNonKolektor()
            .then(({ data }) => void setUsersNonKolektor(data.users))
            .catch((error) => {
                console.error(error);
                snackbar.setOpen(true);
                snackbar.setType('error');
                snackbar.setMessage(
                    `${error.message} - ${error.response?.data?.message}`
                );
            });
    };

    useEffect(() => {
        fetchUsersData();
    }, []);

    return (
        <>
            <MasterPage>
                <Button
                    variant="contained"
                    onClick={() => {
                        setFormValue({});
                        setSelectedId(null);
                        setIsOpenForm(true);
                    }}
                >
                    Tambah Data Pengguna
                </Button>
                <br />
                <LocalTable
                    columns={tblColDef}
                    data={usersNonKolektor}
                    title="Daftar Pengguna Non Kolektor"
                />
            </MasterPage>
            <UsersFormDialog
                isOpen={isOpenForm}
                id={selectedId}
                formDef={formDef}
                formValue={formValue}
                onSubmit={(
                    { email, name, roleUserId, password1 },
                    resetForm
                ) => {
                    const mutateData = isNull(selectedId)
                        ? addUserNonKolektor({
                              email,
                              name,
                              roleUserId,
                              password: password1,
                          })
                        : updateUserNonKolektor(
                              {
                                  email,
                                  name,
                                  roleUserId,
                                  password: password1,
                              },
                              selectedId
                          );

                    mutateData
                        .then(({ data }) => {
                            resetForm();
                            snackbar.setOpen(true);
                            snackbar.setType('success');
                            snackbar.setMessage(data.message);
                            fetchUsersData();
                            setFormValue({});
                            setSelectedId(null);
                            setIsOpenForm(false);
                        })
                        .catch((error) => {
                            console.error(error);
                            snackbar.setOpen(true);
                            snackbar.setType('error');
                            snackbar.setMessage(
                                `${error.message} - ${error.response?.data?.message}`
                            );
                        });
                }}
                onClose={() => {
                    setFormValue({});
                    setSelectedId(null);
                    setIsOpenForm(false);
                }}
            />
        </>
    );
};
