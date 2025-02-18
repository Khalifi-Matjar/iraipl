import React, { useEffect, useMemo } from 'react';
import omit from 'lodash/omit';
import { Avatar, Box, Drawer, Stack, styled, Typography } from '@mui/material';
import { LocalTable } from '../../organisms/local-table';
import { usePenduduk } from '../penduduk/penduduk-hooks';
import PropTypes from 'prop-types';
import { FormBuilder } from '../../organisms/form-builder';
import { getInitialName } from '../../../utils';

const StyledBox = styled(Box)(() => ({
    width: '90dvw',
}));

const StyledButton = styled('button')(() => ({
    background: 'transparent',
    border: 'unset',
    textAlign: 'left',
}));

const PendudukSearchItem = ({ penduduk }) => {
    return (
        <Box>
            <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
                <Avatar>{getInitialName(penduduk.pic)}</Avatar>
                <Stack>
                    <Typography variant="subtitle1">{penduduk.pic}</Typography>
                    <Typography variant="subtitle2">
                        {penduduk.address}
                    </Typography>
                    <Typography variant="caption">
                        {penduduk.Perumahan.perumahan}
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    );
};

PendudukSearchItem.propTypes = {
    penduduk: PropTypes.object,
};

export const KolektorsPortalSearchPendudukDrawer = ({
    openSearch,
    setOpenSearch,
    setJenisIuran,
    onPendudukClick,
}) => {
    const { pendudukTblRows, pendudukFormDef, jenisIuran, filterPenduduk } =
        usePenduduk(true);

    useEffect(() => void setJenisIuran(jenisIuran), [jenisIuran]);

    const pendudukSearchTblColDef = useMemo(
        () => [
            {
                header: 'Daftar penduduk. Tap untuk memilih',
                accessorKey: 'id',
                cell: (value) => (
                    <StyledButton
                        onClick={() => {
                            onPendudukClick(value.row.original);
                            setOpenSearch(false);
                        }}
                    >
                        <PendudukSearchItem penduduk={value.row.original} />
                    </StyledButton>
                ),
            },
        ],
        []
    );

    const pendudukSearchFormDef = useMemo(() => {
        const [address, pic, contact, email] = pendudukFormDef.map((formDef) =>
            omit(formDef, ['validationSchema'])
        );

        return [address, pic, contact, email];
    }, [pendudukFormDef]);

    const pendudukSearchValueDef = useMemo(() => ({}), []);

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
                            valueDefinitions={pendudukSearchValueDef}
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
    onPendudukClick: PropTypes.func,
};
