import React from 'react';
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
    TableRow,
    Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';

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

export const LocalTable = ({
    columns,
    data,
    title,
    hasTitle = true,
    hasSearch = true,
}) => {
    const tableInstance = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <StyledCard variant="outlined">
            {hasTitle && hasSearch && (
                <StyledBox>
                    {hasTitle && (
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                    )}
                    {hasSearch && (
                        <Paper
                            elevation={0}
                            component="form"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                            }}
                        >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder={`Pencarian - ${title}`}
                            />
                            <IconButton
                                type="button"
                                sx={{ p: '10px' }}
                                aria-label="search"
                            >
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    )}
                </StyledBox>
            )}
            <Divider />
            <TableContainer>
                <StyledTable size="small">
                    <TableHead>
                        {tableInstance.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableCell
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
                                    </TableCell>
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
        </StyledCard>
    );
};

LocalTable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object),
    data: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string,
    hasTitle: PropTypes.bool,
    hasSearch: PropTypes.bool,
};
