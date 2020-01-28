import React, { ReactNode } from "react";
import { Button, Paper, Typography } from "@material-ui/core";
import { css } from "emotion";
import { IBlock, IDictionary } from "../../entities";
import { CustomForm } from "../../components/custom-form";
import { Select } from "../../components/select";
import * as Yup from "yup";
import { Save } from "@material-ui/icons";

interface IBlockWrapperProps<T> {
    block?: IBlock<T>;
    statuses?: IDictionary[];
    validationSchema: Yup.ObjectSchema<any>;

    render(values?: Partial<IBlock<T>>): ReactNode;

    onDelete?(id: string): void;

    onSubmit?(data: IBlock<T>): void;
}

const classNames = {
    wrapper: css`
        padding: 24px;
    `,
    header: css`
        display: flex;
    `,
    field: css`
        margin-right: 24px;
        width: 400px;
    `,
    content: css`
        margin: 24px 0;
    `,
    buttonWrapper: css`
        display: flex;
        justify-content: flex-end;
    `,
};

const ValidationSchema = Yup.object().shape({
    statusId: Yup.string().required("Поле обязательно для заполнения"),
});

export const BlockWrapper = <T extends any>(props: IBlockWrapperProps<T>) => {
    const { block, statuses = [], validationSchema, render, onDelete, onSubmit } = props;

    return (
        <Paper className={classNames.wrapper}>
            <CustomForm<Partial<IBlock<T>>>
                validationSchema={ValidationSchema.concat(validationSchema)}
                data={block}
                onSubmit={onSubmit}
                validateOnBlur={false}
                validateOnChange={false}
                render={(form) => (
                    <React.Fragment>
                        <div className={classNames.header}>
                            <Typography variant={"h6"} className={classNames.field}>
                                {block?.type?.title}
                            </Typography>
                            <Select
                                name={"statusId"}
                                label={"Статус"}
                                options={statuses.map((item) => ({
                                    value: item._id,
                                    label: item.title,
                                }))}
                                classes={{root: classNames.field}}
                            />
                        </div>
                        <div className={classNames.content}>{render(form?.values)}</div>
                        <div className={classNames.buttonWrapper}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Save />}
                                onClick={form?.submitForm}
                                disabled={!form?.isValid}
                            >
                                Сохранить
                            </Button>
                        </div>
                    </React.Fragment>
                )}
            />
        </Paper>
    );
};
