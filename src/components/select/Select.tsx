import React, { useEffect, useState } from "react";
import { Field } from "formik";
import { FieldProps } from "formik/dist/Field";
import { Select as MaterialSelect, FormControl, MenuItem, InputLabel, FormHelperText } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import * as emotion from "emotion";

export interface IOption {
    value: string | number;
    label: string;
}

interface ISelectProps {
    name: string;
    options: IOption[];
    label?: string;
    classes?: object;
}

const styles = {
    errorMessage: emotion.css`
        margin: 10px 0 0 0 !important;
        display: flex;
        align-items: center;
    `,
    errorText: emotion.css`
        padding-left: 10px;
    `,
};

export const Select = (props: ISelectProps) => {
    const { name, options, label, classes } = props;
    const inputLabel = React.useRef<HTMLLabelElement>(null);

    const [labelWidth, setLabelWidth] = useState(0);
    useEffect(() => {
        setLabelWidth(inputLabel.current!.offsetWidth);
    }, []);

    return (
        <Field name={name}>
            {({ field, meta }: FieldProps) => (
                <FormControl variant={"outlined"} fullWidth classes={classes} error={!!meta.error}>
                    <InputLabel ref={inputLabel}>{label}</InputLabel>
                    <MaterialSelect labelWidth={labelWidth} {...field}>
                        {options.map((option) => (
                            <MenuItem value={option.value} key={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </MaterialSelect>
                    {meta.error && (
                        <FormHelperText className={styles.errorMessage}>
                            <ErrorIcon />
                            <span className={styles.errorText}>{meta.error}</span>
                        </FormHelperText>
                    )}
                </FormControl>
            )}
        </Field>
    );
};
