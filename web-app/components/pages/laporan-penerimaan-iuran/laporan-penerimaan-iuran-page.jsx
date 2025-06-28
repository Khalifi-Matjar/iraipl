import React, { useMemo } from 'react';
import { TabLayout } from '../../organisms/tab-layout';
import { MasterPage } from '../master-page';
import { LaporanRincianPenerimaan } from './laporan-rincian-penerimaan';
import { LaporanRekapPenerimaanKolektor } from './laporan-rekap-penerimaan-kolektor';
import { LaporanRekapPerIuran } from './laporan-rekap-per-iuran';
import { LaporanBelumBayar } from './laporan-belum-bayar-iuran';

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
            {
                title: 'Rekap per Iuran',
                children: <LaporanRekapPerIuran />,
            },
            {
                title: 'Penduduk Belum Bayar',
                children: <LaporanBelumBayar />,
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
