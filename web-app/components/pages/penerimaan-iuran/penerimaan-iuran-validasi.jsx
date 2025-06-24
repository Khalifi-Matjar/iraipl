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

    const validationProcess = ({ penerimaanId, validationStatus, summary }) => {
        validatePenerimaan({
            penerimaanId,
            validationStatus,
            summary,
        })
            .then(() => {
                snackbar.setOpen(true);
                snackbar.setType(validationStatus === 1 ? 'success' : 'error');
                snackbar.setMessage(
                    validationStatus === 1
                        ? 'Penerimaan telah divalidasi. Validasi terima'
                        : 'Penerimaan telah ditolak. Validasi tolak'
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
    };

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
                hasRejectButton={true}
                onValidateAccept={(penerimaanId) => {
                    confirmation.setMessage(
                        'Anda yakin telah memvalidasi penerimaan ini?'
                    );
                    confirmation.setTitle('Validasi terima');
                    confirmation.setOnConfirmYesAction(() => () => {
                        validationProcess({
                            penerimaanId,
                            validationStatus: 1,
                            summary: '',
                        });
                    });
                    confirmation.setOpen(true);
                }}
                onValidateReject={({ penerimaanId, rejectionReason }) => {
                    confirmation.setMessage(
                        'Anda yakin telah menolak penerimaan ini?'
                    );
                    confirmation.setTitle('Validasi tolak');
                    confirmation.setOnConfirmYesAction(() => () => {
                        validationProcess({
                            penerimaanId,
                            validationStatus: 2,
                            summary: rejectionReason,
                        });
                    });
                    confirmation.setOpen(true);
                }}
            />
        </MasterPage>
    );
};
