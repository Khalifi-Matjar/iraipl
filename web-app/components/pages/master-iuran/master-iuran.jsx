import React from 'react';
import { Button } from '@mui/material';
import { LocalTable } from '../../organisms/local-table';
import { MasterPage } from '../master-page';
import { useMasterIuran } from './master-iuran-hooks';
import { MasterIuranFormDialog } from './master-iuran-form-dialog';
import { deleteData, listData, mutateData } from './master-iuran-functions';

export const MasterIuran = () => {
    const {
        tblColDef,
        tblRows,
        setTblRows,
        setFormValue,
        setId,
        isFormOpen,
        setIsFormOpen,
        formDef,
        formValue,
        id,
    } = useMasterIuran();

    return (
        <MasterPage>
            <Button
                variant="contained"
                onClick={() => {
                    setFormValue({});
                    setId(null);
                    setIsFormOpen(true);
                }}
            >
                Tambah Data Iuran
            </Button>
            <br />
            <LocalTable
                columns={tblColDef}
                data={tblRows}
                title="Jenis-Jenis Iuran"
            />
            <MasterIuranFormDialog
                isOpen={isFormOpen}
                formDef={formDef}
                formValue={formValue}
                id={id}
                onSubmit={mutateData(id, ({ success }) => {
                    if (success) {
                        setIsFormOpen(false);
                        listData((iuran) => void setTblRows(iuran));
                    }
                })}
                onDelete={() => {
                    deleteData(id, ({ success }) => {
                        if (success) {
                            setIsFormOpen(false);
                            listData((iuran) => void setTblRows(iuran));
                        }
                    });
                }}
                onClose={() => void setIsFormOpen(false)}
            />
        </MasterPage>
    );
};
