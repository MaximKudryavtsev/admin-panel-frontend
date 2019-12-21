/** @jsx jsx */

import { css, jsx } from "@emotion/core";
import { Field } from "formik";
import { FormControl, FormHelperText, Input, InputLabel } from "@material-ui/core";

interface ITextFieldProps {
    name: string;
    label?: string;
}

const styles = {
    field: css`
        width: 100%;
    `,
};

export const TextField = (props: ITextFieldProps) => {
    const { name, label } = props;

    return (
        <Field
            name={name}
            // @ts-ignore
            render={(field) => (
                <FormControl error={!!field.meta.error} css={styles.field}>
                    <InputLabel htmlFor="component-error">{label}</InputLabel>
                    <Input {...field.field} />
                    <FormHelperText id="component-error-text">{field.meta.error}</FormHelperText>
                </FormControl>
            )}
        />
    );
};
