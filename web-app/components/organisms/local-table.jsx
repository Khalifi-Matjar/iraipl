import React from 'react';
import PropTypes from 'prop-types';
import { Box, Card, Divider, IconButton, InputBase, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

const StyledCard = styled(Card)(() => ({
    width: '100%',
}));

const StyledBox = styled(Box)(() => ({
    padding: '10px 20px 20px',
    backgroundColor: '#9f9f9f30',
}));

const StyledTable = styled(Table)(() => ({
    tableLayout: 'fixed',
}));

export const LocalTable = ({ columns, data, title }) => {
    const tableInstance = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <StyledCard variant="outlined">
            <StyledBox>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Paper elevation={16} component="form" sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <InputBase sx={{ ml: 1, flex: 1 }} placeholder={`Pencarian - ${title}`} />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </StyledBox>
            <Divider />
            <TableContainer>
                <StyledTable size="small">
                    <colgroup>
                        {tableInstance.getHeaderGroups().map((headerGroup) =>
                            headerGroup.headers.map((header, index) => {
                                return <col key={index} style={{ width: `${header.getSize()}px` }} />;
                            })
                        )}
                    </colgroup>
                    <TableHead>
                        {tableInstance.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableCell key={header.id} colSpan={header.colSpan} width={header.getSize()} sx={{ width: header.getSize() }}>
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {tableInstance.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} className="border-b bg-white" hover>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </StyledTable>
            </TableContainer>
        </StyledCard>
    );
};

LocalTable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object),
    data: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string,
};
