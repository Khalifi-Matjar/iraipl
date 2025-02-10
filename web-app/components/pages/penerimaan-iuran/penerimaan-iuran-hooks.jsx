import { Button } from '@mui/material';
import React, { useMemo } from 'react';

export const usePenerimaanIuran = () => {
    const penerimaanIuranTblColDef = useMemo(
        () => [
            {
                header: '',
                accessorKey: 'id',
                size: 30,
                cell: () => {
                    return (
                        <Button
                            variant="contained"
                            size="small"
                            fullWidth
                            onClick={() => {}}
                        >
                            Edit
                        </Button>
                    );
                },
            },
            { header: 'Penduduk', accessorKey: 'penduduk' },
            { header: 'Iuran', accessorKey: 'iuran' },
            { header: 'Tanggal', accessorKey: 'date' },
            { header: 'Jumlah', accessorKey: 'amount' },
        ],
        []
    );

    return {
        penerimaanIuranTblColDef,
    };
};
