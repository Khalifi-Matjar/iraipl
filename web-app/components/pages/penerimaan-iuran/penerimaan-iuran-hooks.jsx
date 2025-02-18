import { Button } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { monthList } from '../../../utils/constants';
import { dateFormat, formatDate, formatMoney } from '../../../utils';

export const usePenerimaanIuran = () => {
    const [highlightedPenerimaan, setHighlightedPenerimaan] = useState(null);
    const penerimaanIuranTblColDef = useMemo(
        () => [
            {
                header: '',
                accessorKey: 'id',
                size: 30,
                cell: ({ row }) => {
                    return (
                        <Button
                            variant="contained"
                            size="small"
                            fullWidth
                            onClick={() =>
                                void setHighlightedPenerimaan(row.original)
                            }
                        >
                            Detail
                        </Button>
                    );
                },
            },
            {
                header: 'Perumahan',
                accessorKey: 'Penduduk.Perumahan.perumahan',
            },
            { header: 'Alamat', accessorKey: 'Penduduk.address' },
            { header: 'Penduduk', accessorKey: 'Penduduk.pic' },
            { header: 'Iuran', accessorKey: 'MasterIuran.iuranName' },
            {
                header: 'Tgl. Transaksi',
                accessorKey: 'transactionDate',
                cell: ({ row }) => formatDate(row.original.transactionDate),
            },
            {
                header: 'Jumlah',
                accessorKey: 'amount',
                cell: ({ row }) => formatMoney(row.original.amount),
                align: 'right',
            },
            {
                header: 'Periode',
                accessorKey: 'periodMonth',
                cell: ({ row }) => {
                    const periodMonth =
                        monthList[row.original.periodMonth - 1].monthName;
                    const periodYear = row.original.periodYear;

                    return `${periodMonth} ${periodYear}`;
                },
            },
        ],
        []
    );
    const [penerimaanIuranTblData, setPenerimaanIuranTblData] = useState([]);

    const penerimaanIuranSearchFormDef = useMemo(
        () => [
            {
                name: 'from',
                id: 'from',
                label: 'dari',
                gridColumn: 3,
                gridColumnSmall: 6,
                type: 'date',
            },
            {
                name: 'to',
                id: 'to',
                label: 'sampai',
                gridColumn: 3,
                gridColumnSmall: 6,
                type: 'date',
            },
        ],
        []
    );

    const [searchFormValue, setSearchFormValue] = useState({
        from: formatDate(new Date(), dateFormat.SYSTEM),
        to: formatDate(new Date(), dateFormat.SYSTEM),
    });

    const penerimaanIuranSearchFormValue = useMemo(
        () => ({
            from: searchFormValue.from,
            to: searchFormValue.to,
        }),
        [searchFormValue]
    );

    return {
        penerimaanIuranTblColDef,
        penerimaanIuranTblData,
        setPenerimaanIuranTblData,
        highlightedPenerimaan,
        setHighlightedPenerimaan,
        penerimaanIuranSearchFormDef,
        searchFormValue,
        setSearchFormValue,
        penerimaanIuranSearchFormValue,
    };
};
