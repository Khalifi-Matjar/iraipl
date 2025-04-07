import {
    Box,
    styled,
    Typography,
    Avatar,
    List,
    ListSubheader,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListItem,
    IconButton,
    Divider,
} from '@mui/material';
import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
    GroupsOutlined,
    LogoutOutlined,
    ManageAccountsOutlined,
    Person4Outlined,
    PersonOutlined,
    ReceiptLongOutlined,
    ReceiptOutlined,
    RuleOutlined,
} from '@mui/icons-material';
import { ConfirmationContext } from '../../context/confirmation-context';
import { LOCAL_STORAGE_TOKEN_KEY } from '../../../utils';

const StyledBox = styled(Box)(() => ({
    width: '16.0dvw',
    borderRadius: '7px',
    flexShrink: 0,
    padding: '8px 8px',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    gap: '20px',
}));

const ProfileBox = styled(Box)(() => ({
    width: '100%',
    height: '55px',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: '10px',
}));

const StyledPhoto = styled(Avatar)(() => ({
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'purple',
}));

const NameDetails = styled(Box)(() => ({
    textTransform: 'capitalize',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100px',
    overflow: 'hidden',
    flexGrow: 1,
}));
const StyledName = styled(Typography)(() => ({
    fontSize: '12px',
    textTransform: 'capitalize',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
}));
const StyledEmail = styled(Typography)(() => ({
    overflow: 'hidden',
    whiteSpace: 'nowrap',
}));
const MoreButton = styled(IconButton)(() => ({
    borderRadius: '50%',
    textTransform: 'capitalize',
}));
const MenuList = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '1px',
    textTransform: 'capitalize',
}));
const StyledListSubheader = styled(ListSubheader)(() => ({
    fontSize: 'small',
    backgroundColor: 'inherit',
}));

const StyledListItem = styled(ListItem)(() => ({
    width: '100%',
    marginInline: '10px',
}));

const StyledListItemButton = styled(ListItemButton)(() => ({
    height: '40px',
}));

const StyledListItemText = styled(ListItemText)(() => ({
    fontSize: 'small',
    textTransform: 'capitalize',
    overflow: 'hidden',
}));

export const Sidebar = () => {
    const confirmation = useContext(ConfirmationContext);
    return (
        <StyledBox>
            <ProfileBox>
                <StyledPhoto>A</StyledPhoto>
                <NameDetails>
                    <StyledName
                        variant="subtitle1"
                        fontSize="medium"
                        fontWeight="bold"
                    >
                        Administrator
                    </StyledName>
                    <StyledEmail
                        variant="caption"
                        fontWeight="thin"
                        color="grey"
                    >
                        admin@dev
                    </StyledEmail>
                </NameDetails>
                <MoreButton>
                    <MoreHorizIcon color="white" />
                </MoreButton>
            </ProfileBox>
            <MenuList>
                <List
                    subheader={
                        <StyledListSubheader> MASTER DATA</StyledListSubheader>
                    }
                >
                    <StyledListItem disablePadding sx={{ marginX: '10px' }}>
                        <StyledListItemButton
                            LinkComponent={RouterLink}
                            to="/master-iuran"
                        >
                            <ListItemIcon>
                                {/* <GridViewOutlined fontSize="small" /> */}
                                <ReceiptLongOutlined fontSize="small" />
                            </ListItemIcon>
                            <StyledListItemText
                                color=""
                                primary="Jenis Iuran"
                            />
                        </StyledListItemButton>
                    </StyledListItem>
                    <StyledListItem disablePadding>
                        <StyledListItemButton
                            LinkComponent={RouterLink}
                            to="/penduduk"
                        >
                            <ListItemIcon>
                                {/* <GridViewOutlined fontSize="small" /> */}
                                <GroupsOutlined fontSize="small" />
                            </ListItemIcon>
                            <StyledListItemText color="" primary="Penduduk" />
                        </StyledListItemButton>
                    </StyledListItem>
                    <StyledListItem disablePadding>
                        <StyledListItemButton
                            LinkComponent={RouterLink}
                            to="/kolektor"
                        >
                            <ListItemIcon>
                                {/* <GridViewOutlined fontSize="small" /> */}
                                <Person4Outlined fontSize="small" />
                            </ListItemIcon>
                            <StyledListItemText color="" primary="Kolektor" />
                        </StyledListItemButton>
                    </StyledListItem>
                </List>
                <Divider variant="middle" />
                <List
                    sx={{ marginTop: '10px' }}
                    subheader={
                        <StyledListSubheader>
                            PENERIMAAN IURAN
                        </StyledListSubheader>
                    }
                >
                    <StyledListItem disablePadding>
                        <StyledListItemButton
                            LinkComponent={RouterLink}
                            to="/penerimaan-iuran-kolektor"
                        >
                            <ListItemIcon>
                                <Person4Outlined fontSize="small" />
                            </ListItemIcon>
                            <StyledListItemText primary="Dengan Kolektor" />
                        </StyledListItemButton>
                    </StyledListItem>
                    <StyledListItem disablePadding>
                        <StyledListItemButton
                            LinkComponent={RouterLink}
                            to="/penerimaan-iuran-non-kolektor"
                        >
                            <ListItemIcon>
                                <PersonOutlined fontSize="small" />
                            </ListItemIcon>
                            <StyledListItemText primary="Tanpa Kolektor" />
                        </StyledListItemButton>
                    </StyledListItem>
                    <StyledListItem disablePadding>
                        <StyledListItemButton
                            LinkComponent={RouterLink}
                            to="/penerimaan-iuran-validasi"
                        >
                            <ListItemIcon>
                                <RuleOutlined fontSize="small" />
                            </ListItemIcon>
                            <StyledListItemText primary="Validasi" />
                        </StyledListItemButton>
                    </StyledListItem>
                </List>
                <List
                    sx={{ marginTop: '10px' }}
                    subheader={
                        <StyledListSubheader> LAPORAN</StyledListSubheader>
                    }
                >
                    <StyledListItem disablePadding>
                        <StyledListItemButton
                            LinkComponent={RouterLink}
                            to="/laporan-penerimaan-iuran"
                        >
                            <ListItemIcon>
                                <ReceiptOutlined fontSize="small" />
                            </ListItemIcon>
                            <StyledListItemText primary="Penerimaan Iuran" />
                        </StyledListItemButton>
                    </StyledListItem>
                </List>
                <List
                    sx={{ marginTop: '10px' }}
                    subheader={<StyledListSubheader> USER</StyledListSubheader>}
                >
                    <StyledListItem disablePadding>
                        <StyledListItemButton
                            LinkComponent={RouterLink}
                            to="/manage-user"
                        >
                            <ListItemIcon>
                                <ManageAccountsOutlined fontSize="small" />
                            </ListItemIcon>
                            <StyledListItemText primary="Manage User" />
                        </StyledListItemButton>
                    </StyledListItem>
                    <StyledListItem disablePadding>
                        <StyledListItemButton
                            onClick={(e) => {
                                confirmation.setTitle('Logout');
                                confirmation.setMessage(
                                    'Anda yakin akan logout?'
                                );
                                confirmation.setOpen(true);
                                confirmation.setOnConfirmYesAction(() => () => {
                                    localStorage.removeItem(
                                        LOCAL_STORAGE_TOKEN_KEY
                                    );
                                    location.href = '/';
                                });
                                e.preventDefault();
                            }}
                        >
                            <ListItemIcon>
                                <LogoutOutlined fontSize="small" />
                            </ListItemIcon>
                            <StyledListItemText primary="Logout" />
                        </StyledListItemButton>
                    </StyledListItem>
                </List>
            </MenuList>
        </StyledBox>
    );
};
