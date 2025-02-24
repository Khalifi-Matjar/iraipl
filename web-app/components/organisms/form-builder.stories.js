import React from 'react';
import * as Yup from 'yup';

import { FormBuilder } from './form-builder';
import { fn } from '@storybook/test';

const birthMonth = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'Mei' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
    title: 'Organisms/FormBuilder',
    component: FormBuilder,
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        (Story) => (
            <div style={{ padding: '20px' }}>
                <Story />
            </div>
        ),
    ],
    tags: ['autodocs'],
};

export const Default = {
    args: {
        formDefinitions: [
            {
                name: 'username',
                id: 'username',
                label: 'Username',
                gridColumn: 12,
            },
            {
                name: 'password',
                id: 'password',
                label: 'Password',
                gridColumn: 12,
            },
            {
                name: 'birth-month',
                id: 'birth-month',
                label: 'Birth month',
                options: birthMonth,
                helperText: 'Choose one',
                gridColumn: 4,
            },
            {
                name: 'birth-year',
                id: 'birth-year',
                label: 'Birth year',
                inputMode: 'numeric',
                gridColumn: 4,
            },
        ],
    },
};

export const CompleteFormInteraction = {
    args: {
        formDefinitions: [
            {
                name: 'first-name',
                id: 'first-name',
                label: 'First name',
                gridColumn: 6,
                validationSchema: Yup.string().required(
                    'First name is required'
                ),
            },
            {
                name: 'last-name',
                id: 'last-name',
                label: 'Last name',
                gridColumn: 6,
                validationSchema: Yup.string().required(
                    'Last name is required'
                ),
            },
            {
                name: 'university',
                id: 'university',
                label: 'University',
                gridColumn: 4,
                validationSchema: Yup.string().required(
                    'At least you were in university tho?'
                ),
            },
            {
                name: 'year-grad',
                id: 'year-grad',
                label: 'Year of graduation',
                gridColumn: 4,
                validationSchema: Yup.number().required(
                    'And you supposed to be graduated'
                ),
            },
            {
                name: 'month',
                id: 'month',
                label: 'Birth month',
                options: birthMonth,
                gridColumn: 4,
                validationSchema: Yup.number().required(
                    'Are you never been borned?'
                ),
            },
        ],
        submitDefinition: {
            label: 'Save my data',
            onSubmit: fn(),
        },
    },
};
