import React, { useMemo } from 'react';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import BottomNavLayout from '../../organisms/bottom-nav-layout';
import { KolektorsPortalInputPenerimaan } from './kolektors-portal-input-penerimaan';

export const KolektorsPortal = () => {
    const bottomNavDefinitions = useMemo(
        () => [
            {
                menuLabel: 'Input',
                menuIcon: <FileOpenIcon />,
                children: <KolektorsPortalInputPenerimaan />,
            },
            {
                menuLabel: 'List',
                menuIcon: <FormatListNumberedIcon />,
                children: <div>List data</div>,
            },
            {
                menuLabel: 'Profil',
                menuIcon: <AccountCircleIcon />,
                children: <div>Profil</div>,
            },
            {
                menuLabel: 'Logout',
                menuIcon: <ExitToAppIcon />,
                children: <div>Logout</div>,
            },
        ],
        []
    );
    return <BottomNavLayout childElements={bottomNavDefinitions} />;
};
