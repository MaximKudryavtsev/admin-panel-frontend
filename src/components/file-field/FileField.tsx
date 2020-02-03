import React, { ChangeEvent, forwardRef } from "react";
import { Field, FieldProps } from "formik";
import { Typography } from "@material-ui/core";
import { css } from "emotion";

interface IFileFieldProps {
    name: string;

    onChange?(event: ChangeEvent<HTMLInputElement>): void;
}

const classNames = {
    error: css`
        margin-top: 20px;
    `,
    input: css`
        display: none;
    `,
};

export const FileField = forwardRef<HTMLInputElement, IFileFieldProps>((props, ref) => {
    const { name, onChange } = props;

    return (
        <Field name={name} type={"file"}>
            {({ field, meta }: FieldProps) => {
                const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
                    field.onChange(e);
                    if (onChange) {
                        onChange(e);
                    }
                };

                return (
                    <React.Fragment>
                        <input
                            type={"file"}
                            ref={ref}
                            className={classNames.input}
                            {...field}
                            onChange={onChange}
                        />
                        {meta.error && (
                            <Typography
                                color={"error"}
                                align={"center"}
                                className={classNames.error}
                            >
                                {meta.error}
                            </Typography>
                        )}
                    </React.Fragment>
                );
            }}
        </Field>
    );
});
