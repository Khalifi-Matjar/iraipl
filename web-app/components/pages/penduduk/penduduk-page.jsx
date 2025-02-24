import React from 'react';
import { Button } from '@mui/material';
import { LocalTable } from '../../organisms/local-table';
import { MasterPage } from '../master-page';
import { usePenduduk } from './penduduk-hooks';
import { PendudukFormDialog } from './penduduk-form-dialog';
import {
    mutatePenduduk,
    listPenduduk,
    deletePenduduk,
    pushRetribution,
    findPenduduk,
} from './penduduk-functions';
import { PendudukFormIuran } from './penduduk-form-iuran';

export const Penduduk = () => {
    const {
        pendudukTblColDef,
        pendudukFormDef,
        pendudukTblRows,
        setPendudukTblRows,
        isFormOpen,
        setIsFormOpen,
        formValue,
        setFormValue,
        pendudukId,
        setPendudukId,
        formIuranFormDef,
        formIuranFormValue,
        setFormIuranFormValue,
        formIuranTblColDef,
        formIuranTblData,
        setRetributionList,
    } = usePenduduk();

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
            <LocalTable
                columns={pendudukTblColDef}
                data={pendudukTblRows}
                title="Daftar Penduduk"
            />
            <PendudukFormDialog
                isOpen={isFormOpen}
                pendudukFormDef={pendudukFormDef}
                pendudukFormValue={formValue}
                pendudukId={pendudukId}
                onSubmit={mutatePenduduk(pendudukId, ({ success }) => {
                    if (success) {
                        setIsFormOpen(false);
                        listPenduduk(
                            (penduduk) => void setPendudukTblRows(penduduk)
                        );
                    }
                })}
                onDelete={() => {
                    deletePenduduk(pendudukId, ({ success }) => {
                        if (success) {
                            setIsFormOpen(false);
                            listPenduduk(
                                (penduduk) => void setPendudukTblRows(penduduk)
                            );
                        }
                    });
                }}
                onClose={() => void setIsFormOpen(false)}
                formIuranComp={
                    <PendudukFormIuran
                        formIuranFormDef={formIuranFormDef}
                        formIuranFormValue={formIuranFormValue}
                        formIuranTblColDef={formIuranTblColDef}
                        formIuranTblData={formIuranTblData}
                        onSubmit={pushRetribution(pendudukId, ({ success }) => {
                            if (success) {
                                findPenduduk(
                                    pendudukId,
                                    ({ NilaiIuranPenduduks }) => {
                                        setFormIuranFormValue({});
                                        setRetributionList(NilaiIuranPenduduks);
                                    }
                                );
                            }
                        })}
                    />
                }
            />
        </MasterPage>
    );
};
