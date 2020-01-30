import React, { ReactNode, useState } from "react";
import {
    Button,
    Collapse,
    Divider,
    IconButton,
    Paper,
    Tooltip,
    Typography,
} from "@material-ui/core";
import { css } from "emotion";
import { IBlock, IDictionary } from "../../entities";
import { CustomForm } from "../../components/custom-form";
import { Select } from "../../components/select";
import * as Yup from "yup";
import { Delete, DragIndicator, Save } from "@material-ui/icons";
import { ConfirmPopup } from "../../components/confirm-popup";
import { SwitchField } from "../../components/switch-field";
import { isEqual } from "lodash";

interface IBlockWrapperProps<T> {
    block?: IBlock<T>;
    statuses?: IDictionary[];
    validationSchema: Yup.ObjectSchema<any>;

    render(values?: Partial<IBlock<T>>): ReactNode;

    onDelete?(id: string): void;

    onSubmit?(id: string, data: Partial<IBlock<T>>): void;
}

const classNames = {
    wrapper: css``,
    header: css`
        display: flex;
        align-items: center;
        padding: 24px;
    `,
    field: css`
        margin-right: 24px;
        width: 400px;
    `,
    content: css`
        padding: 24px;
    `,
    buttonWrapper: css`
        display: flex;
        justify-content: flex-end;
        padding: 24px;
    `,
    icons: css`
        margin-left: auto;
    `,
    icon: css`
        margin-right: 10px;
    `,
};

const ValidationSchema = Yup.object().shape({
    statusId: Yup.string().required("Поле обязательно для заполнения"),
    open: Yup.boolean(),
});

export const BlockWrapper = <T extends any>(props: IBlockWrapperProps<T>) => {
    const { block, statuses = [], validationSchema, render, onDelete, onSubmit } = props;
    const [deleteVisible, setDeleteVisible] = useState(false);

    function onDeleteOpen(): void {
        setDeleteVisible(true);
    }

    function onDeleteClose(): void {
        setDeleteVisible(false);
    }

    const handleDelete = () => {
        if (onDelete && block && block.open && block._id) {
            onDelete(block._id);
            onDeleteClose();
        }
    };

    const handleSubmit = (data: Partial<IBlock<T>>) => {
        if (block && onSubmit && block._id) {
            onSubmit(block._id, data);
        }
    };

    const changeVisibility = (data: Partial<IBlock<any>>) => {
        if (onSubmit) {
            handleSubmit(data);
        }
    };

    return (
        <React.Fragment>
            <Paper className={classNames.wrapper}>
                <CustomForm<Partial<IBlock<T>>>
                    validationSchema={ValidationSchema.concat(validationSchema)}
                    data={block}
                    onSubmit={handleSubmit}
                    validateOnChange={false}
                    render={(form) => (
                        <React.Fragment>
                            <div className={classNames.header}>
                                <IconButton classes={{root: classNames.icon}}>
                                    <DragIndicator />
                                </IconButton>
                                <SwitchField
                                    name={"open"}
                                    classes={{ root: classNames.icon }}
                                    onChange={(value) => changeVisibility({ open: value })}
                                />
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
                                    classes={{ root: classNames.field }}
                                    disable={!block?.open}
                                />
                                <div className={classNames.icons}>
                                    <Tooltip title={"Удалить блок"} placement={"top"}>
                                        <span>
                                            <IconButton
                                                onClick={onDeleteOpen}
                                                disabled={!block?.open}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </span>
                                    </Tooltip>
                                </div>
                            </div>
                            <Collapse in={block?.open} unmountOnExit>
                                <Divider />
                                <div className={classNames.content}>{render(form?.values)}</div>
                                <Divider />
                                <div className={classNames.buttonWrapper}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<Save />}
                                        onClick={form?.submitForm}
                                        disabled={
                                            !form?.isValid ||
                                            isEqual(form?.values, form?.initialValues)
                                        }
                                    >
                                        Сохранить
                                    </Button>
                                </div>
                            </Collapse>
                        </React.Fragment>
                    )}
                />
            </Paper>
            <ConfirmPopup
                title={"Вы действительно хотите удалить блок?"}
                submitTitle={"Удалить"}
                open={deleteVisible}
                onClose={onDeleteClose}
                onSubmit={handleDelete}
            />
        </React.Fragment>
    );
};
