import React, { createContext, useMemo, useState } from 'react';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import BottomNavLayout from '../../organisms/bottom-nav-layout';
import { KolektorsPortalInputPenerimaan } from './kolektors-portal-input-penerimaan';
import { KolektorsPortalListPenerimaan } from './kolektors-portal-list-penerimaan';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    styled,
} from '@mui/material';

const RECEIPT_URL = `${location.origin}/report/penerimaan-iuran/receipt`;

const StyledIframe = styled('iframe')(() => ({
    width: '100%',
    height: '350px',
    border: 'solid 1px #ccc',
}));

export const KolektorsPortalContext = createContext();

export const KolektorsPortal = () => {
    const bottomNavDefinitions = useMemo(
        () => [
            {
                menuLabel: 'List',
                menuIcon: <FormatListNumberedIcon />,
                children: <KolektorsPortalListPenerimaan />,
            },
            {
                menuLabel: 'Input',
                menuIcon: <FileOpenIcon />,
                children: <KolektorsPortalInputPenerimaan />,
            },
            {
                menuLabel: 'Logout',
                menuIcon: <ExitToAppIcon />,
                children: <div />,
            },
        ],
        []
    );

    const [openPrint, setOpenPrint] = useState(false);
    const [penerimaanId, setPenerimaanId] = useState('');

    return (
        <KolektorsPortalContext.Provider
            value={{
                printReceipt: (penerimaanId) => {
                    setPenerimaanId(penerimaanId);
                    setOpenPrint(true);
                },
            }}
        >
            <BottomNavLayout childElements={bottomNavDefinitions} />
            <Dialog open={openPrint} disablePortal={true}>
                <DialogTitle>Print struk penerimaan</DialogTitle>
                <DialogContent>
                    <StyledIframe src={`${RECEIPT_URL}?id=${penerimaanId}`} />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setOpenPrint(false);
                        }}
                    >
                        Tutup
                    </Button>
                </DialogActions>
            </Dialog>
        </KolektorsPortalContext.Provider>
    );
};
