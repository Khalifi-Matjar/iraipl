import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import isNull from 'lodash/isNull';
import noop from 'lodash/noop';
import { FormBuilder } from '../../organisms/form-builder';
import { ConfirmationModal } from '../../organisms/confirmation-modal';

export const MasterIuranFormDialog = ({
    isOpen,
    formDef,
    formValue,
    onSubmit,
    onDelete,
    onClose,
    id,
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
            <Dialog open={isOpen} fullWidth maxWidth="md">
                <DialogTitle>
                    {isNull(id) ? 'Tambah' : 'Ubah'} Data Jenis Iuran
                </DialogTitle>
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
                        formDefinitions={formDef}
                        valueDefinitions={formValue}
                        submitDefinition={{
                            label: 'Simpan',
                            onSubmit: (value) => {
                                setConfirmModalProps({
                                    open: true,
                                    title: 'Data Jenis Iuran',
                                    message:
                                        'Anda yakin akan menyimpan data jenis iuran ini',
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
                {!isNull(id) && (
                    <DialogActions>
                        <Button
                            fullWidth
                            variant="contained"
                            size="small"
                            color="warning"
                            onClick={() => {
                                setConfirmModalProps({
                                    open: true,
                                    title: 'Hapus Data jenis iuran',
                                    message:
                                        'Anda yakin akan menghapus data jenis iuran ini',
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
                            Hapus data jenis iuran
                        </Button>
                    </DialogActions>
                )}
            </Dialog>
            <ConfirmationModal {...confirmModalProps} />
        </>
    );
};

MasterIuranFormDialog.propTypes = {
    isOpen: PropTypes.bool,
    formDef: PropTypes.arrayOf(PropTypes.object),
    formValue: PropTypes.object,
    id: PropTypes.number,
    onSubmit: PropTypes.func,
    onDelete: PropTypes.func,
    onClose: PropTypes.func,
};
