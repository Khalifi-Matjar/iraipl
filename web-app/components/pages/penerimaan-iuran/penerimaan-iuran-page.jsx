import React, { useEffect, useMemo, useState } from 'react';
import { MasterPage } from '../master-page';
import { LocalTable } from '../../organisms/local-table';
import { usePenerimaanIuran } from './penerimaan-iuran-hooks';
import { TabLayout } from '../../organisms/tab-layout';
import { PenerimaanIuranFormInput } from './penerimaan-iuran-form-input';
import { listData as listDataKolektor } from '../kolektor/kolektor-functions';
import { listData as listDataIuran } from '../master-iuran/master-iuran-functions';

export const PenerimaanIuran = () => {
    const [listKolektor, setListKolektor] = useState([]);
    const [listIuran, setListIuran] = useState([]);
    // const [listPenduduk, setListPenduduk] = useState([]);

    useEffect(() => {
        // call list all kolektor
        listDataKolektor((kolektor) => {
            setListKolektor(kolektor);

            // call list all iuran types
            listDataIuran((iuran) => void setListIuran(iuran));
        });

        // call list all penduduk
    }, []);

    const { penerimaanIuranTblColDef } = usePenerimaanIuran();
    const penerimaanIuranTabElement = useMemo(
        () => [
            {
                title: 'Daftar penerimaan iuran',
                children: (
                    <LocalTable
                        columns={penerimaanIuranTblColDef}
                        data={[]}
                        title="Daftar Penerimaan Iuran"
                    />
                ),
            },
            {
                title: 'Input data',
                children: (
                    <PenerimaanIuranFormInput
                        iuran={listIuran}
                        kolektor={listKolektor}
                    />
                ),
            },
        ],
        [listIuran, listKolektor]
    );

    return (
        <MasterPage>
            <TabLayout tabElement={penerimaanIuranTabElement} />
        </MasterPage>
    );
};
