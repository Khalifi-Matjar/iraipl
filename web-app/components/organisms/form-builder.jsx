import React, { forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import omit from 'lodash/omit';
import { useFormik } from 'formik';
import { NumericFormat } from 'react-number-format';
import Grid from '@mui/material/Grid';
import {
    Button,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Stack,
    TextField,
} from '@mui/material';

const NumericField = forwardRef(({ onChange, name, ...other }, ref) => (
    <NumericFormat
        getInputRef={ref}
        onValueChange={(values) => {
            onChange({
                target: {
                    name,
                    value: values.value,
                },
            });
        }}
        allowLeadingZeros
        thousandSeparator="."
        decimalSeparator=","
        valueIsNumericString
        {...other}
    />
));

NumericField.propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string,
};

NumericField.displayName = 'NumericField';

const InputBox = ({
    label,
    helperText,
    error,
    errorInfo,
    options,
    optionsFieldType,
    ...formAttributes
}) => {
    switch (optionsFieldType) {
        case 'radio':
            return (
                <FormControl error={error}>
                    <FormLabel>{label}</FormLabel>
                    <RadioGroup row {...formAttributes}>
                        {options &&
                            options.map(({ value, label }, index) => (
                                <FormControlLabel
                                    key={`radio-${formAttributes.name ?? ''}-${index}`}
                                    value={value}
                                    control={<Radio />}
                                    label={label}
                                />
                            ))}
                    </RadioGroup>
                    <FormHelperText>
                        {(error ? errorInfo : undefined) ?? helperText}
                    </FormHelperText>
                </FormControl>
            );

        default:
            return (
                <TextField
                    fullWidth
                    select={!!options}
                    error={error}
                    label={label}
                    helperText={(error ? errorInfo : undefined) ?? helperText}
                    InputProps={
                        formAttributes.type === 'number'
                            ? {
                                  inputComponent: NumericField,
                              }
                            : undefined
                    }
                    {...formAttributes}
                    type={
                        formAttributes.type === 'number'
                            ? undefined
                            : formAttributes.type
                    }
                >
                    {options &&
                        options.map(({ value, label }, index) => (
                            <MenuItem
                                key={`menu-item-${formAttributes.name ?? ''}-${index}`}
                                value={value}
                            >
                                {label}
                            </MenuItem>
                        ))}
                </TextField>
            );
    }
};

export const FormBuilder = ({
    formDefinitions,
    submitDefinition,
    valueDefinitions,
}) => {
    const initialValues = formDefinitions
        .filter(({ initialValue }) => !!initialValue)
        .reduce(
            (prev, { name, initialValue }) => ({
                ...prev,
                [name]: initialValue,
            }),
            {}
        );
    const validationSchema = formDefinitions
        .filter(({ validationSchema }) => !!validationSchema)
        .reduce(
            (prev, { name, validationSchema }) => ({
                ...prev,
                [name]: validationSchema,
            }),
            {}
        );
    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema: Yup.object(validationSchema),
        onSubmit: (values) => {
            !!submitDefinition &&
                submitDefinition?.onSubmit(values, formik.resetForm);
        },
        validateOnBlur: true,
        validateOnChange: false,
    });

    useEffect(() => {
        Object.entries(valueDefinitions).forEach(([key, value]) => {
            formik.setFieldValue(key, value);
        });
    }, [valueDefinitions]);

    return (
        <form action="" method="post" onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                {formDefinitions.map(
                    (
                        {
                            label,
                            helperText,
                            gridColumn,
                            gridColumnSmall,
                            options,
                            optionsFieldType = 'comboBox',
                            ...formAttributes
                        },
                        index
                    ) => {
                        return (
                            <Grid
                                item
                                md={gridColumn}
                                xs={gridColumnSmall ?? 12}
                                key={`form-grid-${index}`}
                            >
                                <InputBox
                                    label={label}
                                    helperText={helperText}
                                    error={!!formik.errors[formAttributes.name]}
                                    errorInfo={
                                        formik.errors[formAttributes.name]
                                    }
                                    options={options}
                                    optionsFieldType={optionsFieldType}
                                    value={
                                        formik.values[formAttributes.name] ?? ''
                                    }
                                    onChange={formik.handleChange}
                                    {...omit(formAttributes, [
                                        'initialValue',
                                        'validationSchema',
                                    ])}
                                />
                            </Grid>
                        );
                    }
                )}
                <Grid item xs={12}>
                    {!!submitDefinition && (
                        <>
                            <Divider />
                            <br />
                            <Stack direction="row" spacing={2}>
                                <Button
                                    variant="outlined"
                                    type="submit"
                                    fullWidth={
                                        submitDefinition.isFullWidthButton
                                    }
                                >
                                    {submitDefinition?.label ?? 'Submit'}
                                </Button>
                            </Stack>
                        </>
                    )}
                </Grid>
            </Grid>
        </form>
    );
};

InputBox.propTypes = {
    label: PropTypes.string,
    helperText: PropTypes.string,
    error: PropTypes.bool,
    errorInfo: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.exact({
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
                PropTypes.bool,
            ]),
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        })
    ),
    optionsFieldType: PropTypes.oneOf(['comboBox', 'radio', 'checkbox']),
};

FormBuilder.propTypes = {
    formDefinitions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            initialValue: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]),
            helperText: PropTypes.string,
            gridColumn: PropTypes.number,
            gridColumnSmall: PropTypes.number,
            options: PropTypes.arrayOf(
                PropTypes.exact({
                    value: PropTypes.oneOfType([
                        PropTypes.string,
                        PropTypes.number,
                        PropTypes.bool,
                    ]),
                    label: PropTypes.oneOfType([
                        PropTypes.string,
                        PropTypes.number,
                    ]),
                })
            ),
            optionsFieldType: PropTypes.oneOf([
                'comboBox',
                'radio',
                'checkbox',
            ]),
            validationSchema: PropTypes.object,
        })
    ),
    submitDefinition: PropTypes.shape({
        label: PropTypes.string,
        isFullWidthButton: PropTypes.bool,
        onSubmit: PropTypes.func,
    }),
    valueDefinitions: PropTypes.object,
};
