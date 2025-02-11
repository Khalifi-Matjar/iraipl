import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Card,
    Divider,
    IconButton,
    InputBase,
    Paper,
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';

const StyledCard = styled(Card)(() => ({
    width: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
}));

const StyledBox = styled(Box)(() => ({
    padding: '10px 20px 20px',
    position: 'sticky',
    top: 0,
    zIndex: 2,
    backgroundColor: 'white',
}));

const StyledPagination = styled(TablePagination)(() => ({
    position: 'sticky',
    bottom: 0,
    zIndex: 2,
    backgroundColor: 'white',
}));

const StyledTable = styled(Table)(() => ({
    tableLayout: 'fixed',
}));

const StyledTableCell = styled(TableCell)(() => ({
    backgroundColor: '#1976d2e0',
    color: 'white',
}));

const DefaultSearchComponent = ({ title }) => (
    <Paper
        elevation={0}
        component="form"
        sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            border: 'solid 1px #00000036',
        }}
    >
        <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder={`Pencarian - ${title}`}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
        </IconButton>
    </Paper>
);

export const LocalTable = ({
    columns,
    data,
    title,
    hasTitle = true,
    hasSearch = true,
    searchComponent = <DefaultSearchComponent title={title ?? 'data'} />,
}) => {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const tableInstance = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
        state: {
            pagination,
        },
    });

    const handleChangePage = (_event, newPage) => {
        tableInstance.setPageIndex(newPage);
    };

    return (
        <StyledCard variant="outlined">
            {hasTitle && hasSearch && (
                <StyledBox>
                    {hasTitle && (
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                    )}
                    {hasSearch && searchComponent}
                </StyledBox>
            )}
            <Divider />
            <TableContainer>
                <StyledTable size="small">
                    <TableHead>
                        {tableInstance.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <StyledTableCell
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        width={header.getSize()}
                                        align={
                                            header.column.columnDef.align ??
                                            'left'
                                        }
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {tableInstance.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                className="border-b bg-white"
                                hover
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        align={
                                            cell.column.columnDef.align ??
                                            'left'
                                        }
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </StyledTable>
            </TableContainer>
            <StyledPagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={tableInstance.getRowCount()}
                rowsPerPage={tableInstance.getState().pagination.pageSize}
                page={tableInstance.getState().pagination.pageIndex}
                onPageChange={handleChangePage}
                onRowsPerPageChange={(e) =>
                    tableInstance.setPageSize(Number(e.target.value))
                }
            />
        </StyledCard>
    );
};

DefaultSearchComponent.propTypes = {
    title: PropTypes.string,
};

LocalTable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object),
    data: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string,
    hasTitle: PropTypes.bool,
    hasSearch: PropTypes.bool,
    searchComponent: PropTypes.node,
};
