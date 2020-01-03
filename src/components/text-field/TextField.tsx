import * as emotion from "emotion";
import React from "react";
import { Field } from "formik";
import { TextField as MaterialTextField } from "@material-ui/core";

interface ITextFieldProps {
    name: string;
    label?: string;
    error?: boolean;
    classes?: object;
    type?: string;
}

const styles = {
    errorMessage: emotion.css`
        margin: 10px 0 0 0 !important;
    `
};

export const TextField = (props: ITextFieldProps) => {
    const { name, label, error, classes, type = "text" } = props;

    return (
        <Field
            name={name}
            // @ts-ignore
            render={(field) => (
                <MaterialTextField
                    variant="outlined"
                    fullWidth
                    label={label}
                    type={type}
                    error={!!field.meta.error || error}
                    helperText={<>{field.meta.error}</>}
                    FormHelperTextProps={{
                        classes: {root: styles.errorMessage}
                    }}
                    classes={classes}
                    margin="normal"
                    {...field.field}
                />
            )}
        />
    );
};
