import React from 'react';
import { Button } from '@mui/material';
import { LocalTable } from '../../organisms/local-table';
import { MasterPage } from '../master-page';
import { useKolektor } from './kolektor-hooks';
import { KolektorFormDialog } from './kolektor-form-dialog';
import { deleteData, listData, mutateData, resetPassword } from './kolektor-functions';

export const Kolektor = () => {
    const { tblColDef, tblRows, setTblRows, setFormValue, setId, isFormOpen, setIsFormOpen, formDef, formValue, id, updatePasswordFormDef } = useKolektor();

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
                Tambah Data Kolektor
            </Button>
            <br />
            <LocalTable columns={tblColDef} data={tblRows} title="Daftar Kolektor" />
            <KolektorFormDialog
                isOpen={isFormOpen}
                formDef={formDef}
                formValue={formValue}
                id={id}
                onSubmit={mutateData(id, ({ success }) => {
                    if (success) {
                        setIsFormOpen(false);
                        listData((kolektor) => void setTblRows(kolektor));
                    }
                })}
                onDelete={() => {
                    deleteData(id, ({ success }) => {
                        if (success) {
                            setIsFormOpen(false);
                            listData((kolektor) => void setTblRows(kolektor));
                        }
                    });
                }}
                onClose={() => void setIsFormOpen(false)}
                // Kolektor user management purpose
                updatePasswordFormDef={updatePasswordFormDef}
                onResetPassword={resetPassword(id, ({ success }) => {
                    if (success) {
                        setIsFormOpen(false);
                        listData((kolektor) => void setTblRows(kolektor));
                    }
                })}
            />
        </MasterPage>
    );
};
