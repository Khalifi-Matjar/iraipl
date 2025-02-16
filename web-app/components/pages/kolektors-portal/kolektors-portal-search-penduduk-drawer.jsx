import React, { useEffect, useMemo } from 'react';
import omit from 'lodash/omit';
import { Box, Button, Drawer, styled } from '@mui/material';
import { LocalTable } from '../../organisms/local-table';
import { usePenduduk } from '../penduduk/penduduk-hooks';
import PropTypes from 'prop-types';
import { FormBuilder } from '../../organisms/form-builder';

const StyledBox = styled(Box)(() => ({
    width: '90dvw',
}));

export const KolektorsPortalSearchPendudukDrawer = ({
    openSearch,
    setOpenSearch,
    setJenisIuran,
}) => {
    const {
        pendudukTblColDef,
        pendudukTblRows,
        pendudukFormDef,
        jenisIuran,
        filterPenduduk,
    } = usePenduduk(true);

    useEffect(() => void setJenisIuran(jenisIuran), [jenisIuran]);

    const pendudukSearchTblColDef = useMemo(() => {
        const [, ...definitions] = pendudukTblColDef;
        const newCellAction = {
            header: '',
            accessorKey: 'id',
            size: 30,
            cell: (value) => {
                return (
                    <Button
                        variant="contained"
                        size="small"
                        fullWidth
                        onClick={() => {
                            console.log('penduduk dipilih', value);
                        }}
                    >
                        Pilih
                    </Button>
                );
            },
        };

        return [newCellAction, ...definitions];
    }, [pendudukTblColDef]);

    const pendudukSearchFormDef = useMemo(() => {
        const [address, pic, contact, email] = pendudukFormDef.map((formDef) =>
            omit(formDef, ['validationSchema'])
        );

        return [address, pic, contact, email];
    }, [pendudukFormDef]);

    const pendudukSearchSubmitDef = {
        label: 'Cari data penduduk',
        onSubmit: (value) => {
            filterPenduduk(value);
        },
    };
    return (
        <Drawer open={openSearch} onClose={() => setOpenSearch(false)}>
            <StyledBox role="presentation">
                <LocalTable
                    columns={pendudukSearchTblColDef}
                    data={pendudukTblRows}
                    title="Cari dan pilih penduduk aktif"
                    searchComponent={
                        <FormBuilder
                            formDefinitions={pendudukSearchFormDef}
                            valueDefinitions={{}}
                            submitDefinition={pendudukSearchSubmitDef}
                        />
                    }
                />
            </StyledBox>
        </Drawer>
    );
};

KolektorsPortalSearchPendudukDrawer.propTypes = {
    openSearch: PropTypes.bool,
    setOpenSearch: PropTypes.func,
    setJenisIuran: PropTypes.func,
};
