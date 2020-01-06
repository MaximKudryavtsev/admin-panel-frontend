import React from "react";
import { Field } from "formik";
import { FieldProps } from "formik/dist/Field";
import { FormControlLabel, Switch } from "@material-ui/core";

interface ISwitchFieldProps {
    name: string;
    label?: string;
    color?: "primary" | "default" | "secondary";
    classes?: object;
}

export const SwitchField = (props: ISwitchFieldProps) => {
    const { name, color = "primary", label, classes } = props;

    return (
        <Field name={name}>
            {({ field, meta }: FieldProps) => (
                <FormControlLabel
                    classes={classes}
                    control={<Switch color={color} {...field} />}
                    label={label}
                />
            )}
        </Field>
    );
};
