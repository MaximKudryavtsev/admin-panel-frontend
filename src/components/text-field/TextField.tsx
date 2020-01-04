import * as emotion from "emotion";
import React from "react";
import { Field } from "formik";
import { TextField as MaterialTextField, InputLabelProps } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";

interface ITextFieldProps {
    name: string;
    InputLabelProps?: InputLabelProps;
    label?: string;
    error?: boolean;
    classes?: object;
    type?: string;
    size?: "small" | "medium";
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

export const TextField = (props: ITextFieldProps) => {
    const { name, label, error, classes, type = "text", size, InputLabelProps } = props;

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
                    size={size}
                    InputLabelProps={InputLabelProps}
                    helperText={
                        field.meta.error && (
                            <>
                                <ErrorIcon />
                                <span className={styles.errorText}>{field.meta.error}</span>
                            </>
                        )
                    }
                    FormHelperTextProps={{
                        classes: { root: styles.errorMessage },
                    }}
                    classes={classes}
                    margin="normal"
                    {...field.field}
                />
            )}
        />
    );
};
