import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import noop from 'lodash/noop';
import {
    dateFormat,
    formatDate,
    LOCAL_STORAGE_TOKEN_KEY,
} from '../../../utils';
import { SnackbarContext } from '../../context/snackbar-context';
import { ConfirmationModal } from '../../organisms/confirmation-modal';
import { FormBuilder } from '../../organisms/form-builder';
import { LocalTable } from '../../organisms/local-table';
import { PenerimaanIuranCard } from '../../organisms/penerimaan-iuran-card';
import { listData } from './penerimaan-iuran-functions';
import { usePenerimaanIuran } from './penerimaan-iuran-hooks';
import axios from 'axios';
import {
    PenerimaanIuranPageContext,
    PenerimaanIuranType,
} from './penerimaan-iuran-page';

export const PenerimaanIuranList = () => {
    const penerimaanIuranPage = useContext(PenerimaanIuranPageContext);
    const snackbar = useContext(SnackbarContext);
    const [confirmModalProps, setConfirmModalProps] = useState({
        open: false,
        title: '',
        message: '',
        onConfirmYesAction: noop,
        onConfirmNoAction: noop,
    });

    const {
        penerimaanIuranTblColDef,
        penerimaanIuranTblData,
        setPenerimaanIuranTblData,
        highlightedPenerimaan,
        setHighlightedPenerimaan,
        penerimaanIuranSearchFormDef,
        setSearchFormValue,
        searchFormValue,
        penerimaanIuranSearchFormValue,
    } = usePenerimaanIuran();

    const listPenerimaanIuranData = useCallback(
        ({ from, to, ...restParams }) => {
            listData({
                range: JSON.stringify({
                    from,
                    to,
                }),
                withKolektor:
                    penerimaanIuranPage.type ===
                    PenerimaanIuranType.WITH_KOLEKTOR,
                ...restParams,
            })
                .then((response) => {
                    setPenerimaanIuranTblData(response.data.penerimaanIuran);
                })
                .catch((error) => {
                    snackbar.setOpen(true);
                    snackbar.setType('error');
                    snackbar.setMessage(
                        `${error.message} - ${error.response.data.message}`
                    );
                });
        },
        [penerimaanIuranPage.type]
    );

    const penerimaanIuranSearchSubmitDef = useMemo(
        () => ({
            label: `Cari data penerimaan iuran ${penerimaanIuranPage.type === PenerimaanIuranType.WITH_KOLEKTOR ? 'dengan kolektor' : 'tanpa kolektor'}`,
            onSubmit: (value) => {
                setSearchFormValue(value);
                listPenerimaanIuranData(value);
            },
        }),
        [penerimaanIuranPage.type]
    );

    useEffect(() => {
        listPenerimaanIuranData({
            from: formatDate(new Date(), dateFormat.SYSTEM),
            to: formatDate(new Date(), dateFormat.SYSTEM),
        });

        setHighlightedPenerimaan(null);
    }, [penerimaanIuranPage.type]);

    return (
        <>
            <LocalTable
                columns={penerimaanIuranTblColDef}
                data={penerimaanIuranTblData}
                title={`Daftar Penerimaan Iuran ${penerimaanIuranPage.type === PenerimaanIuranType.WITH_KOLEKTOR ? 'Dengan Kolektor' : 'Tanpa Kolektor'}`}
                searchComponent={
                    <FormBuilder
                        formDefinitions={penerimaanIuranSearchFormDef}
                        valueDefinitions={penerimaanIuranSearchFormValue}
                        submitDefinition={penerimaanIuranSearchSubmitDef}
                    />
                }
            />
            <br />
            <PenerimaanIuranCard
                penerimaanIuran={highlightedPenerimaan}
                hasDeleteButton={true}
                hasPrintButton={true}
                onDelete={(penerimaanIuranId) =>
                    void setConfirmModalProps({
                        open: true,
                        title: 'Hapus data penerimaan iuran',
                        message:
                            'Anda yakin akan menghapus data penerimaan iuran ini?',
                        onConfirmYesAction: () => {
                            axios({
                                method: 'delete',
                                url: `/api/penerimaan-iuran/delete?id=${penerimaanIuranId}`,
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)}`,
                                },
                            })
                                .then(() => {
                                    snackbar.setOpen(true);
                                    snackbar.setType('success');
                                    snackbar.setMessage(
                                        'Data penerimaan iuran telah dihapus'
                                    );
                                    listPenerimaanIuranData(searchFormValue);
                                    setHighlightedPenerimaan(null);
                                })
                                .catch((error) => {
                                    snackbar.setOpen(true);
                                    snackbar.setType('error');
                                    snackbar.setMessage(
                                        `${error.message} - ${error.response.data.message}`
                                    );
                                })
                                .finally(
                                    () =>
                                        void setConfirmModalProps({
                                            open: false,
                                            title: '',
                                            message: '',
                                            onConfirmYesAction: noop,
                                            onConfirmNoAction: noop,
                                        })
                                );
                        },
                        onConfirmNoAction: () =>
                            void setConfirmModalProps({
                                open: false,
                                title: '',
                                message: '',
                                onConfirmYesAction: noop,
                                onConfirmNoAction: noop,
                            }),
                    })
                }
            />
            <ConfirmationModal {...confirmModalProps} />
        </>
    );
};
