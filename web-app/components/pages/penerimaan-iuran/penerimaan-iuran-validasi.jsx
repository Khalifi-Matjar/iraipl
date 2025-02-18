import React, { useContext, useEffect, useMemo } from 'react';
import { dateFormat, formatDate } from '../../../utils';
import { SnackbarContext } from '../../context/snackbar-context';
import { FormBuilder } from '../../organisms/form-builder';
import { LocalTable } from '../../organisms/local-table';
import { PenerimaanIuranCard } from '../../organisms/penerimaan-iuran-card';
import { listData, validatePenerimaan } from './penerimaan-iuran-functions';
import { usePenerimaanIuran } from './penerimaan-iuran-hooks';
import { MasterPage } from '../master-page';
import { ConfirmationContext } from '../../context/confirmation-context';

export const PenerimaanIuranValidasi = () => {
    const confirmation = useContext(ConfirmationContext);
    const snackbar = useContext(SnackbarContext);

    const {
        penerimaanIuranTblColDef,
        penerimaanIuranTblData,
        setPenerimaanIuranTblData,
        setHighlightedPenerimaan,
        highlightedPenerimaan,
        penerimaanIuranSearchFormDef,
        searchFormValue,
        setSearchFormValue,
        penerimaanIuranSearchFormValue,
    } = usePenerimaanIuran();

    const listPenerimaanIuranData = ({ from, to }) => {
        listData({
            range: JSON.stringify({
                from,
                to,
            }),
            isValidated: false,
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
    };

    const penerimaanIuranSearchSubmitDef = useMemo(
        () => ({
            label: 'Cari data penerimaan iuran',
            onSubmit: (value) => {
                setSearchFormValue(value);
                listPenerimaanIuranData(value);
            },
        }),
        []
    );

    useEffect(() => {
        listPenerimaanIuranData({
            from: formatDate(new Date(), dateFormat.SYSTEM),
            to: formatDate(new Date(), dateFormat.SYSTEM),
        });
    }, []);

    return (
        <MasterPage>
            <LocalTable
                columns={penerimaanIuranTblColDef}
                data={penerimaanIuranTblData}
                title="Daftar Penerimaan Iuran Belum Validasi"
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
                hasValidateButton={true}
                onValidateAccept={(penerimaanId) => {
                    confirmation.setMessage(
                        'Anda yakin telah memvalidasi penerimaan ini?'
                    );
                    confirmation.setTitle('Validasi terima');
                    confirmation.setOnConfirmYesAction(() => () => {
                        validatePenerimaan({
                            penerimaanId,
                            validationStatus: 1,
                            summary: '',
                        })
                            .then(() => {
                                snackbar.setOpen(true);
                                snackbar.setType('success');
                                snackbar.setMessage(
                                    'Penerimaan telah divalidasi. Validasi terima'
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
                            .finally(() => {
                                confirmation.setOpen(false);
                            });
                    });
                    confirmation.setOpen(true);
                }}
            />
        </MasterPage>
    );
};
