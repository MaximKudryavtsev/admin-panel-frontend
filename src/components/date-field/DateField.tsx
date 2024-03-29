import "date-fns";
import React from "react";
import { Field, FieldProps } from "formik";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ErrorIcon from "@material-ui/icons/Error";
import * as emotion from "emotion";

interface IDateFieldProps {
    name: string;
    label?: string;
    className?: string;
    disableFuture?: boolean;
    clearable?: boolean;
}

const styles = {
    errorText: emotion.css`
        padding-left: 10px;
    `,
    errorMessage: emotion.css`
        margin: 10px 0 0 0 !important;
        display: flex;
        align-items: center;
    `,
};

export const DateField = (props: IDateFieldProps) => {
    const { name, className, label, disableFuture = false, clearable = false } = props;

    return (
        <Field name={name}>
            {({ form, field, meta }: FieldProps) => (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        name={name}
                        margin="normal"
                        label={label}
                        clearable={clearable}
                        autoOk
                        disableFuture={disableFuture}
                        error={!!meta.error}
                        format="dd.MM.yyyy"
                        className={className}
                        inputVariant="outlined"
                        helperText={
                            meta.error && (
                                <>
                                    <ErrorIcon />
                                    <span className={styles.errorText}>{meta.error}</span>
                                </>
                            )
                        }
                        FormHelperTextProps={{
                            classes: { root: styles.errorMessage },
                        }}
                        {...field}
                        onChange={(date) => form.setFieldValue(name, date ? new DateFnsUtils().date(date).toISOString() : "")}
                    />
                </MuiPickersUtilsProvider>
            )}
        </Field>
    );
};
