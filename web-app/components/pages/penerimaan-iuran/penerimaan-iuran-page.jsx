import React, { createContext, useEffect, useMemo, useState } from 'react';
import { MasterPage } from '../master-page';
import { TabLayout } from '../../organisms/tab-layout';
import { listData as listDataKolektor } from '../kolektor/kolektor-functions';
import { PenerimaanIuranFormInput } from './penerimaan-iuran-form-input';
import { PenerimaanIuranList } from './penerimaan-iuran-list';
import PropTypes from 'prop-types';

export const PenerimaanIuranType = {
    WITH_KOLEKTOR: Symbol('WITH_KOLEKTOR'),
    WITHOUT_KOLEKTOR: Symbol('WITHOUT_KOLEKTOR'),
};

export const PenerimaanIuranPageContext = createContext();

export const PenerimaanIuran = ({ type }) => {
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
            <PenerimaanIuranPageContext.Provider value={{ type }}>
                <TabLayout
                    tabElement={penerimaanIuranTabElement}
                    resetIndexTrigger={type}
                />
            </PenerimaanIuranPageContext.Provider>
        </MasterPage>
    );
};

PenerimaanIuran.propTypes = {
    type: PropTypes.symbol,
};
