import React from 'react';
import { Button } from '@mui/material';
import { LocalTable } from '../../organisms/local-table';
import { MasterPage } from '../master-page';
import { usePenduduk } from './penduduk-hooks';
import { PendudukFormDialog } from './penduduk-form-dialog';
import { mutatePenduduk, listPenduduk, deletePenduduk } from './penduduk-functions';

export const Penduduk = () => {
    const { pendudukTblColDef, pendudukFormDef, pendudukTblRows, setPendudukTblRows, isFormOpen, setIsFormOpen, formValue, setFormValue, pendudukId, setPendudukId } = usePenduduk();

    return (
        <MasterPage>
            <Button
                variant="contained"
                onClick={() => {
                    setFormValue({});
                    setPendudukId(null);
                    setIsFormOpen(true);
                }}
            >
                Tambah Data Penduduk
            </Button>
            <br />
            <LocalTable columns={pendudukTblColDef} data={pendudukTblRows} title="Daftar Penduduk" />
            <PendudukFormDialog
                isOpen={isFormOpen}
                pendudukFormDef={pendudukFormDef}
                pendudukFormValue={formValue}
                pendudukId={pendudukId}
                onSubmit={mutatePenduduk(pendudukId, ({ success }) => {
                    if (success) {
                        setIsFormOpen(false);
                        listPenduduk((penduduk) => void setPendudukTblRows(penduduk));
                    }
                })}
                onDelete={() => {
                    deletePenduduk(pendudukId, ({ success }) => {
                        if (success) {
                            setIsFormOpen(false);
                            listPenduduk((penduduk) => void setPendudukTblRows(penduduk));
                        }
                    });
                }}
                onClose={() => void setIsFormOpen(false)}
            />
        </MasterPage>
    );
};
