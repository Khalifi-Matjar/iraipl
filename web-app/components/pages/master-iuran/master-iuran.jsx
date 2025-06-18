import React from 'react';
import { Button } from '@mui/material';
import { LocalTable, rowGrouping } from '../../organisms/local-table';
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
                isExpandable={true}
            />
            <MasterIuranFormDialog
                isOpen={isFormOpen}
                formDef={formDef}
                formValue={formValue}
                id={id}
                onSubmit={mutateData(id, ({ success }) => {
                    if (success) {
                        setIsFormOpen(false);
                        listData((iuran) => {
                            let iuranData = rowGrouping({
                                data: iuran,
                                key: 'id',
                                relation: 'iuranParentId',
                                reference: null,
                            });
                            setTblRows(iuranData);
                        });
                    }
                })}
                onDelete={() => {
                    deleteData(id, ({ success }) => {
                        if (success) {
                            setIsFormOpen(false);
                            listData((iuran) => {
                                let iuranData = rowGrouping({
                                    data: iuran,
                                    key: 'id',
                                    relation: 'iuranParentId',
                                    reference: null,
                                });
                                setTblRows(iuranData);
                            });
                        }
                    });
                }}
                onClose={() => void setIsFormOpen(false)}
            />
        </MasterPage>
    );
};
