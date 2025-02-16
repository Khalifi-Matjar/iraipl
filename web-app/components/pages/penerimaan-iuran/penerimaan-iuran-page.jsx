import React, { useEffect, useMemo, useState } from 'react';
import { MasterPage } from '../master-page';
import { TabLayout } from '../../organisms/tab-layout';
import { listData as listDataKolektor } from '../kolektor/kolektor-functions';
import { PenerimaanIuranFormInput } from './penerimaan-iuran-form-input';
import PenerimaanIuranList from './penerimaan-iuran-list';

export const PenerimaanIuran = () => {
    const [listKolektor, setListKolektor] = useState([]);

    useEffect(() => {
        // call list all kolektor
        listDataKolektor((kolektor) => {
            setListKolektor(kolektor);
        });
    }, []);

    const penerimaanIuranTabElement = useMemo(
        () => [
            {
                title: 'Daftar penerimaan iuran',
                children: <PenerimaanIuranList />,
            },
            {
                title: 'Input data',
                children: <PenerimaanIuranFormInput kolektor={listKolektor} />,
            },
        ],
        [listKolektor]
    );

    return (
        <MasterPage>
            <TabLayout tabElement={penerimaanIuranTabElement} />
        </MasterPage>
    );
};
