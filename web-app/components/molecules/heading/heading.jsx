import React from 'react';

import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import PropTypes from 'prop-types';

/**
 *
 * @param {object} props - component props
 * @param {string} props.title - the text that appears as heading
 * @param {React.component} props.icon - icon that shows before title. Default is ViewWeekIcon
 * @returns {React.component}
 */
export const Heading = ({ title, icon }) => {
    return (
        <AppBar color="info">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    {icon ?? <ViewWeekIcon />}
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

Heading.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.object,
};
