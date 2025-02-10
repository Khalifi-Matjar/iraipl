import React, { useState } from 'react';
import { MasterPage } from '../master-page';
import { LocalTable } from '../../organisms/local-table';
import { usePenerimaanIuran } from './penerimaan-iuran-hooks';
import { Box, Tab, Tabs } from '@mui/material';

export const PenerimaanIuran = () => {
    const { penerimaanIuranTblColDef } = usePenerimaanIuran();

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <MasterPage>
            <Box
                sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}
            >
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Daftar Penerimaan Iuran non Kolektor" />
                    <Tab label="Tambah Data" />
                </Tabs>
            </Box>
            <br />
            <LocalTable
                columns={penerimaanIuranTblColDef}
                data={[]}
                title="Daftar Penerimaan Iuran"
            />
        </MasterPage>
    );
};
