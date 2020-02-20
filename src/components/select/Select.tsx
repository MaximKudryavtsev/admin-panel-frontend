import React, { useEffect, useState } from "react";
import { Field } from "formik";
import { FieldProps } from "formik/dist/Field";
import {
    Select as MaterialSelect,
    FormControl,
    MenuItem,
    InputLabel,
    FormHelperText,
    Chip,
} from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import { css } from "emotion";

export interface IOption {
    value: string | number;
    label?: string;

    handler?(): void;
}

interface ISelectProps {
    name: string;
    options: IOption[];
    label?: string;
    classes?: object;
    disable?: boolean;
    multiple?: boolean;

    onChange?(data: string): void;
}

const styles = {
    errorMessage: css`
        margin: 10px 0 0 0 !important;
        display: flex;
        align-items: center;
    `,
    errorText: css`
        padding-left: 10px;
    `,
    chips: css`
        display: flex;
        flex-wrap: wrap;
    `,
    chip: css`
        margin: 2px;
    `,
};

export const Select = (props: ISelectProps) => {
    const { name, options, label, classes, disable, onChange, multiple = false } = props;
    const inputLabel = React.useRef<HTMLLabelElement>(null);

    const [labelWidth, setLabelWidth] = useState(0);
    useEffect(() => {
        setLabelWidth(inputLabel.current!.offsetWidth);
    }, []);

    return (
        <Field name={name}>
            {({ field, meta }: FieldProps) => {
                const handleChange = (
                    event: React.ChangeEvent<{ name?: string; value: unknown }>,
                    child: React.ReactNode,
                ) => {
                    if (onChange) {
                        onChange(event.target.value as string);
                    }
                    field.onChange(event);
                };

                return (
                    <FormControl
                        variant={"outlined"}
                        fullWidth
                        classes={classes}
                        error={!!meta.error}
                        disabled={disable}
                    >
                        <InputLabel ref={inputLabel}>{label}</InputLabel>
                        <MaterialSelect
                            labelWidth={labelWidth}
                            multiple={multiple}
                            {...field}
                            onChange={handleChange}
                            renderValue={(selected) =>
                                multiple ? (
                                    <div className={styles.chips}>
                                        {(selected as string[]).map((value) => (
                                            <Chip
                                                key={value}
                                                label={options.find((item) => item.value === value)?.label}
                                                className={styles.chip}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    options.find((item) => item.value === selected)?.label
                                )
                            }
                        >
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
                );
            }}
        </Field>
    );
};
