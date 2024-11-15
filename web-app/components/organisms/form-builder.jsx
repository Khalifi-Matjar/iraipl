import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import omit from 'lodash/omit';
import { useFormik } from 'formik';
import Grid from '@mui/material/Grid';
import { Button, MenuItem, Stack, TextField } from '@mui/material';

const InputBox = ({ label, helperText, error, errorInfo, options, ...formAttributes }) => {
    return (
        <TextField fullWidth select={!!options} error={error} label={label} helperText={(error ? errorInfo : undefined) ?? helperText} {...formAttributes}>
            {options &&
                options.map(({ value, label }, index) => (
                    <MenuItem key={`menu-item-${index}`} value={value}>
                        {label}
                    </MenuItem>
                ))}
        </TextField>
    );
};

export const FormBuilder = ({ formDefinitions, submitDefinition }) => {
    const initialValues = formDefinitions.filter(({ initialValue }) => !!initialValue).reduce((prev, { name, initialValue }) => ({ ...prev, [name]: initialValue }), {});
    const validationSchema = formDefinitions.filter(({ validationSchema }) => !!validationSchema).reduce((prev, { name, validationSchema }) => ({ ...prev, [name]: validationSchema }), {});
    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object(validationSchema),
        onSubmit: (values) => {
            !!submitDefinition && submitDefinition?.onSubmit(values);
        },
        validateOnBlur: true,
        validateOnChange: false,
    });

    return (
        <form action="" method="post" onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                {formDefinitions.map(({ label, helperText, gridColumn, options, ...formAttributes }, index) => {
                    return (
                        <Grid item xs={gridColumn} key={`form-grid-${index}`}>
                            <InputBox
                                label={label}
                                helperText={helperText}
                                error={!!formik.errors[formAttributes.name]}
                                errorInfo={formik.errors[formAttributes.name]}
                                options={options}
                                value={formik.values[formAttributes.name] ?? ''}
                                onChange={formik.handleChange}
                                {...omit(formAttributes, ['initialValue', 'validationSchema'])}
                            />
                        </Grid>
                    );
                })}
                <Grid item xs={12}>
                    {!!submitDefinition && (
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" type="submit">
                                {submitDefinition?.label ?? 'Submit'}
                            </Button>
                            <Button type="reset" variant="outlined">
                                Reset
                            </Button>
                        </Stack>
                    )}
                </Grid>
            </Grid>
        </form>
    );
};

FormBuilder.propTypes = {
    formDefinitions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            helperText: PropTypes.string,
            gridColumn: PropTypes.number,
            options: PropTypes.arrayOf(
                PropTypes.exact({
                    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
                    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                })
            ),
            validationSchema: PropTypes.object,
        })
    ),
    submitDefinition: PropTypes.shape({
        label: PropTypes.string,
        onSubmit: PropTypes.func,
    }),
};
