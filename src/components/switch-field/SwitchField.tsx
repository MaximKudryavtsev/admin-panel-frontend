import React from "react";
import { Field } from "formik";
import { FieldProps } from "formik/dist/Field";
import { FormControlLabel, Switch } from "@material-ui/core";

interface ISwitchFieldProps {
    name: string;
    label?: string;
    color?: "primary" | "default" | "secondary";
    classes?: object;
    disable?: boolean;

    onChange?(value: boolean): void;
}

export const SwitchField = (props: ISwitchFieldProps) => {
    const { name, color = "primary", label, classes, onChange, disable } = props;

    const handleChange = (value: boolean) => {
        if (onChange) {
            onChange(value);
        }
    };

    return (
        <Field name={name} type={"checkbox"}>
            {({ field, meta }: FieldProps) => (
                <FormControlLabel
                    classes={classes}
                    control={
                        <Switch
                            color={color}
                            checked={field.value}
                            value={field.value}
                            disabled={disable}
                            {...field}
                            onClick={() => handleChange(!field.value)}
                        />
                    }
                    label={label}
                />
            )}
        </Field>
    );
};
