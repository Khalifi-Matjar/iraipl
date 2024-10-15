import { Box, styled, Typography, Avatar, List, ListSubheader, ListItemButton, ListItemIcon, ListItemText, ListItem, IconButton, Divider } from '@mui/material';
import React from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { GridViewOutlined } from '@mui/icons-material';

const StyledBox = styled(Box)(() => ({
    width: '16.0dvw',
    height: '99.0dvh',
    backgroundColor: '#f6f6f6',
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
    width: '200px',
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
    return (
        <StyledBox>
            <ProfileBox>
                <StyledPhoto>A</StyledPhoto>
                <NameDetails>
                    <StyledName variant="subtitle1" fontSize="medium" fontWeight="bold">
                        Fathur Rahmann
                    </StyledName>
                    <StyledEmail variant="caption" fontWeight="thin" color="grey">
                        04Fathur.rahman@gmail.com
                    </StyledEmail>
                </NameDetails>
                <MoreButton>
                    <MoreHorizIcon color="white" />
                </MoreButton>
            </ProfileBox>
            <MenuList>
                <List subheader={<StyledListSubheader> MENU UTAMA</StyledListSubheader>}>
                    <StyledListItem disablePadding sx={{ marginX: '10px' }}>
                        <StyledListItemButton>
                            <ListItemIcon>
                                <GridViewOutlined fontSize="small" />
                            </ListItemIcon>
                            <StyledListItemText color="" primary="Dashboard" />
                        </StyledListItemButton>
                    </StyledListItem>
                    <StyledListItem disablePadding>
                        <StyledListItemButton>
                            <ListItemIcon>
                                <GridViewOutlined fontSize="small" />
                            </ListItemIcon>
                            <StyledListItemText color="" primary="Dashboard" />
                        </StyledListItemButton>
                    </StyledListItem>
                </List>
                <Divider variant="middle" />
                <List sx={{ marginTop: '10px' }} subheader={<StyledListSubheader> MENU UTAMA</StyledListSubheader>}>
                    <StyledListItem disablePadding>
                        <StyledListItemButton>
                            <ListItemIcon>
                                <GridViewOutlined fontSize="small" />
                            </ListItemIcon>
                            <StyledListItemText primary="Dashboard" />
                        </StyledListItemButton>
                    </StyledListItem>
                    <StyledListItem disablePadding>
                        <StyledListItemButton>
                            <ListItemIcon>
                                <GridViewOutlined fontSize="small" />
                            </ListItemIcon>
                            <StyledListItemText color="" primary="Dashboard" />
                        </StyledListItemButton>
                    </StyledListItem>
                </List>
            </MenuList>
        </StyledBox>
    );
};
