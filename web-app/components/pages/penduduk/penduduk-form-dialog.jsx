import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import isNull from 'lodash/isNull';
import noop from 'lodash/noop';
import { FormBuilder } from '../../organisms/form-builder';
import { ConfirmationModal } from '../../organisms/confirmation-modal';

export const PendudukFormDialog = ({ isOpen, pendudukFormDef, pendudukFormValue, onSubmit, onDelete, onClose, pendudukId }) => {
    const [confirmModalProps, setConfirmModalProps] = useState({
        open: false,
        title: '',
        message: '',
        onConfirmYesAction: noop,
        onConfirmNoAction: noop,
    });

    return (
        <>
            <Dialog open={isOpen} fullWidth maxWidth="md">
                <DialogTitle>{isNull(pendudukId) ? 'Tambah' : 'Ubah'} Data Penduduk</DialogTitle>
                <IconButton
                    aria-label="close"
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <FormBuilder
                        formDefinitions={pendudukFormDef}
                        valueDefinitions={pendudukFormValue}
                        submitDefinition={{
                            label: 'Simpan',
                            onSubmit: (value) => {
                                setConfirmModalProps({
                                    open: true,
                                    title: 'Data penduduk',
                                    message: 'Anda yakin akan menyimpan data penduduk ini',
                                    onConfirmYesAction: () => {
                                        onSubmit(value);
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
                    />
                </DialogContent>
                {!isNull(pendudukId) && (
                    <DialogActions>
                        <Button
                            fullWidth
                            variant="contained"
                            size="small"
                            color="warning"
                            onClick={() => {
                                setConfirmModalProps({
                                    open: true,
                                    title: 'Hapus Data penduduk',
                                    message: 'Anda yakin akan menghapus data penduduk ini',
                                    onConfirmYesAction: () => {
                                        onDelete();
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
                            }}
                        >
                            Hapus data penduduk
                        </Button>
                    </DialogActions>
                )}
            </Dialog>
            <ConfirmationModal {...confirmModalProps} />
        </>
    );
};

PendudukFormDialog.propTypes = {
    isOpen: PropTypes.bool,
    pendudukFormDef: PropTypes.arrayOf(PropTypes.object),
    pendudukFormValue: PropTypes.object,
    pendudukId: PropTypes.string,
    onSubmit: PropTypes.func,
    onDelete: PropTypes.func,
    onClose: PropTypes.func,
};
