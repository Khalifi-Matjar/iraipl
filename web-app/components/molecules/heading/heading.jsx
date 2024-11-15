import React from 'react';

import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';

/**
 *
 * @param {object} props - component props
 * @param {string} props.title - the text that appears as heading
 * @param {React.component} props.icon - icon that shows before title. Default is ViewWeekIcon
 * @returns {React.component}
 */
export const Heading = ({ title, icon, postButtons }) => {
    return (
        <AppBar color="info">
            <Toolbar>
                <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    {icon ?? <ViewWeekIcon />}
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};
