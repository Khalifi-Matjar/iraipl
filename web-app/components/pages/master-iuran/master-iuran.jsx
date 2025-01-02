import React from 'react';
import isNull from 'lodash/isNull';
import { Grid } from '@mui/material';
import { FormBuilder } from '../../organisms/form-builder';
import { LocalTable } from '../../organisms/local-table';
import { MasterPage } from '../master-page';
import { useMasterIuranHooks } from './master-iuran-hooks';
import { getIuran, saveMasterIuran } from './master-iuran-functions';

export const MasterIuran = () => {
    const { iuranMasterId, iuranMasterTableColDef, iuranMasterTableData, setIuranMasterTableData, iuranFormDefinition, resetForm } = useMasterIuranHooks();

    return (
        <MasterPage>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <LocalTable columns={iuranMasterTableColDef} data={iuranMasterTableData} />
                </Grid>
                <Grid item xs={6}>
                    <FormBuilder
                        formDefinitions={iuranFormDefinition}
                        submitDefinition={{
                            label: isNull(iuranMasterId) ? 'Save' : 'Edit',
                            onSubmit: saveMasterIuran(
                                iuranMasterId,
                                () =>
                                    void getIuran(
                                        ({ iuran }) =>
                                            void setIuranMasterTableData(
                                                iuran.map(({ id, iuranName, requireCollector }, index) => ({
                                                    no: index + 1,
                                                    id,
                                                    requireCollector: requireCollector ? 'Butuh collector' : 'Tidak membutuhkan collector',
                                                    iuranName,
                                                }))
                                            )
                                    )
                            ),
                            onReset: resetForm,
                        }}
                    />
                </Grid>
            </Grid>
        </MasterPage>
    );
};
