import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DialogContent, DialogTitle } from '@mui/material';
import noop from 'lodash/noop';
import { FormBuilder } from '../../organisms/form-builder';
import { ConfirmationModal } from '../../organisms/confirmation-modal';
import { LocalTable } from '../../organisms/local-table';

export const PendudukFormIuran = ({
    formIuranFormDef,
    formIuranFormValue,
    formIuranTblColDef,
    formIuranTblData,
    onSubmit,
}) => {
    const [confirmModalProps, setConfirmModalProps] = useState({
        open: false,
        title: '',
        message: '',
        onConfirmYesAction: noop,
        onConfirmNoAction: noop,
    });

    return (
        <>
            <DialogTitle>Atur Nilai Iuran Penduduk</DialogTitle>
            <DialogContent dividers>
                <FormBuilder
                    formDefinitions={formIuranFormDef}
                    valueDefinitions={formIuranFormValue}
                    submitDefinition={{
                        label: 'Simpan pengaturan nilai iuran',
                        onSubmit: (value, resetForm) => {
                            setConfirmModalProps({
                                open: true,
                                title: 'Data penduduk',
                                message:
                                    'Anda yakin akan menyimpan data iuran ini',
                                onConfirmYesAction: () => {
                                    onSubmit(value, resetForm);
                                    setConfirmModalProps({
                                        open: false,
                                        title: '',
                                        message: '',
                                        onConfirmYesAction: noop,
                                        onConfirmNoAction: noop,
                                    });
                                },
                                onConfirmNoAction: () =>
                                    void setConfirmModalProps({
                                        open: false,
                                        title: '',
                                        message: '',
                                        onConfirmYesAction: noop,
                                        onConfirmNoAction: noop,
                                    }),
                            });
                        },
                    }}
                    forceToValueDefinitionAfterSubmit={true}
                />
            </DialogContent>
            <DialogTitle>Daftar / Riwayat Nilai Iuran</DialogTitle>
            <DialogContent dividers>
                <LocalTable
                    columns={formIuranTblColDef}
                    data={formIuranTblData}
                    hasSearch={false}
                    hasTitle={false}
                />
            </DialogContent>
            <ConfirmationModal {...confirmModalProps} />
        </>
    );
};

PendudukFormIuran.propTypes = {
    formIuranFormDef: PropTypes.array,
    formIuranFormValue: PropTypes.object,
    formIuranTblColDef: PropTypes.array,
    formIuranTblData: PropTypes.array,
    onSubmit: PropTypes.func,
};
