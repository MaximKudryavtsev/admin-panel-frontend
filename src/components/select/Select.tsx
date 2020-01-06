import React, { useEffect, useState } from "react";
import { Field } from "formik";
import { FieldProps } from "formik/dist/Field";
import { Select as MaterialSelect, FormControl, MenuItem, InputLabel } from "@material-ui/core";

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
                <FormControl variant={"outlined"} fullWidth classes={classes}>
                    <InputLabel ref={inputLabel}>{label}</InputLabel>
                    <MaterialSelect labelWidth={labelWidth} {...field}>
                        {options.map((option) => (
                            <MenuItem value={option.value}>{option.label}</MenuItem>
                        ))}
                    </MaterialSelect>
                </FormControl>
            )}
        </Field>
    );
};
