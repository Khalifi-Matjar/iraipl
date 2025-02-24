import React from 'react';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';

import { Heading } from './heading';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
    title: 'Molecules/Heading',
    component: Heading,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
};

export const Default = {
    args: {
        title: 'This is heading',
    },
};

export const WithStartingIcon = {
    args: {
        title: 'My icon on left is set',
        icon: <ViewComfyIcon />,
    },
};
