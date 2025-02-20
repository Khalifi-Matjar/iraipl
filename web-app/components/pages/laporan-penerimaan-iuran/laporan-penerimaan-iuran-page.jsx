import React, { useMemo } from 'react';
import { TabLayout } from '../../organisms/tab-layout';
import { MasterPage } from '../master-page';
import { LaporanRincianPenerimaan } from './laporan-rincian-penerimaan';
import { LaporanRekapPenerimaanKolektor } from './laporan-rekap-penerimaan-kolektor';

export const LaporanPenerimaanIuran = () => {
    const laporanPenerimaanTabChildren = useMemo(
        () => [
            {
                title: 'Rincian Penerimaan',
                children: <LaporanRincianPenerimaan />,
            },
            {
                title: 'Rekap Kutipan per Kolektor',
                children: <LaporanRekapPenerimaanKolektor />,
            },
        ],
        []
    );

    return (
        <MasterPage>
            <TabLayout tabElement={laporanPenerimaanTabChildren} />
        </MasterPage>
    );
};
